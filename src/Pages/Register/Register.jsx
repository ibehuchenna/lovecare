import React, { useEffect } from "react";
import SignLog from '../../Components/SignLog/SignLog'
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
const Register = () => {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []); 
  return (
    <div>
      <Header/>
      <SignLog/>
      <Footer/>
    </div>
  )
}

export default Register
