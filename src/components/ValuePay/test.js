const expense = [
  { type: 'personal committed', expense_amount: 100 },
  { type: 'personal decision', expense_amount: 200 },
  { type: 'personal other', expense_amount: 100 },
  { type: 'personal other', expense_amount: '50' },
  {type: 'personal decision', expense_amount: '300' },
  { type: 'business other', expense_amount: 200}
  // Add more test cases if needed
];

// Simulated setTotalPersonalExpenses function
const setTotalPersonalExpenses = (total) => {
  console.log('Total personal expenses:', total);
};

// Simulate the useEffect hook
const useEffect = (effect, dependencies) => {
  console.log('useEffect is triggered');
  effect(); // Trigger the effect
};

// Simulated component
const YourComponent = ({ expense }) => {
  useEffect(() => {
      const personalExpenses = expense.filter(item => item.type === 'personal committed' || item.type === 'personal decision' || item.type === 'personal other');
      const total = personalExpenses.reduce((acc, curr) => acc + Number(curr.expense_amount), 0);
      setTotalPersonalExpenses(total);
  }, [expense]);

  return null; // Component doesn't render anything
};

// Render the component and trigger useEffect
console.log('Rendering component...');
YourComponent({ expense });

// Output should log the total personal expenses calculated by the useEffect hook
