import EquipmentItem from './EquipmentItem';

const EquipmentList = ({
                         authUser,
                         equipments,
                         onRemoveEquipment,
                         editMode,
                         onEditData,
                         showExpirationDays,
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
        onEditData={onEditData}
        showExpirationDays={showExpirationDays}
        users={users}
      />
    ))}
  </>
);

export default EquipmentList;
