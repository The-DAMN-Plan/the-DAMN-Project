import { calculateTotal, calculateExpenseToDeliver } from "./BEOverview.utils";

let income = [
    {budget_id: 3,
    cost_of_delivery: 5,
    ​​​description: "Hourly one-offs to solve short-term needs",
    ​​​id: 4,
    ​​​ideal_client: "Past Clients",
    ​​​price: 175,
    ​​​purchasers: 200,
    ​​​rate_of_love: 3,
    ​​​revenue_stream: "Contract - Small Package",
    ​​​time_used: 2.5,
    ​​​unit: "Hour"}]
console.log('Total projected sales',199500 === calculateTotal(income)? 'Pass' : `Fail, expected ${199500} but got ${calculateTotal(income)}`);
console.log('Total expense to deliver',1669.25 === calculateExpenseToDeliver(income)? 'Pass' : `Fail, expected ${1669.25} but got ${calculateTotal(income)}`);

