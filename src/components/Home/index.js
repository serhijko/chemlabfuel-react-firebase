import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withAuthorization, withEmailVerification } from '../Session';
import * as ROUTES from '../../constants/routes';
import EquipmentsToCalibrate from '../Equipments/EquipmentsToCalibrate';

const HomePage = () => (
  <div>
    <h1>Home Page</h1>
    <p>Журналы химической лаборатории "Топливо":</p>
    <Link to={ROUTES.JOURNAL_T12}>Т-12 Журнал учета оборудования СМК-ХЛТ-03-ЖУО-011-2020</Link>
    <EquipmentsToCalibrate />
  </div>
);

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
  withEmailVerification,
)(HomePage);
