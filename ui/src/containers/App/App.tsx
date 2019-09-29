import * as React from 'react';
import { hot } from 'react-hot-loader/root';

import './App.scss';
import Header from '../../components/Header';
import { Provider } from 'mobx-react';
import currencyConverterStore from '../../stores/CurrencyConverterStore';
import todayRatesStore from '../../stores/TodayRatesStore';
import Content from '../../components/Content';

const stores = {
  currencyConverterStore,
  todayRatesStore,
};

class App extends React.Component {
  public render() {
    return (
      <Provider {...stores}>
        <div className = 'h-100'>
          <Header />
          <Content />
        </div>
      </Provider>
    );
  }
}

export default hot(App);
