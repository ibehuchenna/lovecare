import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';
import Register from './Pages/Register/Register';
import CareTakerDashboard from './Components/CareTakerDashboard/CareTakerDashboard';
import CareTakerProfile from './Components/CareTakerDashboard/CareTaker_Profile';
import CareReciverDashboard from './Components/CareRecieverDashboard/CareRecieverDashboard';
import CareReciverProfile from './Components/CareRecieverDashboard/CareReciever_Profile';
import CareTakerCash from './Components/CareRecieverDashboard/CareTakerCash';
import CareRecieverChat from './Components/CareRecieverDashboard/CareReciever_Chat';
import CareTakerChat from './Components/CareTakerDashboard/CareTaker_Chat'
import CareReceiver_Call from './Components/CareRecieverDashboard/CareReceiver_Call';

function App() {
  return (
    <Router>
      <div>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />


          <Route path="/CareTaker-dashboard" element={<CareTakerDashboard />} />
          <Route path="/CareTaker-dashboard/profile" element={<CareTakerProfile />} />
          <Route path="/CareTaker-dashboard/CareTaker_Chat" element={<CareTakerChat/>} />


          <Route path="/CareRecipent-dashboard" element={<CareReciverDashboard />} />
          <Route path="/CareRecipent-dashboard/call" element={<CareReceiver_Call />} />
          <Route path="/CareRecipent-dashboard/profile" element={<CareReciverProfile />} />
          <Route path="/CareRecipent-dashboard/caretakerCash" element={<CareTakerCash/>} />
          <Route path="/CareRecipent-dashboard/CareReciever_Chat" element={<CareRecieverChat/>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
