import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import moment from 'moment'
import Spinner from './Spinner';
import Analytic from './Analytic';
import axios from 'axios';

const { RangePicker } = DatePicker;

const Home = () => {
  const navigate = useNavigate();
  const [viewModel, setViewModel] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [allTransaction, setAllTransaction] = useState([]);
  const [frequency, setfrequency] = useState("365");
  const [type, settype] = useState("All");
  const [selectedDate, setSelectedate] = useState([]);
  const [viewOfPage, setViewOfPage] = useState('Analytics');
  const [Income, setIncome] = useState(0);
  const [Expense, setExpense] = useState(0);
  const [Balance, setBalance] = useState(0);
  const [Editable, setEditable] = useState(null);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text) => (
        <span className={text === 'Income' ? 'Income' : 'Expense'}>{text.toUpperCase()}</span>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (text) => (
        <span>{text.toUpperCase()}</span>
      ),
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined className="mx-3"
            onClick={() => {
              setEditable(record)
              setViewModel(true)
            }} />
          <DeleteOutlined
            onClick={ () => {
              deleteHandler(record)
            }
            }
          />
        </div>
      )
    },
  ];

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("data"));
    if (!userData) {
      navigate('/login');
    }

  }, []);

  const onClickOfTableButton = () => {
    if (viewOfPage === "Table") {
      setViewOfPage("Analytics");
    } else {
      setViewOfPage("Table");
    }
  }

  useEffect(() => {
    //Get ALL Transaction
    const getAllTransaction = async () => {
      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem("data"));

        const res = await axios.post("/getAllTrans", {
          userid: user._id,
          frequency,
          selectedDate,
          type
        });

        setAllTransaction(res.data);
        setLoading(false);
        const incomeTrans = res.data.filter((e) => e.type === 'Income');
        const expensetrans = res.data.filter((e) => e.type === 'Expense');
        const totalIncomeAmount = incomeTrans.reduce((total, e) => total + e.amount, 0);
        const totalExpenseAmount = expensetrans.reduce((total, e) => total + e.amount, 0);
        const balance = totalIncomeAmount - totalExpenseAmount;
        setIncome(totalIncomeAmount);
        setExpense(totalExpenseAmount);
        setBalance(balance);

      } catch (error) {
        console.log(error);
      }
    }
    getAllTransaction();
  }, [selectedDate, frequency, type, Income, Expense, Balance])

  //create-transaction
  const submitHandler = async (values) => {

    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("data"));
      const data = {
        "userid": user._id,
        "amount": values.amount,
        "category": values.category,
        "type": values.type,
        "refrence": values.refrence,
        "description": values.description,
        "date": values.date
      }
      console.log("Editable ", Editable);
      if (Editable !== null) {
        await axios.put("/updateTrans", {
          transectionId: Editable._id,
          payload: {
            ...values,
            userid: user._id,
          },
        });
        setLoading(false);
        setViewModel(false);
        message.success("Transaction updated successfully");
      } else {
        await axios.post("/createTrans", data);
        setLoading(false);
        setViewModel(false);
        message.success("Transaction added successfully");
      }
      setEditable(null);
    } catch (error) {
      message.error("something went wrong");
      console.log(error);
    }

  }

  const deleteHandler = async (record) => {
    try {
      console.log(record._id);
      setLoading(true);
      await axios.post("/deleteTrans", { transectionId: record._id });
      setLoading(false);
      message.success("Transaction Deleted successfully");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  }
  return (
    <>

      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="box">
              <p>Total Income: {Income}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="box">
              <p>Total Expense: {Expense}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="box">
              <p>Balance : {Balance}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container1">
        <div className="left-side">

          <div className='frequency'>
            <h6>Select Frequency</h6>
            <Select value={frequency} onChange={(values) => setfrequency(values)}>
              <Select.Option value="7">Last 7 Days</Select.Option>
              <Select.Option value="30">Last 1 Month</Select.Option>
              <Select.Option value="365">Last 1 year</Select.Option>
              <Select.Option value="custom">Custom</Select.Option>
            </Select>
            {frequency === "custom" && (
              <RangePicker
                value={selectedDate}
                onChange={(values) => setSelectedate(values)}
              />
            )}
          </div>

          <div className='types'>
            <h6>Select Type</h6>
            <Select value={type} onChange={(values) => settype(values)}>
              <Select.Option value="All">ALL</Select.Option>
              <Select.Option value="Income">Income</Select.Option>
              <Select.Option value="Expense">Expense</Select.Option>
            </Select>
          </div>

        </div>
        <div className="right-side mx-lg-5">
          <button className="button button-view" onClick={onClickOfTableButton}><b>{viewOfPage}</b></button>
          <button className="button" onClick={() => setViewModel(true)}><b>Add Transection</b></button>
        </div>
      </div>


      {viewOfPage === "Table" && <Analytic allTransaction={allTransaction} />}
      {
        viewOfPage === "Analytics" &&
        <div>
          <Table dataSource={allTransaction} columns={columns} />;
        </div>
      }


      {/* Modal Form */}
      {Loading && <Spinner />}
      <Modal
        open={viewModel}
        title={Editable === null ? "Add Transaction" : "Update Transaction"}
        onCancel={() => setViewModel(false)} footer={false}

      >
        <div className="container mt-4">
          <Form onFinish={submitHandler} initialValues={Editable}>
            <Form.Item label="Amount" name="amount">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="type" name="type">
              <Select>
                <Select.Option value="Income">Income</Select.Option>
                <Select.Option value="Expense">Expense</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Category" name="category">
              <Select>
                <Select.Option value="Salary">Salary</Select.Option>
                <Select.Option value="Freelancing">Freelancing</Select.Option>
                <Select.Option value="Investment Income">Investment Income</Select.Option>
                <Select.Option value="Business Income">Business Income</Select.Option>
                <Select.Option value="Food">Food</Select.Option>
                <Select.Option value="Movies">Movies</Select.Option>
                <Select.Option value="Bills">Bills</Select.Option>
                <Select.Option value="Rant">Rant</Select.Option>
                <Select.Option value="Investment">Investment</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Date" name="date">
              <Input type="date" />
            </Form.Item>
            <Form.Item label="Refrence" name="refrence">
              <Input type="text" />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input type="text" />
            </Form.Item>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                {" "}
                SAVE
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </>
  )
}

export default Home