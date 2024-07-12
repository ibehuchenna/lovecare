import React from 'react'
import './CareTaker.css'

const CareTaker = (props) => {
    return (
      
        <div className="CareTaker-class">
          <div className="CareTaker-text">
            <h2>{props.firsttag}</h2>
            <p>{props.f_paragraph}</p>
            <h2>{props.sectag}</h2>
            <p>{props.s_paragraph}</p>
          </div>
          <div className="CareTaker-img">
            <img src={props.srcimg} width={500} alt=''/>
          </div>
        </div>
      )
}

export default CareTaker