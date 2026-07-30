import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import axiosInstance from '../api/axiosInstance';
import i18n from '../i18next';


export default function useCategories() {

  const getCategories = async() => {
    const response = await axiosInstance.get(`/Categories`); /* we wrote the full things we need in an api calle function 
    so whenever we wnat to get things we just rote ther and it will automaticlly come here*/ 
    return response.data;
  }
const query = useQuery(
    {
      queryKey: ['categories',i18n.language],
      queryFn:getCategories,
      staleTime:1000 * 60 * 5,
    }
    
  )
  return query;
}
/* any change in logic you will do it in here no need to search in a plenty of lins on one page :)*/