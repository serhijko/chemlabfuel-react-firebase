import React from 'react';

const TableHead = ({ showExpirationDays }) => {
  const renderTableCols = () => {
    let cols = [];
    for (let i = 1; i <= 12; i++) {
      cols.push(<th className="r2" key={"col" + i}>{i}</th>);
    }
    return cols;
  };

  return (
    <thead>
    <tr>
      <th>№ п/п</th>
      <th>Наименование оборудования (ИО, СИ)</th>
      <th>Марка, тип</th>
      <th>Заводской номер (инв. номер)</th>
      <th>Год выпуска (ввод в эксплуатацию)</th>
      <th>Периодичность поверки*, мес.</th>
      <th>Дата последней поверки*</th>
      <th>Дата следующей поверки*</th>
      <th>Дата консервации</th>
      <th>Дата расконсервации</th>
      <th>{showExpirationDays ? "До истечения срока поверки*" : "Ответственный"}</th>
      <th>Примечания</th>
    </tr>
    <tr>
      {renderTableCols()}
    </tr>
    </thead>
  );
};

export default TableHead;
