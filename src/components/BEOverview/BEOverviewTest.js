function calculateExpenseToDeliver(sale) {
    let total = 0;
    for (const item of sale) {
      // console.log(item);
      // console.log(item.cost_of_delivery * item.purchasers);
      total += item.cost_of_delivery * item.purchasers;
        // total+= item.cost_of_delivery;
    }
    return total;
  }

  function calculateTotal(sale) {
    let total = 0;
    for (const item of sale) {
      //total revenue
      // total += (item.price / item.time_used) * Number(item.purchasers);
      total += (item.price) * Number(item.purchasers);
      
    }
    return total;
  }

let income = [{
      budget_id: 3,
      cost_of_delivery: 5,
      description: '',
      id: 4,
      ideal_client: '',
      price: 175,
      purchasers: 200,
      rate_of_love: 3,
      revenue_stream: "",
      revenue_stream: '',
      time_used: 2.5,
      unit: 'Hour'
    },
    {
      budget_id: 3,
      cost_of_delivery: 22.75,
      description: '',
      id: 4,
      ideal_client: '',
      price: 5500,
      purchasers: 7,
      rate_of_love: 3,
      revenue_stream: "",
      revenue_stream: '',
      time_used: 36,
      unit: 'Hour'
    },
    {
      budget_id: 3,
      cost_of_delivery: 45,
      description: '',
      id: 4,
      ideal_client: '',
      price: 12000,
      purchasers: 8,
      rate_of_love: 3,
      revenue_stream: "",
      revenue_stream: '',
      time_used: 60,
      unit: 'Hour'
    },
    {
      budget_id: 3,
      cost_of_delivery: 150,
      description: '',
      id: 4,
      ideal_client: '',
      price: 30000,
      purchasers: 1,
      rate_of_love: 3,
      revenue_stream: "",
      revenue_stream: '',
      time_used: 150,
      unit: 'Hour'
    }

];
    
console.log(199500 === calculateTotal(income)? 'Test Passed' : `Test Failed, expected ${199500} but got ${calculateTotal(income)}`);
console.log(1669.25 === calculateExpenseToDeliver(income)? 'Test Passed' : `Test Failed, expected ${1669.25} but got ${calculateExpenseToDeliver(income)}`);