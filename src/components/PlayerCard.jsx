import React from 'react'

function PlayerCard({playerHand,sumPlayer}) {
  
  return (
    <div className='flex flex-col gap-6 text-white'>
        <h3 className='font-bold text-2xl'>PLAYER'S HAND</h3>
        <div className='flex'>
          {
              playerHand.map((item,index)=>{
                  return (
                  <div className='-mr-6' key={index}>
                      <img className={`w-32`} src={item.image} alt="" />
                  </div>
                  )
                  
              })
          }
        </div>

        <p className='text-xl font-bold'> Total: {sumPlayer ? sumPlayer : ""} </p>
          
    </div>
  )
}

export default PlayerCard