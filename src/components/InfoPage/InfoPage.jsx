import React from 'react';
import { Typography, Card, CardContent, Stack } from '@mui/material';

function InfoPage() {
  return (
    <>
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Cash Flow Terminology
        </Typography>
        <Typography variant="body1" paragraph>
          Your singular goal in business is to “meet your customer’s wants and needs at a profit” and pay yourself! So, let’s do our businesses by the numbers!
        </Typography>
        <Typography variant="body1" paragraph>
          Cash Flow – Cash coming into your business from sales and capital injections. In accounting, cash flow is the difference in amount of cash available at the beginning of a period (opening balance) and the amount at the end of that period (closing balance). It is called positive if the closing balance is higher than the opening balance, otherwise called negative. Cash flow is increased by:
        </Typography>
        <Typography variant="body1">
          <ul>
            <li>Selling more goods or services</li>
            <li>Selling an asset</li>
            <li>Reducing costs</li>
            <li>Increasing selling price</li>
            <li>Collecting faster</li>
            <li>Paying slower</li>
            <li>Bring in more equity</li>
            <li>Taking a loan</li>
          </ul>
        </Typography>
        <Typography variant="body1" paragraph>
          Beginning Cash - The available cash that is carried forward from the previous month or the amount of cash that a new business start-up has to begin operations.
        </Typography>
        <Typography variant="body1" paragraph>
          Cash Receipts – The cash received from sales, deposits, cash injections, or by selling an asset. Its spendable cash within that month. This is not the same as sales.
        </Typography>
        <Typography variant="body1" paragraph>
          Total Cash Available – The sum of beginning cash and all cash receipts. Total Cash Available is all available cash that a business can use to pay operating costs including paying the owner their value pay.
        </Typography>
        <Typography variant="body1" paragraph>
          Fixed Costs - A fixed cost is a cost that does not change with an increase or decrease in the amount of goods or services produced or sold. Fixed costs are expenses that have to be paid by a company, regardless of any specific business activities.
        </Typography>
        <Typography variant="body1" paragraph>
          Variable Costs (Cost of Goods Sold) – A variable cost is an expense that changes in proportion to sales / production output. Variable costs increase or decrease depending on a company's sales / production volume; they rise as production increases and fall as production decreases. Variable expenses may also be referred to as Cost of Goods Sold (COGS) or Cost of Sales.
        </Typography>
        <Typography variant="body1" paragraph>
          Ending Cash Balance – The difference between Total Cash Available and the sum of Variable Costs and Fixed Costs (all operating costs.) This is the available cash that will be carried forward to the next month.
        </Typography>
      </CardContent>
    </Card>
    <Card>
    <CardContent>
      <Typography variant="h4" gutterBottom>
        Personal Budget: Three Steps To Determine Your Value Pay
      </Typography>
      <Typography variant="body1" paragraph>
        Step One: Enter in the amount spent per month on each line item If you have not taken the time to analyze your exact budget, now is a good time to do it.
      </Typography>
      <Typography variant="body1" paragraph>
        Step Two: Enter the percent of household expenses that you must cover in your household. Example: If you are the only income in your household, enter 100%. If you share expenses with another person, or receive support to assist with monthly household expenses, enter the percentage that you must cover with cash income.
      </Typography>
      <Typography variant="body1" paragraph>
        Step Three: Calculate your added Value Compensation. This is the amount of money, on top of the percentage of household and living expenses that the business must cover including income taxes. This is the amount of money that you want to get paid - the amount that expresses your value.
      </Typography>
      <Typography variant="body1" paragraph>
        Once you've completed these steps, you'll have a clearer understanding of your value pay and how it fits into your personal budget.
      </Typography>
    </CardContent>
  </Card>
  <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Marketing Plan: Six Steps To Prepare Your Marketing Budget
        </Typography>
        <Typography variant="body1" paragraph>
          Step One: Once you have completed your market research and made determined-decisions about your marketing strategy and the marketing tools that you will use, itemize the cost of each tool or marketing activity. Enter each activity in the Marketing Tools/Activities Column. If the marketing expense is already part of an employee's time or covered as a contractor fee, do not show the cost in the Table, but include the activity to document the task getting done.
        </Typography>
        <Typography variant="body1" paragraph>
          Step Two: For each item identify the frequency and timing of the activity or tool.
        </Typography>
        <Typography variant="body1" paragraph>
          Step Three: Identify who will be responsible for conducting the activities or producing the tools described. Are they a contractor or In-house talent? If you are not sure which is best, conduct a thorough time and cost/benefit analysis.
        </Typography>
        <Typography variant="body1" paragraph>
          Step Four: What assets such as copy, photos, pricing information, links, etc will be needed to successfully deploy this marketing activity. Be sure to factor in the time it takes, resources and cost to put all assets together.
        </Typography>
        <Typography variant="body1" paragraph>
          Step Five: Enter the cost per use or deployment for each item. Example: If it costs $20 for each ad and you plan to run the ad 12 times per month. Enter $20 in the Cost per Use Column and 12 in the Monthly Frequency Column. For items like promotional items or business cards, enter a monthly budget with a frequency of 1. Development of an initial website, signage or other large in frequent expenses will be itemized in start-up expenses.
        </Typography>
        <Typography variant="body1" paragraph>
          Step Six: For each marketing tool identify a specific and expected result. Examples: Increase customer loyalty as evidenced by repeat purchases. Increase sales in specific dollar amounts. Establish brand as evidenced by online rankings.
        </Typography>
      </CardContent>
    </Card>
  </>
  );
}

export default InfoPage;
