export default class Money {
  constructor(value) {
    this._value = value? this.removeDotSeparators(value.toString()).replace(',', '.') : "";
    this._formater = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }

  format(value) {
    return this._formater.format(value);
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    this._value = newValue;
  }

  get currency() {
    return this.toPureCurrency(this.value).replace(/\./g, "");
  }

  get preCurrency() {
    return this.toPrefixedCurrency(this.value);
  }

  get float() {
    return parseFloat(this.value) || 0;
  }

  removeDotSeparators(string) {
    if(string.includes(',') && string.includes('.')) {
      return string.replaceAll('.', '');
    }

    return string;
  }

  sum(moneyToSum) {
    const floatMoney = this.float;
    return new Money(`${floatMoney + moneyToSum.float}`);
  }

  subtract(moneyToSubtract) {
    const floatMoney = this.float;
    return new Money(`${floatMoney - moneyToSubtract.float}`);
  }

  toPrefixedCurrency(value) {
    return this.format(value);
  }

  toPureCurrency(value) {
    return this.toPrefixedCurrency(value).slice(3);
  }
}
