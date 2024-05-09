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

  export {calculateExpenseToDeliver, calculateTotal};