import React from 'react'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import './Motto.css';
import motive from '../../assets/motive.png';

const Motto = () => {
  return (
    <div className="motto-main">
      <div className="motto-img">
        <img src={motive} width={400} alt="" style={{alignContent:"center", display:"flex"}} />
      </div>
      <div className="motto-text">
        <h2>"Empower. Connect. Thrive."</h2>
        <p>
          "Where Compassion Meets Technology,
          Transforming Caregiving with CherishedCare.
          Empowering Connections, Elevating Care,
          Welcome to the Future of Healthcare."
        </p>
        <Link to='/about'>
          <Button variant="contained" className='motto-btn'>About-Us</Button>
        </Link>
      </div>
    </div>
  )
}

export default Motto;
