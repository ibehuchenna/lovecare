import React from 'react'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import Hero from '../../Components/Hero/Hero'
import Home_Cards from '../../Components/Home_Cards/Home_Cards'
import Motto from '../../Components/Motto/Motto'
import Top_Care_Takers from '../../Components/Top_Care_Takers/Top_Care_Taker'



const Home = () => {
  return (
    <div>
      <Header/>
      <Hero/>
      <Home_Cards/>
      <Motto/>
      <Top_Care_Takers/>
      <Footer/>
    </div>
  )
}

export default Home
