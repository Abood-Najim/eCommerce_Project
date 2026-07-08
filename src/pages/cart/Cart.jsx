import axios from 'axios'
import React, { useEffect } from 'react'
import authAxiosInstance from '../../api/authAxiosInstance';
import { useUserStore } from '../../store/useUserStore';
import { useCounterStore } from '../../store/useCounterStore';


export default function Cart() {

  
  const counter = useCounterStore((state)=> state.counter);
  const increment = useCounterStore((state)=> state.increment);
  const getItems = async ()=>{
    const response = await authAxiosInstance.get(`/Carts`);
    console.log(response);
  }

  useEffect( ()=>{
    getItems();
  } , [] )

  return (
    <>
    <div>Cart - {counter} </div>
    <button onClick={increment}> increment </button>
    
    </>
  )
}/* we use state manegmaent when ever we want something to be changed on all the pages that we added the state to it */
