import React from 'react';
import { Typography, Card, CardContent, Stack } from '@mui/material';

function InfoPage() {
  return (
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
  );
}

export default InfoPage;
