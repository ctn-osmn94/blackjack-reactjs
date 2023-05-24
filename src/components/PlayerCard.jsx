import React from 'react'
import { motion } from "framer-motion"

function PlayerCard({playerHand,sumPlayer}) {
  
  return (
    <div className='flex flex-col gap-6 text-white'>
        <h3 className='font-bold text-2xl'>PLAYER'S HAND</h3>
        <div className='flex'>
          {
              playerHand.map((item,index)=>{
                  return (
                  <motion.div 
                    className='-mr-6' 
                    key={index}
                    animate={{
                      scale: [1, 2, 2, 1, 1],
                      rotate: [0, 0, 270, 270, 0],
                      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                      times: [0, 0.2, 0.5, 0.8, 1],
                      
                    }}
                  >
                      <img className={`w-32`} src={item.image} alt="" />
                  </motion.div>
                  )
                  
              })
          }
        </div>

        <p className='text-xl font-bold'> Total: {sumPlayer ? sumPlayer : ""} </p>
          
    </div>
  )
}

export default PlayerCard