import { remove } from 'firebase/database';

import * as firebase from '../Firebase';
import EquipmentList from './EquipmentList';

const Equipments = ({
  authUser,
  editMode,
  equipments,
  loading,
  noEquipmentText,
  onEditData06,
  onEditData07,
  onEditData09,
  onEditData10,
  onEditData12,
  users,
                    }) => {
  const onRemoveEquipment = uid => {
    remove(firebase.equipment(uid));
  };

  return (
    <>
      {loading && <tr><td colSpan="12">Загрузка ...</td></tr>}

      {equipments ? (
        <EquipmentList
          authUser={authUser}
          equipments={equipments}
          editMode={editMode}
          onEditData06={onEditData06}
          onEditData07={onEditData07}
          onEditData09={onEditData09}
          onEditData10={onEditData10}
          onEditData12={onEditData12}
          onRemoveEquipment={onRemoveEquipment}
          users={users}
        />
      ) : (
        <tr><td colSpan="12">{noEquipmentText}</td></tr>
      )}
    </>
  );
};

export default Equipments;
