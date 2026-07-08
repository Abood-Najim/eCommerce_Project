import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import authAxiosInstance from '../../api/authAxiosInstance';
import { UserContext } from '../../context/UserContext';

export default function Cart() {

  const x = useContext(UserContext);

  const getItems = async ()=>{
    const response = await authAxiosInstance.get(`/Carts`);
    console.log(response);
  }

  useEffect( ()=>{
    getItems();
  } , [] )

  return (
    <div>Cart -{x.userName}</div>
  )
}
