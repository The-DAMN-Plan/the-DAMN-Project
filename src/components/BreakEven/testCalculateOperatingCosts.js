// Define test data
const filteredExpenses = [
    { expense_name: "Rent", expense_amount: 1000 },
    { expense_name: "Utilities", expense_amount: 300 }
];

const income = [
    { price: 105, purchasers: 50, cost_of_delivery: 5 }
];

const budget = [
    { escrow_savings: "10", valuepay: 200, y1_cogs: .25 }
];

// Define the function
function calculateOperatingCosts() {
    let totalOperatingCost = 0;
    let totalCostOfDelivery = 0;
    let projectedSales = 0;
    let breakEven = 0;
    
    for (const expense of filteredExpenses) {
        console.log(expense.expense_name, expense.expense_amount);
        totalOperatingCost += expense.expense_amount;
    }
    
    for (const item of income) {
        projectedSales += item.price * item.purchasers;
        totalCostOfDelivery += item.cost_of_delivery * item.purchasers;
    }

    let grossProfit = projectedSales - totalCostOfDelivery;
    console.log('escrow savings', budget[0].escrow_savings);
    console.log('gross profit', grossProfit * parseInt(budget[0].escrow_savings) / 100);
    totalOperatingCost += budget[0].valuepay * 12 + grossProfit * parseInt(budget[0].escrow_savings) / 100;
    let netBeforeTax = grossProfit - totalOperatingCost;
    console.log(budget[0].valuepay * 12);
    console.log('total operating cost:', totalOperatingCost, budget[0].valuepay, budget[0].valuepay * 12);
    console.log('net before tax:', netBeforeTax);
    console.log(budget);
    console.log(totalOperatingCost);
    console.log('y1_cogs:', 1- budget[0].y1_cogs/100);
    breakEven = totalOperatingCost / (1 - budget[0].y1_cogs / 100);
    console.log('Break Even:', breakEven);
    return totalOperatingCost;
}

// Call the function to test it: RUN: node testCalculateOperatingCosts.js
calculateOperatingCosts();
