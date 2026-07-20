import { createTheme } from "@mui/material";

const getTheme = (mode)=>{
  return createTheme({
  palette:{
    mode:mode,
    primary:{
      main:'#ff0000',
    }
  }
})
}



export default getTheme;

/*you can add spancing : 4 means padding 1 will be 4 px instead of 8px , also typography to change the font used */