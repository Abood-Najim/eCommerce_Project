import { createContext } from "react";


export const UserContext = createContext();

const UserContextProvider = ({children}) => {
  console.log(`hello , i'm UserContext `)
  
  const userName ="Abood";
  const userAge =21;
  /* if you want to send(provide) multiple vars you have to provide them as an object ({{object}}) */
  return <UserContext.Provider value={{userName}}> 
      {children}
    </UserContext.Provider>

}

export default UserContextProvider;