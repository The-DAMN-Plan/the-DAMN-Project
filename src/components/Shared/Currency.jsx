
// @params value: number This number will be formatted as a currency
const Currency = ({ value }) => {
    const amount = parseFloat(value, 10);
    return new Intl.NumberFormat('en-US', { style:'currency' , currency: 'USD' }).format(
            amount
    );
}

export default Currency;