import { Stack } from '@mui/system';
import React from 'react';
import MainFooter from './MainFooter';
import MainHeader from './MainHeader';
import {Outlet} from "react-router-dom";
import {Box} from '@mui/system';
import AlertMsg from '../components/AlertMsg';

function MainLayout() {
  return (
  <Stack sx={{ minHeight: "100vh" }}>
    <MainHeader/>
    <AlertMsg/>
    <Outlet/>
    <Box sx={{ flexGrow: 1}}/>
    <MainFooter/>
  </Stack>
  )
}

export default MainLayout
