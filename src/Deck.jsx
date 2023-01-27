import React, { useEffect, useState } from 'react'
import DealerCard from './components/DealerCard'
import PlayerCard from './components/PlayerCard'

function Deck() {
    const [deckData,setData] = useState([])
    const [playerHand,setPlayerHand] = useState([])
    const [dealerHand,setDealerHand] = useState([])
    const [show, setShow] = useState(true)
    const [winner,setWinner] = useState("")
    const [isDealersTurn, setIsDealersTurn] = useState(false)
    const [isHandCompleted, setIsHandCompleted] = useState(false)
    const [isPlayerBusted, setIsPlayerBusted] = useState(false)
    const [isDealerBusted, setIsDealerBusted] = useState(false)
    const [acePlayer,setAcePlayer] = useState({})
    const [aceDealer,setAceDealer] = useState({})
    let [sumPlayer,setSumPlayer] = useState(0)
    let [sumDealer, setSumDealer] = useState(0)
    
    const twoHandPlayer = []
    const twoHandDealer = []
    
    useEffect(()=>{
            fetch("/deck.json")
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    },[])
    

    const newGame = () =>{
      for (let i = 0; i < 2; i++) {
        const random = Math.floor(Math.random()*deckData.length)
        const item = deckData[random]
        twoHandPlayer.push(item)
      }
      for (let i = 0; i < 2; i++) {
        const random = Math.floor(Math.random()*deckData.length)
        const item = deckData[random]
        twoHandDealer.push(item)
      }

      twoHandPlayer.forEach((item)=>{
        if (item.value == "J" || item.value == "Q" || item.value == "K")  {
          item.value = 10
        }
        if (item.value == "A") {
          item.value = 11
        }
        sumPlayer += item.value
      })

      twoHandDealer.forEach((item)=>{
        if (item.value == "J" || item.value == "Q" || item.value == "K")  {
          item.value = 10
        } 
        if (item.value == "A") {
          item.value = 11
        }
        sumDealer += item.value
      })
      setSumPlayer(sumPlayer)
      setSumDealer(sumDealer)
      setPlayerHand(twoHandPlayer)
      setDealerHand(twoHandDealer)
      setShow(false)
      
    }
    
    const Hit = () =>{
        const randomLength = Math.floor(Math.random()*deckData.length)
        const randomPlayerData = deckData[randomLength]
        setPlayerHand((prev)=>[...prev,randomPlayerData])
        if (randomPlayerData.value == "J" || randomPlayerData.value == "Q" || randomPlayerData.value == "K") {
          randomPlayerData.value = 10
        }
        if (randomPlayerData.value == "A") {
          randomPlayerData.value = 11
        }
        setSumPlayer(sumPlayer+randomPlayerData.value)
        setAcePlayer(randomPlayerData)
    }

    useEffect(()=> {
      if (sumPlayer > 21) {
        setIsPlayerBusted(true)
        setIsHandCompleted(true)
        setWinner("YOU LOST!!!")
        
      }
      if (sumDealer > 21) {
        setIsDealerBusted(true)
        setWinner("YOU WIN!!!")
        setIsHandCompleted(true)
      }

      if (sumPlayer === 21) {
        setWinner("YOU WIN!!!")
        setIsHandCompleted(true)
      }

      if (sumDealer === 21) {
        setWinner("YOU LOST!!!")
        setIsHandCompleted(true)
      }

      if (sumDealer >= sumPlayer && sumDealer < 22 && isDealersTurn ) {
        if (sumDealer > sumPlayer) {
          setWinner("YOU LOST!!!")
          setIsHandCompleted(true)
        }
        if (sumDealer < sumPlayer && !isPlayerBusted) {
          setWinner("YOU WIN!!!")
          setIsHandCompleted(true)
        }
        if (sumDealer === 20 && sumPlayer === 20 &&  !isPlayerBusted) {
          setWinner("THERE IS NO WINNER")
          setIsHandCompleted(true)
        }
      }
      if (sumDealer <= sumPlayer && sumDealer<20 && isDealersTurn && !isPlayerBusted ) {
        setTimeout(() => {
          hitAgain()
        }, 500);
      }
      
    },[sumDealer,isDealersTurn,sumPlayer, isPlayerBusted])
    
    useEffect(()=>{
      if (sumDealer>21 && aceDealer.value == 11) {
        if (isDealerBusted && isHandCompleted) {
          setSumDealer(sumDealer-10)
          setIsDealerBusted(false)
          setIsHandCompleted(false)
        }
        
      }
    },[sumDealer,aceDealer,isHandCompleted,isDealerBusted])

    useEffect(()=>{
      if (sumPlayer>21 && acePlayer.value == 11) {
        if (isPlayerBusted && isHandCompleted) {
          setSumPlayer(sumPlayer-10)
          setIsPlayerBusted(false)
          setIsHandCompleted(false)
        }
      }
    },[sumPlayer,acePlayer,isHandCompleted,isPlayerBusted])

    
    const hitAgain = () =>{
      const randomLength = Math.floor(Math.random()*deckData.length)
      const randomDealerData = deckData[randomLength]
      if (randomDealerData.value == "J" || randomDealerData.value == "Q" || randomDealerData.value == "K") {
        randomDealerData.value = 10
      }
      if (randomDealerData.value == "A") {
        randomDealerData.value = 11
      }
      setAceDealer(randomDealerData)
      setDealerHand((prev)=>[...prev,randomDealerData])
      setSumDealer(sumDealer+randomDealerData.value)
      
    }

    const Stand = () => {
      setIsDealersTurn(true)
      setShow(false)
    }

    const restartGame = () =>{
      setShow(true)
      setIsHandCompleted(false)
      setIsDealersTurn(false)
      setIsPlayerBusted(false)
      setIsDealerBusted(false)
      setPlayerHand([])
      setDealerHand([])
      setSumPlayer(0)
      setSumDealer(0)
      setWinner("")
      setAcePlayer({})
      setAceDealer({})
    }
    
    

  return (
    <div className='flex flex-col w-[1200px] h-[700px] gap-16 p-12 rounded-lg image bg-[url("/images/grass.jpg")] bg-cover bg-center bg-blend-overlay bg-neutral-600'>
      <h1 className='text-4xl font-bold text-orange-400 text-center'>BLACKJACK</h1>
      <div className='flex items-center justify-center'>
        {
          show && !isHandCompleted ? (
            <button onClick={newGame} className="p-3 bg-orange-400 text-green-600 rounded-md"> new game </button>
          ) : !isHandCompleted && !show &&
          (
            <div className='flex gap-8'>
              <button onClick={Hit} className='w-20 py-3  bg-orange-400 text-green-600 rounded-md'> Hit </button>
              <button onClick={Stand} className='w-20 bg-orange-400 text-green-600 rounded-md'> Stand </button>
            </div>
          )
        }
        {
          isHandCompleted && !show &&
          <button onClick={restartGame} className='p-3 bg-orange-400 text-green-600 rounded-md'> Restart Game </button>
        }
        
      </div>
      <div className='flex justify-evenly'>
        <PlayerCard 
          playerHand={playerHand} 
          sumPlayer={sumPlayer}
          />
        <DealerCard 
        dealerHand={dealerHand} 
        sumDealer={sumDealer} 
        isDealersTurn={isDealersTurn}
        isHandCompleted={isHandCompleted}
        />
      </div>
      {
            isHandCompleted &&
            <p className={`text-3xl font-bold text-center ${winner == "YOU LOST!!!" ? "text-red-500" : "text-white"}`}>{winner}</p>
      }
    </div>
  )
}

export default Deck