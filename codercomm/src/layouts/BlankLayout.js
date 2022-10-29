import { Stack } from '@mui/system'
import React from 'react'
import { Outlet } from 'react-router'
import Logo from '../components/Logo'

function BlankLayout() {
  return (
   <Stack minHeight="100vh" justifyContent="center" alignItems="center">
    <Logo sx={{width:"200px", height:"200px", mb:"5"}}/>
    <Outlet/>
   </Stack>
  )
}

export default BlankLayout
