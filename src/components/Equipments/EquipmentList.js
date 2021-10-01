import EquipmentItem from './EquipmentItem';

const EquipmentList = ({
                         authUser,
                         equipments,
                         onRemoveEquipment,
                         editMode,
                         onEditData06,
                         onEditData07,
                         onEditData09,
                         onEditData10,
                         onEditData12,
                         users,
                       }) => (
  <>
    {equipments.map(equipment => (
      <EquipmentItem
        key={equipment.uid}
        authUser={authUser}
        equipment={equipment}
        onRemoveEquipment={onRemoveEquipment}
        editMode={editMode}
        onEditData06={onEditData06}
        onEditData07={onEditData07}
        onEditData09={onEditData09}
        onEditData10={onEditData10}
        onEditData12={onEditData12}
        users={users}
      />
    ))}
  </>
);

export default EquipmentList;
