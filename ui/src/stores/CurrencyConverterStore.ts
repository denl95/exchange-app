import { action, computed, observable } from 'mobx';
import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from './Constants';

export class CurrencyConverterStore {
  @observable public isInProgress: boolean = false;
  @observable public fromCurrencyNumber: string = '1000.0';
  @observable public fromCurrency: string = 'USD';
  @observable public toCurrency: string = 'ILS';
  @observable public dateUpdated: string;
  @observable public ratesMap: { [key: string]: number } = {};

  @computed public get currencies() {
    return Object.keys(this.ratesMap);
  }
  @computed public get toCurrencyNumber() {
    const rate = this.ratesMap[this.toCurrency];
    return Number(this.fromCurrencyNumber) * rate;
  }
  @action public setFromCurrency(currency: string) {
    this.fromCurrency = currency;
  }
  @action public setToCurrency(currency: string) {
    this.toCurrency = currency;
  }
  @action public setFromCurrencyNumber(amount: string) {
    this.fromCurrencyNumber = amount;
  }
  @action public loadRates() {
    this.isInProgress = true;
    axios
      .get(`${API_BASE_URL}latest?base=${this.fromCurrency}`)
      .then(action((response: AxiosResponse) => {
        const { rates, date } = response.data;
        this.ratesMap = rates;
        this.dateUpdated = date;
        this.isInProgress = false;
        // for some reason only for EUR it won't be in response
        if (this.fromCurrency === 'EUR') {
          this.ratesMap[this.fromCurrency] = 1;
        }
      }));

  }
}

export default new CurrencyConverterStore();
