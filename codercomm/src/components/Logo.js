import { Box } from '@mui/system'
import React from 'react'
import {Link} from "react-router-dom";
import logoImg from "../logo.png";

function Logo({ disabledLink = false, sx}) {
  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx}}>
    <img src={logoImg} alt="logo" width="100%"/>
    </Box>
  );

  if(disabledLink) {
    return <>{logo}</>
  }
  return (
   <Link to = "/">{logo}</Link>
  )
}

export default Logo
