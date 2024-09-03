import React from 'react'
import { Card, Progress } from 'antd';

const Analytic = ({ allTransaction }) => {
  const totalTrans = allTransaction.length;
  const incomeTrans = allTransaction.filter((e) => e.type === 'Income');
  const expensetrans = allTransaction.filter((e) => e.type === 'Expense');

  const incomeTransPersantage = (incomeTrans.length / totalTrans) * 100;
  const expenseTransPersantage = (expensetrans.length / totalTrans) * 100;

  const totalIncomeAmount = incomeTrans.reduce((total, e) => total + e.amount, 0);
  const totalExpenseAmount = expensetrans.reduce((total, e) => total + e.amount, 0);
  const TotalTurnOver = totalIncomeAmount + totalExpenseAmount;

  const incomeAmountPersantage = (totalIncomeAmount / TotalTurnOver) * 100;
  const expenseAmountPersantage = (totalExpenseAmount / TotalTurnOver) * 100;

  const categories = [
    "Salary",
    "Freelancing",
    "Investment Income",
    "Business Income",
    "Food",
    "Movies",
    "Bills",
    "Rant",
    "Investment",
    "Other"
  ]

  return (
    <>
  
      <div className="row m-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total Transactions : {totalTrans}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income : {incomeTrans.length}
              </h5>
              <h5 className="text-danger">
                Expense : {expensetrans.length}
              </h5>
              <div>
                <Progress
                  type="circle"
                  percent={incomeTransPersantage.toFixed(0)}
                  strokeColor={"green"}
                  className='mx-2 mt-2'
                />
                <Progress
                  type="circle"
                  percent={expenseTransPersantage.toFixed(0)}
                  strokeColor={"red"}
                  className='mx-2 mt-2'
                />
              </div>
            </div>
          </div>


        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              Total TurnOver : {TotalTurnOver}
            </div>
            <div className="card-body">
              <h5 className="text-success">
                Income : {totalIncomeAmount}
              </h5>
              <h5 className="text-danger">
                Expense : {totalExpenseAmount}
              </h5>
              <div>
                <Progress
                  type="circle"
                  percent={incomeAmountPersantage.toFixed(0)}
                  strokeColor={"green"}
                  className='mx-2 mt-2'
                />
                <Progress
                  type="circle"
                  percent={expenseAmountPersantage.toFixed(0)}
                  strokeColor={"red"}
                  className='mx-2 mt-2'
                />
              </div>
            </div>
          </div>


        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              categories
            </div>
            <div className='mx-4 mt-4'>
              {
                categories.map(
                  (category) => {
                    const amt = allTransaction.filter(
                      (e) => e.type == 'Income' && e.category == category).reduce(
                        (total, e) => total + e.amount, 0
                      )

                    return amt > 0 && (
                      <div>
                        <h6>{category}</h6>
                        <Progress percent={((amt / totalIncomeAmount) * 100).toFixed(0)} status="active" strokeColor={"green"} />
                      </div>
                    );
                  })
              }

              {
                categories.map(
                  (category) => {
                    const amt = allTransaction.filter(
                      (e) => e.type == 'Expense' && e.category == category).reduce(
                        (total, e) => total + e.amount, 0
                      )

                    return amt > 0 && (
                      <div className=''>
                        <h6>{category}</h6>
                        <Progress percent={((amt / totalExpenseAmount) * 100).toFixed(0)} status="active" strokeColor={"red"} />
                      </div>
                    );
                  })
              }
            </div>
          </div>
        </div>


      </div>
    </>
  )
}

export default Analytic