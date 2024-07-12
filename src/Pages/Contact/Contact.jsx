import React, { useEffect } from "react";
import Header from "../../Components/Header/Header";
import Contact_From from "../../Components/Contact_Form/Contact_Form"
import Footer from "../../Components/Footer/Footer";
const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []); 
  return (
    <>
    <Header />
    <Contact_From />
    <Footer />
    </>
  )
}

export default Contact;
