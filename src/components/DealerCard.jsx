import React from 'react'

function DealerCard({dealerHand,sumDealer,isDealersTurn,isHandCompleted}) {
  
  return (
    <div className='flex flex-col gap-6 text-white'>
        <h3 className='font-bold text-2xl'>DEALER'S HAND</h3>
        <div className='flex'>
          {
            dealerHand.map((item,index)=>{
                return (
                <div className='-mr-6 ' key={index}>
                    <img 
                      className="w-32" 
                      src={!isDealersTurn && !isHandCompleted && index===1 ? '/images/blank.svg' : item.image} alt="" 
                    />
                </div>
                )
            })
          }
        </div>
        <p className='text-xl font-bold'>Total: {!isDealersTurn && !isHandCompleted ? "" : sumDealer} </p>
        
    </div>
  )
}

export default DealerCard