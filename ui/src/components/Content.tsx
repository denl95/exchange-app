import * as React from 'react';
import Converter from './Converter';
import TodayRates from './TodayRates';

class Content extends React.PureComponent {
  public render() {
    return (
      <div className = 'container d-flex mt-5'>
        <Converter />
        <TodayRates />
      </div>
    );
  }
}

export default Content;
