import React, { useEffect } from "react";
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import LoveCare from '../../Components/LoveCare/LoveCare';
import CareTaker from '../../Components/CareTaker/CareTaker';
import Motto from '../../Components/Motto/Motto';
import Doctorpatient from '../../assets/doctorpatients.jpg'
import doctorjustify from '../../assets/doctorjustify.jpg'

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []); 
  return (
    <div>
      <Header/>
      <CareTaker
       firsttag="Care Taker"
       f_paragraph="Unlock a world of opportunity as you join our dynamic network of healthcare professionals. By leveraging state-of-the-art technology, you can streamline patient care and expand the reach of your practice like never before. With seamless scheduling, instant communication, and access to a diverse patient base, you'll have the tools you need to elevate your impact in healthcare. Join us at the forefront of innovation, where every interaction is designed to empower you to focus on what truly matters - your patients."
       sectag="Care Recipient"
       s_paragraph="Experience a new standard of healthcare with our patient-centered platform. Say goodbye to long waits and frustration with easy appointment booking and transparent communication. Whether you're seeking specialized care or routine check-ups, our network of top-notch healthcare providers is here to cater to your needs. Take control of your well-being and unlock a world of convenience and quality where your health always comes first."
       srcimg={Doctorpatient}
       />
      <LoveCare/>
      <CareTaker
       firsttag="Our Mission: Elevating Care Through Innovation"
       f_paragraph="Discover a new era of healthcare with CherishedCare, where our mission is more than just a statement—it's a commitment. By harnessing the power of innovation, we aim to empower healthcare professionals to deliver personalized and compassionate care while providing patients with seamless access to quality services. Join us on this journey to transform healthcare delivery, creating a future where everyone can experience the highest standard of care, every step of the way."
       
       srcimg={doctorjustify}
       />
      <Motto/>
      <Footer/>
      
    </div>
  )
}

export default About;
