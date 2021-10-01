import React, { useContext, useEffect, useState } from 'react';
import { off, onValue, push, serverTimestamp, set } from 'firebase/database';
import { compose } from 'recompose';

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../Session';
import Equipments from '../Equipments';
import * as firebase from '../Firebase';
import useFormInput from '../../handlers/useFormInput';
import './Journal_T12.css';
import nextDate from '../../handlers/nextCalibrationCalculation';
import TableHead from '../Equipments/TableHead';
import nextCalibrationTime from '../../handlers/nextCalibrationTime';

const Journal_T12 = () => {
  const [data01, setData01] = useState(''); // number
  const [data02, setData02] = useState(''); // name of equipment
  const [data03, setData03] = useState(''); // mark
  const [data04, setData04] = useState(''); // serial
  const [data05, setData05] = useState(''); // release
  const [data06, setData06] = useState(''); // periodicity
  const [data07, setData07] = useState(''); // last calibration
  const [, setData08] = useState(''); // next calibration
  const [data09, setData09] = useState(''); // putting in storage
  const [data10, setData10] = useState(''); // removing from storage
  const [, setData11] = useState(''); // time of removing from storage or expiration of calibration
  const [data12, setData12] = useState(''); // notes
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [equipments, setEquipments] = useState([]);
  const [users, setUsers] = useState(null);

  const authUser = useContext(AuthUserContext);

  const onListenForUsers = () => {
    onValue(firebase.users(), snapshot => {
      setUsers(snapshot.val());
    });
  };

  const onListenForEquipments = () => {
    setLoading(true);

    onValue(firebase.equipments(), snapshot => {
      const equipmentsObject = snapshot.val();

      if (equipmentsObject) {
        // convert equipments list from snapshot
        const equipmentsList = Object.keys(equipmentsObject).map(key => ({
          ...equipmentsObject[key],
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
  }, []);

  const onCreateEquipment = (event, authUser) => {
    const nextCalibration = nextDate(data06, data07);
    push(firebase.equipments(), {
      createdAt: serverTimestamp(),
      createdBy: authUser.uid,
      data01: data01/1,
      data02,
      data03,
      data04,
      data05,
      data06,
      data07,
      data08: nextCalibration,
      data09,
      data10,
      data11: nextCalibrationTime(nextCalibration, data09, data10),
      data12,
    });

    setData01('');
    setData02('');
    setData03('');
    setData04('');
    setData05('');
    setData06('');
    setData07('');
    setData08('');
    setData09('');
    setData10('');
    setData11('');
    setData12('');

    event.preventDefault();
  };

  const onToggleEditMode = () => {
    setEditMode(!editMode);
  }

  const onEditData06 = (equipment, data06, data08, data11, authUser) => {
    set(firebase.equipment(equipment.uid), {
      ...equipment,
      data06,
      data08,
      data11,
      editedAt: serverTimestamp(),
      editedBy: authUser.uid,
    });
  };

  const onEditData07 = (equipment, data07, data08, data11, authUser) => {
    set(firebase.equipment(equipment.uid), {
      ...equipment,
      data07,
      data08,
      data11,
      editedAt: serverTimestamp(),
      editedBy: authUser.uid,
    });
  };

  const onEditData09 = (equipment, data09, data11, authUser) => {
    set(firebase.equipment(equipment.uid), {
      ...equipment,
      data09,
      data11,
      editedAt: serverTimestamp(),
      editedBy: authUser.uid,
    });
  };

  const onEditData10 = (equipment, data10, data11, authUser) => {
    set(firebase.equipment(equipment.uid), {
      ...equipment,
      data10,
      data11,
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
      <h1>Химическая лаборатория "Топливо"</h1>
      <h2>Журнал учета оборудования (СИ и ИО)
      <button
        type="button"
        onClick={onToggleEditMode}
      >
        {!editMode ? (
          'Включить режим правки таблицы'
        ) : (
          'Выключить режим правки таблицы'
        )}
      </button></h2>

      <form onSubmit={event => onCreateEquipment(event, authUser)}>
        <table className="scroll">
          <TableHead />
          <tbody>
          <Equipments
            authUser={authUser}
            editMode={editMode}
            equipments={equipments}
            loading={loading}
            onEditData06={onEditData06}
            onEditData07={onEditData07}
            onEditData09={onEditData09}
            onEditData10={onEditData10}
            onEditData12={onEditData12}
            users={users}
            noEquipmentText={"Нет ИО и СИ ..."}
          />
          </tbody>

          <tfoot>
          <tr>
            <td>
              <input
                {...useFormInput(data01, setData01)}
                size="1"
                type="text"
              />
            </td>
            <td>
              <input
                {...useFormInput(data02, setData02)}
                size="12"
                type="text"
              />
            </td>
            <td>
              <input
                {...useFormInput(data03, setData03)}
                size="8"
                type="text"
              />
            </td>
            <td>
              <input
                {...useFormInput(data04, setData04)}
                size="8"
                type="text"
              />
            </td>
            <td>
              <input
                {...useFormInput(data05, setData05)}
                size="10"
                type="text"
              />
            </td>
            <td>
              <input
                {...useFormInput(data06, setData06)}
                size="2"
                type="number"
                step="12"
              />
            </td>
            <td>
              <input
                {...useFormInput(data07, setData07)}
                size="10"
                type="date"
              />
            </td>
            <td>
            </td>
            <td>
              <input
                {...useFormInput(data09, setData09)}
                size="10"
                type="date"
              />
            </td>
            <td>
              <input
                {...useFormInput(data10, setData10)}
                size="10"
                type="date"
              />
            </td>
            <td>
              <button type="submit">Добавить</button>
            </td>
            <td>
              <input
                {...useFormInput(data12, setData12)}
                size="10"
                type="text"
              />
            </td>
          </tr>
          </tfoot>
        </table>
      </form>
    </div>
  );
};

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withEmailVerification,
)(Journal_T12);
