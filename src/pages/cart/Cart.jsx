import axios from 'axios'
import React, { useEffect } from 'react'
import authAxiosInstance from '../../api/authAxiosInstance';



export default function Cart() {

  
  const getItems = async ()=>{
    const response = await authAxiosInstance.get(`/Carts`);
    console.log(response);
  }

  useEffect( ()=>{
    getItems();
  } , [] )

  return (
    <>
    <div>Cart</div>
    
    </>
  )
}/* we use state manegmaent when ever we want something to be changed on all the pages that we added the state to it */
