import { useContext, useEffect, useState } from 'react';
import { endAt, off, onValue, orderByChild, query, serverTimestamp, set } from 'firebase/database';

import { AuthUserContext } from '../Session';
import * as firebase from '../Firebase';
import TableHead from './TableHead';
import Equipments from './index';

const EquipmentsToCalibrate = (props) => {
  const [loading, setLoading] = useState(false);
  const [equipments, setEquipments] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [period, setPeriod] = useState(45);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

  const authUser = useContext(AuthUserContext);

  const onListenForUsers = () => {
    onValue(firebase.users(), snapshot => {
      setUsers(snapshot.val());
    });
  };

  const onListenForEquipments = () => {
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + period);
    setLoading(true);

    onValue(query(firebase.equipments(), orderByChild('data11'), endAt(deadline.getTime())), snapshot => {
      const equipmentObject = snapshot.val();

      if (equipmentObject) {
        // convert equipments list from snapshot
        const equipmentsList = Object.keys(equipmentObject).map(key => ({
          ...equipmentObject[key],
          uid: key,
        }));

        setEquipments(equipmentsList);
      } else {
        setEquipments(null);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    onListenForUsers();
    onListenForEquipments();

    return () => {
      off(firebase.equipments());
      off(firebase.users());
    }
  }, [period]);

  const onChangePeriod = event => {
    setPeriod(event.target.value);
  };
  
  const onSavePeriod = (event, authUser) => {
    (async () => {
      try {
        // Create the period for authUser in Firebase realtime database
        return await set(firebase.user(authUser.user.uid), {
          period,
        });
      } catch (error) {
        setError(error);
      }
    })();

    event.preventDefault();
  };
  
  const onToggleEditMode = () => {
    setEditMode(!editMode);
  };
  
  const onEditPeriod = (equipment, data06, data08, authUser) => {
    set(firebase.equipment(equipment.uid), {
      ...equipment,
      data06,
      data08,
      editedAt: serverTimestamp(),
      editedBy: authUser.uid,
    });
  };
  
  const onEditData12 = (equipment, data12) => {
    set(firebase.equipment(equipment.uid), {
      ...equipment,
      data12,
    });
  };

  return (
    <div>
      <h3>Оборудование, подлежащее метрологической аттестации, поверке, калибровке</h3>
      <form onSubmit={event => onSavePeriod(event, authUser)}>
        <p>на ближайшие <input
                          name="period"
                          size="1"
                          type="number"
                          step="1"
                          value={period}
                          onChange={onChangePeriod}
                        /> дней
                        <button type="submit">Сохранить</button>
        </p>
      </form>

      <table>
        <TableHead />
        <tbody>
        <Equipments
          authUser={authUser}
          editMode={editMode}
          equipments={equipments}
          loading={loading}
          users={users}
        />
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentsToCalibrate;
