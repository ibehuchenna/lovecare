import React from 'react';
import './Top_Care_Takers.css';
import profile1 from '../../assets/profile1.jpg'
import profile2 from '../../assets/profile2.jpg'
import profile3 from '../../assets/profile3.jpg'
import profile4 from '../../assets/profile4.jpg'

const Top_Care_Takers = () => {
  const agents = [
    {
      id: 1,
      name: 'Ethan Collins',
      image: profile1,
      description: 'This is a top-rated Doctors with excellent service.',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Sophia Reynolds',
      image: profile2,
      description: 'This is a top-rated Doctors with excellent service.',
      rating: 4.8,
    },
    {
      id: 3,
      name: 'James Carter',
      image: profile3,
      description: 'This is a top-rated Doctors with excellent service.',
      rating: 4.7,
    },
    {
      id: 4,
      name: 'Lucas Wright',
      image: profile4,
      description: 'This is a top-rated Doctors with excellent service.',
      rating: 4.6,
    },
    
  ];

  return (
    <div className='top-care-takers'>
      <h1 style={{ textAlign: 'center' }}>Top Rated Care Takers</h1>
      <div className='care-takers-container'>
        {agents.map((agent) => (
          <div key={agent.id} className='care-takers-card'>
            <img src={agent.image} alt={agent.name} className='care-takers-card-image' />
            <h2 className='care-takers-card-heading'>{agent.name}</h2>
            <p className='care-takers-card-description'>{agent.description}</p>
            <div className='care-takers-card-rating'>
              {'★'.repeat(Math.floor(agent.rating)) + (agent.rating % 1 >= 0.5 ? '☆' : '')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top_Care_Takers;
