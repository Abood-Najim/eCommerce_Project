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
    <div>Cart</div>
  )
}
