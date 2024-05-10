// Import moment library if not already imported
const moment = require('moment');

const expense = [
  { type: 'personal committed', expense_amount: 100 },
  { type: 'personal decision', expense_amount: 200 },
  { type: 'personal other', expense_amount: 100 },
  { type: 'personal other', expense_amount: '50' },
  { type: 'personal decision', expense_amount: '300' },
  { type: 'business other', expense_amount: 200}
];

// Should be 

// Simulated setTotalPersonalExpenses function
const setTotalPersonalExpenses = (total) => {
    console.log('Total personal expenses:', total);
};

// Simulate the useEffect hook for personal expenses
const useEffectPersonal = (effect, dependencies) => {
    console.log('useEffect for personal expenses is triggered');
    effect(); // Trigger the effect
};

// Simulated Value Pay component for personal expenses
const YourComponentPersonal = ({ expense }) => {
    useEffectPersonal(() => {
        const personalExpenses = expense.filter(item => item.type === 'personal committed' || item.type === 'personal decision' || item.type === 'personal other');
        const total = personalExpenses.reduce((acc, curr) => acc + Number(curr.expense_amount), 0);
        setTotalPersonalExpenses(total);
    }, [expense]);

    return null;
};

console.log('Rendering personal expenses component...');
YourComponentPersonal({ expense });
// Output should log the total personal expenses calculated by the useEffect hook for personal expenses

const futurePlans = [
  {
      name: "France",
      start_date: "2024-05-09",
      end_date: "2025-05-09",
      savings_needed: 12000
  },
  {
      name: "Pool",
      start_date: "2024-05-09",
      end_date: "2024-05-19",
      savings_needed: 12000
  }
];





// Simulated setTotalFutureSavings function
const setTotalFutureSavings = (total) => {
    console.log('Total future savings:', total);
};

// Simulate the useEffect hook for future plans
const useEffectFuture = (effect, dependencies) => {
    console.log('useEffect for future plans is triggered');
    effect(); // Trigger the effect
};

// Simulated component for future plans
const YourComponentFuture = ({ futurePlans }) => {
    useEffectFuture(() => {
        const total = futurePlans.reduce((acc, plan) => {
            const start = moment(plan.start_date);
            const end = moment(plan.end_date);
            const months = end.diff(start, 'months', true); // true for a fractional result
            const monthlySavings = parseFloat(plan.savings_needed) / Math.max(months, 1); // Avoid division by zero
            return acc + monthlySavings;
        }, 0);
        setTotalFutureSavings(total);
    }, [futurePlans]);

    return null; // Component doesn't render anything
};

console.log('Rendering future plans component...');
YourComponentFuture({ futurePlans });
// Output should log the total future savings calculated by the useEffect hook for future plans

//
const totalPersonalExpenses = 750; // Answer from the personal expenses total test
const totalFutureSavings = 13000; // Answer from the future plans toal test
const percent = 50; // Example value

// Simulated setRequiredIncome function
const setRequiredIncome = (newRequiredIncome) => {
    console.log('New required income:', newRequiredIncome);
};

// Simulate the useEffect hook for calculating required income
const useEffectRequiredIncome = (effect, dependencies) => {
    console.log('useEffect for required income is triggered');
    effect(); // Trigger the effect
};

// Simulated component for calculating required income (Takes the total personal expenses + total future plans * the percent of the expenses they have to pay)
const YourComponentRequiredIncome = ({ totalPersonalExpenses, totalFutureSavings, percent }) => {
    useEffectRequiredIncome(() => {
        const combinedTotalExpenses = totalPersonalExpenses + totalFutureSavings;
        const newRequiredIncome = (combinedTotalExpenses * (percent)) / 100;
        setRequiredIncome(newRequiredIncome);
    }, [totalPersonalExpenses, totalFutureSavings, percent]);

    return null;
};

console.log('Rendering required income component...');
YourComponentRequiredIncome({ totalPersonalExpenses, totalFutureSavings, percent });
// Output should log the new required income calculated by the useEffect hook for required income
