import React, { useContext, useEffect, useState } from 'react';
import { endAt, off, onValue, orderByChild, push, query, serverTimestamp, set, startAt } from 'firebase/database';
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
  const [data12, setData12] = useState(''); // notes
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [equipments, setEquipments] = useState([]);
  const [start, setStart] = useState(0);
  const [users, setUsers] = useState(null);
  
  const onListenForUsers = () => {
    onValue(firebase.users(), snapshot => {
      setUsers(snapshot.val());
    });
  };

  const onListenForEquipments = () => {
    setLoading(true);

    onValue(query(firebase.equipments(), orderByChild('data01'), startAt(start), endAt(start + 5)), snapshot => {
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
  }, [start]);

  const authUser = useContext(AuthUserContext);

  const onCreateEquipment = (event, authUser) => {
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
      data08: nextDate(data06, data07),
      data09,
      data10,
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
    setData12('');

    event.preventDefault();
  };

  const onToggleEditMode = () => {
    setEditMode(!editMode);
  }

  const onEditData06 = (equipment, data06, data08, authUser) => {
    set(firebase.equipment(equipment.uid), {
      ...equipment,
      data06,
      data08,
      editedAt: serverTimestamp(),
      editedBy: authUser.uid,
    });
  };

  const onEditData07 = (equipment, data07, data08, authUser) => {
    set(firebase.equipment(equipment.uid), {
      ...equipment,
      data07,
      data08,
      editedAt: serverTimestamp(),
      editedBy: authUser.uid,
    });
  };

  const onEditData09 = (equipment, data09, authUser) => {
    set(firebase.equipment(equipment.uid), {
      ...equipment,
      data09,
      editedAt: serverTimestamp(),
      editedBy: authUser.uid,
    });
  };

  const onEditData10 = (equipment, data10, authUser) => {
    set(firebase.equipment(equipment.uid), {
      ...equipment,
      data10,
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

  const renderTableCols = () => {
    let cols = [];
    for (let i = 1; i <= 12; i++) {
      cols.push(<th key={"col" + i}>{i}</th>);
    }
    return cols;
  };

  const onPrevPage = () => {
    setStart(start - 1);
  };

  const onNextPage = () => {
    setStart(start + 1);
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

      {!loading && equipments && (
        <button type="button" onClick={onPrevPage}>
          Предыдущие
        </button>
      )}
      <form onSubmit={event => onCreateEquipment(event, authUser)}>
        <table>
          <thead>
          <tr>
            <th>№ п/п</th>
            <th>Наименование оборудования (ИО, СИ)</th>
            <th>Марка, тип</th>
            <th>Заводской номер (инв. номер)</th>
            <th>Год выпуска (ввод в эксплу-атацию)</th>
            <th>Периодичность метролог. аттестации, поверки, калибровки, мес.</th>
            <th>Дата последней аттестации, поверки, калибровки</th>
            <th>Дата следующей аттестации, поверки, калибровки</th>
            <th>Дата консервации</th>
            <th>Дата расконсервации</th>
            <th>Ответственный</th>
            <th>Примечания</th>
          </tr>
          <tr>
            {renderTableCols()}
          </tr>
          </thead>
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
          />

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
          </tbody>
        </table>
      </form>
      {!loading && equipments && (
        <button type="button" onClick={onNextPage}>
          Следующие
        </button>
      )}
    </div>
  );
};

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withEmailVerification,
)(Journal_T12);
