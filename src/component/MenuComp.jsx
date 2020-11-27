import React, { useContext } from 'react'

import { AuthContext } from '../App';
import MenuAdmin from './Menu/MenuAdmin';
import MenuMember from './Menu/MenuMember';
import MenuPublik from './Menu/MenuPublik';
import MenuStaff from './Menu/MenuStaff';


export default function MenuComp() {

  

  const { state } = useContext(AuthContext)

  if (!state.isAuthenticated) {
    return (
      <MenuPublik/>
    )
  }

  if(state.role === 1){
    return <MenuAdmin/>
  }else if(state.role === 2){
    return <MenuStaff/>
  }

  return (
    <MenuMember/>
  )
}
