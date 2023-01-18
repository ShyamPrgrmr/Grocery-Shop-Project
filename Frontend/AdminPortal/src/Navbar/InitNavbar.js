import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';



export function NavbarView() {
  const location = useLocation();
  return <>
    <Navbar location={location}/>
  </>
}

