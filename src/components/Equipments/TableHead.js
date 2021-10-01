import React from 'react';

const TableHead = () => {
  const renderTableCols = () => {
    let cols = [];
    for (let i = 1; i <= 12; i++) {
      cols.push(<th key={"col" + i}>{i}</th>);
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
  );
};

export default TableHead;
