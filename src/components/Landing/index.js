import React from 'react';

import './index.css';

const LandingPage = () => (
  <div className="Landing">
    <h1>ОАО "ГСКБ"</h1>
    <h2>Испытательный центр</h2>
    <h3>Химическая лаборатория "Топливо"</h3>
    <p>
      Программа (база данных) учета оборудования (
      <div className="dropdown">
        <span>СИ</span>
        <div className="dropdown-content">
          средств измерений
        </div>
      </div> и <div className="dropdown">
        <span>ИО</span>
        <div className="dropdown-content">
          испытательного оборудования
        </div>
      </div>
      ) и расходных материалов (реактивов).
    </p>
    <a
      className="App-link"
      href="https://www.gskb.by"
      target="_blank"
      rel="noopener noreferrer"
    >
      Сайт ОАО "ГСКБ"
    </a>
  </div>
);

export default LandingPage;
