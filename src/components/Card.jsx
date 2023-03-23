import React from 'react'

function Card(props) {
  return (
    <div className='glass-card flex flex-col items-center py-3 px-8 my-6'>
        <p>{props.date}</p>
        <img className='mx-auto w-[80px]' src={props.imgurl} alt="" />
        <p>{props.temp}°C</p>
        <p>{props.desc}</p>
    </div>
  )
}

export default Card