import { useContext, useEffect, useState } from 'react';
import { endAt, off, onValue, orderByChild, query, set } from 'firebase/database';

import { AuthUserContext } from '../Session';
import * as firebase from '../Firebase';
import TableHead from './TableHead';
import Equipments from './index';

const EquipmentsToCalibrate = () => {
  const [loading, setLoading] = useState(false);
  const [equipments, setEquipments] = useState([]);
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
      const equipmentsObject = snapshot.val();

      if (equipmentsObject) {
        // convert equipments list from snapshot
        const equipmentsList = Object.keys(equipmentsObject).map(key => ({
          ...equipmentsObject[key],
          uid: key,
        }));

        setEquipments(equipmentsList.sort((a, b) => (a.data11 - b.data11)));
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
    // eslint-disable-next-line
  }, [period]);

  const onChangePeriod = event => {
    setPeriod(event.target.value);
  };
  
  const onSavePeriod = (event, authUser) => {
    (async () => {
      try {
        // Create the period for authUser in Firebase realtime database
        return await set(firebase.user(authUser.uid), {
          period,
        });
      } catch (error) {
        setError(error);
      }
    })();

    event.preventDefault();
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
        <TableHead showExpirationDays={true} />
        <tbody>
        <Equipments
          authUser={authUser}
          equipments={equipments}
          loading={loading}
          users={users}
          noEquipmentText={error ? error.toString() : `Нет ИО, требующих метрологической аттестации, \
          и СИ, требующих поверки, калибровки в течение ближайших ${period} дней.`}
          showExpirationDays={true}
        />
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentsToCalibrate;
