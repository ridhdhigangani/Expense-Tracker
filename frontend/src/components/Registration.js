import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner'
import {message} from 'antd'
import axios from 'axios'

const Registration = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    const data = {
      "name":name,
      "mobile":mobile,
      "email":email,
      "password":password
    }

    axios.post('/createUser',data).then(
      (res) => { console.log(res.data);  navigate('/login'); message.success("Registration successfull");}
    ).catch(
      (error) => { console.log(error); message.error("something went wrong");}
    )
    setLoading(false);
    setEmail('');
    setPassword('');
    setMobile('');
    setName('');
  }
  return (
  <>
  <div className="container">
    <h2>Registration</h2>
    {loading && <Spinner/>}
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="mobile">Mobile Number</label>
        <input
          type="tel"
          className="form-control"
          id="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        Register
      </button>
      <p className="mt-3">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </form>
  </div>

    </>
  )
}

export default Registration