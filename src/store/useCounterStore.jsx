import { create } from "zustand";


export const useCounterStore = create((set)=>({
  counter:0,
  increment:()=>{
    set((state)=>({
      counter:state.counter + 1
    }))
  }
}));