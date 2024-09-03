import { message } from 'antd';
import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
const Header = () => {
  const [name,setName] = useState('');
//  const [shouldRefresh, setShouldRefresh] = useState(true);

  useEffect( () => {
    if(localStorage.getItem("data")){
      setName(JSON.parse(localStorage.getItem("data")).name);
    }else{
      setName('');
    }
  },[]);
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand mx-5" to="/">
        <b>Expensify</b>
      </Link>
       
      <Link className="navbar-brand mx-lg-5">
         <b>SPEND LESS GET WEALTHIER</b>
      </Link>
      <div className="collapse navbar-collapse justify-content-end me-lg-5" id="navbarNav" >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/user">
              <b>{name}</b> 
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              <b>Logout</b>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
    </>
  )
}

export default Header