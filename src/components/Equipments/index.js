import { remove } from 'firebase/database';

import * as firebase from '../Firebase';
import EquipmentList from './EquipmentList';

const Equipments = ({
  authUser,
  editMode,
  equipments,
  loading,
  noEquipmentText,
  onEditData,
  showExpirationDays,
  users,
                    }) => {
  const onRemoveEquipment = uid => {
    remove(firebase.equipment(uid));
  };

  return (
    <>
      {loading && <tr><td colSpan="12">Загрузка ...</td></tr>}

      {equipments ? (
        <>
        <EquipmentList
          authUser={authUser}
          equipments={equipments}
          editMode={editMode}
          onEditData={onEditData}
          onRemoveEquipment={onRemoveEquipment}
          showExpirationDays={showExpirationDays}
          users={users}
        />
        <tr><td colSpan="12">* метрологической аттестации, поверки, калибровки</td></tr>
        </>
      ) : (
        <tr><td colSpan="12">{noEquipmentText}</td></tr>
      )}
    </>
  );
};

export default Equipments;
