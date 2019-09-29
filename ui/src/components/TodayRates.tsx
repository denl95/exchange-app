import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { TodayRatesStore } from '../stores/TodayRatesStore';
import classNames from 'classnames';
import styles from './TodayRates.scss';
import { Paper } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { CurrencyConverterStore } from '../stores/CurrencyConverterStore';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

interface Props {
  todayRatesStore?: TodayRatesStore;
  currencyConverterStore?: CurrencyConverterStore;
}

@inject((stores: any) => ({
  todayRatesStore: stores.todayRatesStore as TodayRatesStore,
  currencyConverterStore: stores.currencyConverterStore as CurrencyConverterStore,
}))
@observer
class TodayRates extends React.PureComponent<Props> {
  public componentDidMount(): void {
    this.props.todayRatesStore.loadTodayRates();
  }
  public handleSourceCurrencyChange = (event: any) => {
    this.props.todayRatesStore.setSourceCurrency(event.target.value);
    this.props.todayRatesStore.loadTodayRates();
  }
  public renderContent() {
    const { todayRatesStore } = this.props;
    const keys = Object.keys(todayRatesStore.ratesMap);
    return (
      <div className = 'p-4'>
        <Table>
          <TableBody>
            {keys.map((currency) => (
              <TableRow key = {currency}>
                <TableCell>{currency}</TableCell>
                <TableCell align = 'right'>{todayRatesStore.ratesMap[currency]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
  public render() {
    const { currencyConverterStore, todayRatesStore } = this.props;
    return (
      <Paper className = 'd-flex flex-column ml-4 flex-grow-2'>
        <div className = {classNames(styles.header, 'd-flex justify-content-between align-items-center p-2 font-weight-bold')}>
          <span>Today's rates</span>
          <TextField
            className = {classNames(styles.textField, 'ml-3')}
            select = {true}
            onChange = {this.handleSourceCurrencyChange}
            value = {todayRatesStore.sourceCurrency}
            InputProps = {{
              startAdornment: <InputAdornment position = 'start'>1</InputAdornment>,
            }}
          >
            {currencyConverterStore.currencies.map((key) => (
              <MenuItem key = {key} value = {key}>{key}</MenuItem>
            ))}
          </TextField>
        </div>
        {this.renderContent()}
      </Paper>
    );
  }
}

export default TodayRates;
