import { action, observable } from 'mobx';
import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from './Constants';

export const DEFAULT_CURRENCIES = ['EUR', 'GBP', 'CAD', 'MXN', 'JPY'];
const DEFAULT_SOURCE_CURRENCY = 'USD';

export class TodayRatesStore {
  @observable public isInProgress: boolean = false;
  @observable public sourceCurrency: string = DEFAULT_SOURCE_CURRENCY;
  @observable public ratesMap: { [key: string]: number } = {};

  @action public setSourceCurrency(currency: string) {
    this.sourceCurrency = currency;
  }
  @action public loadTodayRates() {
    this.isInProgress = true;
    let currencies = DEFAULT_CURRENCIES;

    const index = DEFAULT_CURRENCIES.findIndex((key) => {
      return key === this.sourceCurrency;
    });

    if (index !== -1) {
      currencies = DEFAULT_CURRENCIES.slice(0);
      currencies[index] = DEFAULT_SOURCE_CURRENCY;
    }

    axios
      .get(`${API_BASE_URL}latest?base=${this.sourceCurrency}&&symbols=${currencies.join(',')}`)
      .then(action((response: AxiosResponse) => {
        const { rates } = response.data;
        this.ratesMap = rates;
        this.isInProgress = false;
      }));

  }
}

export default new TodayRatesStore();
