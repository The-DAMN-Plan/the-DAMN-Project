
// @params value: number This number will be formatted as a currency
const Currency = ({ value }) => {
    let amount = parseFloat(value, 10);
    if (isNaN(amount)) {
        amount = 0;
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
        amount
    );
}

export default Currency;