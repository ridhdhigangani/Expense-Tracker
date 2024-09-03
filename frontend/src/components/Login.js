import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import {message} from 'antd'
import axios from 'axios'

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [Loading,setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("data");
    const data = JSON.parse(localStorage.getItem("data"));
    if(!data){
      navigate('/login');
    }else{
      navigate('/');
    }
  },[]);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      "email": identifier,
      "password":password
    }
    axios.post('/getUser',data).then(
       (res) => { 
        console.log(res.data);
        res.data.password = "";
        localStorage.setItem("data",JSON.stringify(res.data));
        setLoading(false);
        message.success("Login successfull");
        navigate('/')
      }
    ).catch(
       (error) => { 
        console.error(error); 
        setLoading(false); 
        message.error("something went wrong");
        navigate('/login'); }
    )
  }

  return (
    <>

    <div className="container">
      <h2 className="mt-5">Login</h2>
      {Loading && <Spinner/>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="form-group">
          <label htmlFor="identifier">Email or Mobile Number</label>
          <input
            type="text"
            className="form-control"
            id="identifier"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <p className="mt-3">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
    </>
  )
}

export default Login;