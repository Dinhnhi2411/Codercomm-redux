import { Stack } from '@mui/system';
import React from 'react';
import MainFooter from './MainFooter';
import MainHeader from './MainHeader';
import {Outlet} from "react-router-dom";
import {Box} from '@mui/system';

function MainLayout() {
  return (
  <Stack sx={{ minHeight: "100vh" }}>
    <MainHeader/>
    <Outlet/>
    <Box sx={{ flexGrow: 1}}/>
    <MainFooter/>
  </Stack>
  )
}

export default MainLayout
