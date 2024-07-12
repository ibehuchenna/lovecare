import React, { useState } from 'react';
import './Contact_Form.css';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contact from "../../assets/contact.svg";

const Contact_Form = () => {
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm('service_vyzt2wk', 'template_o8djqu8', e.target, 'r2hRtG-bfTl7NjKhC')
      .then((result) => {
        console.log(result.text);
        toast.success('Message Sent Successfully!');
        e.target.reset();
        setLoading(false);
      }, (error) => {
        console.log(error.text);
        toast.error('An error occurred, please try again.');
        setLoading(false);
      });
  };

  return (
    <div className='containercontact'>
      <div className="image">
        <img src={Contact} alt="Contact Us" />
      </div>
      <form onSubmit={sendEmail}>
        <h1>Contact Us</h1>
        <input type="text" id="firstName" name="from_name" placeholder="First Name" required />
        <input type="text" id="lastName" name="from_name" placeholder="Last Name" required />
        <input type="email" id="email" name="email" placeholder="Email" required />
        <input type="text" id="mobile" name="mobile" placeholder="Mobile" required />
        <textarea id="message" name="message" placeholder='Message' required></textarea>
        <input type="submit" value={loading ? 'Sending...' : 'Send'} id="button" />
      </form>
    </div>
  );
};

export default Contact_Form;
