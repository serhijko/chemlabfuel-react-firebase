import { Component } from 'react';
import nextDate from '../../handlers/nextCalibrationCalculation';
import toRussianDateFormat from '../../handlers/toRussianDateFormat';
import nextCalibrationTime from '../../handlers/nextCalibrationTime';

class EquipmentItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode06: false,
      editData06: this.props.equipment.data06,
      editMode07: false,
      editData07: this.props.equipment.data07,
      editMode09: false,
      editData09: this.props.equipment.data09,
      editMode10: false,
      editData10: this.props.equipment.data10,
      editMode12: false,
      editData12: this.props.equipment.data12,
    };
  }

  onToggleEditMode06 = () => {
    this.setState(state => ({
      editMode06: !state.editMode06,
      editData06: this.props.equipment.data06,
    }));
  };

  onToggleEditMode07 = () => {
    this.setState(state => ({
      editMode07: !state.editMode07,
      editData07: this.props.equipment.data07,
    }));
  };

  onToggleEditMode09 = () => {
    this.setState(state => ({
      editMode09: !state.editMode09,
      editData09: this.props.equipment.data09,
    }));
  };

  onToggleEditMode10 = () => {
    this.setState(state => ({
      editMode10: !state.editMode10,
      editData10: this.props.equipment.data10,
    }));
  };

  onToggleEditMode12 = () => {
    this.setState(state => ({
      editMode12: !state.editMode12,
      editData12: this.props.equipment.data12,
    }));
  };

  onChangeEditData = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSaveEditData06 = (authUser) => {
    const nextCalibration = nextDate(this.state.editData06, this.props.equipment.data07);
    const puttingInStorage = this.props.equipment.data09;
    const removingFromStorage = this.props.equipment.data10;
    this.props.onEditData06(
      this.props.equipment,
      this.state.editData06,
      nextCalibration,
      nextCalibrationTime(nextCalibration, puttingInStorage, removingFromStorage),
      authUser,
    );

    this.setState({ editMode06: false });
  };

  onSaveEditData07 = (authUser) => {
    const nextCalibration = nextDate(this.props.equipment.data06, this.state.editData07);
    const puttingInStorage = this.props.equipment.data09;
    const removingFromStorage = this.props.equipment.data10;
    this.props.onEditData07(
      this.props.equipment,
      this.state.editData07,
      nextCalibration,
      nextCalibrationTime(nextCalibration, puttingInStorage, removingFromStorage),
      authUser,
    );

    this.setState({ editMode07: false });
  };

  onSaveEditData09 = (authUser) => {
    const nextCalibration = nextDate(this.props.equipment.data06, this.props.equipment.data07);
    const puttingInStorage = this.state.editData09;
    const removingFromStorage = this.props.equipment.data10;
    this.props.onEditData09(
      this.props.equipment,
      this.state.editData09,
      nextCalibrationTime(nextCalibration, puttingInStorage, removingFromStorage),
      authUser,
    );

    this.setState({ editMode09: false });
  };

  onSaveEditData10 = (authUser) => {
    const nextCalibration = nextDate(this.props.equipment.data06, this.props.equipment.data07);
    const puttingInStorage = this.props.equipment.data09;
    const removingFromStorage = this.state.editData10;
    this.props.onEditData10(
      this.props.equipment,
      this.state.editData10,
      nextCalibrationTime(nextCalibration, puttingInStorage, removingFromStorage),
      authUser,
    );

    this.setState({ editMode10: false });
  };

  onSaveEditData12 = () => {
    this.props.onEditData12(this.props.equipment, this.state.editData12);

    this.setState({ editMode12: false });
  };

  render() {
    const {
      authUser,
      editMode,
      equipment,
      onRemoveEquipment,
      users,
    } = this.props;

    const {
      editMode06,
      editData06,
      editMode07,
      editData07,
      editMode09,
      editData09,
      editMode10,
      editData10,
      editMode12,
      editData12,
    } = this.state;

    return (
      <tr>
        <td>{equipment.data01}</td>
        <td>{equipment.data02}</td>
        <td>{equipment.data03}</td>
        <td>{equipment.data04}</td>
        <td>{equipment.data05}</td>
        <td>
          {editMode06 ? (
            <input
              name="editData06"
              size="2"
              type="number"
              step="12"
              value={editData06}
              onChange={this.onChangeEditData}
            />
          ) : (
            <span>
              {equipment.data06}
            </span>
          )}
          {editMode && (editMode06 ? (
            <span>
              <button onClick={() => this.onSaveEditData06(authUser)}>Сохранить</button>
              <button onClick={this.onToggleEditMode06}>Отмена</button>
            </span>
          ) : (
            <button onClick={this.onToggleEditMode06}>Править</button>
          ))}
        </td>
        <td>
          {editMode07 ? (
            <input
              name="editData07"
              size="10"
              type="date"
              value={editData07}
              onChange={this.onChangeEditData}
            />
          ) : (
            <span>
              {toRussianDateFormat(equipment.data07)}
            </span>
          )}
          {editMode && (editMode07 ? (
            <span>
              <button onClick={() => this.onSaveEditData07(authUser)}>Сохранить</button>
              <button onClick={this.onToggleEditMode07}>Отмена</button>
            </span>
          ) : (
            <button onClick={this.onToggleEditMode07}>Править</button>
          ))}
        </td>
        <td>{toRussianDateFormat(equipment.data08)}</td>
        <td>
          {editMode09 ? (
            <input
              name="editData09"
              size="10"
              type="date"
              value={editData09}
              onChange={this.onChangeEditData}
            />
          ) : (
            <span>
              {toRussianDateFormat(equipment.data09)}
            </span>
          )}
          {editMode && (editMode09 ? (
            <span>
              <button onClick={() => this.onSaveEditData09(authUser)}>Сохранить</button>
              <button onClick={this.onToggleEditMode09}>Отмена</button>
            </span>
          ) : (
            <button onClick={this.onToggleEditMode09}>Править</button>
          ))}
        </td>
        <td>
          {editMode10 ? (
            <input
              name="editData10"
              size="10"
              type="date"
              value={editData10}
              onChange={this.onChangeEditData}
            />
          ) : (
            <span>
              {toRussianDateFormat(equipment.data10)}
            </span>
          )}
          {editMode && (editMode10 ? (
            <span>
              <button onClick={() => this.onSaveEditData10(authUser)}>Сохранить</button>
              <button onClick={this.onToggleEditMode10}>Отмена</button>
            </span>
          ) : (
            <button onClick={this.onToggleEditMode10}>Править</button>
          ))}
        </td>
        <td>
          {
            users[equipment.createdBy].username.lastName + ' ' +
            users[equipment.createdBy].username.firstName.slice(0, 1) + '.'
            || equipment.createdBy
          }
          {editMode && (
            <button
              type="button"
              onClick={() => onRemoveEquipment(equipment.uid)}
            >
              Удалить СИ/ИО
            </button>
          )}
        </td>
        <td>
          {editMode12 ? (
            <input
              name="editData12"
              size="10"
              type="text"
              value={editData12}
              onChange={this.onChangeEditData}
            />
          ) : (
            <span>
              {equipment.data12}
            </span>
          )}
          {editMode && (editMode12 ? (
            <span>
              <button onClick={this.onSaveEditData12}>Сохранить</button>
              <button onClick={this.onToggleEditMode12}>Отмена</button>
            </span>
          ) : (
            <button onClick={this.onToggleEditMode12}>Править</button>
          ))}
          {equipment.data12 && equipment.editedAt && ' '}
          {equipment.editedAt &&
            <span>
              Изменено {toRussianDateFormat(equipment.editedAt)} {
                users[equipment.editedBy].username.lastName + ' ' +
                users[equipment.editedBy].username.firstName.slice(0, 1) + '.'
                || equipment.editedBy
              }
            </span>
          }
        </td>
      </tr>
    );
  }
}

export default EquipmentItem;
