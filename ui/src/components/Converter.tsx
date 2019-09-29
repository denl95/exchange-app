import * as React from 'react';
import { Paper } from '@material-ui/core';
import styles from './Converter.scss';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import { CurrencyConverterStore } from '../stores/CurrencyConverterStore';
import { inject, observer } from 'mobx-react';

import MenuItem from '@material-ui/core/MenuItem';

interface Props {
  currencyConverterStore?: CurrencyConverterStore;
}

@inject((stores: any) => ({
  currencyConverterStore: stores.currencyConverterStore as CurrencyConverterStore,
}))
@observer
class Converter extends React.PureComponent<Props> {
  public componentDidMount(): void {
    this.props.currencyConverterStore.loadRates();
  }
  public handleFromCurrencyNumberChange = (event: any) => {
    const { value } = event.target;
    if (!isNaN(Number(value))) {
      this.props.currencyConverterStore.setFromCurrencyNumber(value);
    }
  }
  public handleToCurrencyChange = (event: any) => {
    this.props.currencyConverterStore.setToCurrency(event.target.value);
  }
  public handleFromCurrencyChange = (event: any) => {
    this.props.currencyConverterStore.setFromCurrency(event.target.value);
    this.props.currencyConverterStore.loadRates();
  }
  public renderContent() {
    const store = this.props.currencyConverterStore;

    return (
      <div className = 'm-4'>
        <div className = 'd-flex justify-content-center'>
          <TextField
            label = 'From'
            onChange = {this.handleFromCurrencyNumberChange}
            value = {store.fromCurrencyNumber}
            margin = 'normal'
          />
          <TextField
            style = {{ width: 200 }}
            label = 'From Currency'
            disabled = {store.isInProgress}
            select = {true}
            onChange = {this.handleFromCurrencyChange}
            value = {store.fromCurrency}
            margin = 'normal'
          >
            {store.currencies.map((key) => (
              <MenuItem key = {key} value = {key}>{key}</MenuItem>
            ))}
          </TextField>
        </div>
        <div className = 'd-flex mt-2 justify-content-center'>
          <TextField
            margin = 'normal'
            label = 'To'
            inputProps = {{
              readOnly: true,
            }}
            value = {store.toCurrencyNumber.toFixed(2)}
          />
          <TextField
            style = {{ width: 200 }}
            label = 'To Currency'
            margin = 'normal'
            select = {true}
            onChange = {this.handleToCurrencyChange}
            value = {store.toCurrency}
          >
            {store.currencies.map((key) => (
              <MenuItem key = {key} value = {key}>{key}</MenuItem>
            ))}
          </TextField>
        </div>
      </div>
    );
  }
  public renderFooter() {
    const store = this.props.currencyConverterStore;
    const toCurrencyRate = store.ratesMap[store.toCurrency];
    return (
      <div className = 'p-4'>
        <div>Your rate:</div>
        <div>{store.fromCurrency} 1 = {store.toCurrency} {toCurrencyRate}</div>
        <div>Last Updated: {store.dateUpdated}</div>
      </div>
    );
  }
  public render() {
    return (
      <Paper className = 'd-flex flex-column flex-grow-1'>
        <div className = {classNames(styles.header, 'd-flex justify-content-center py-2 font-weight-bold')}>
          Currency Converter
        </div>
        {this.renderContent()}
        {this.renderFooter()}
      </Paper>
    );
  }
}

export default Converter;
