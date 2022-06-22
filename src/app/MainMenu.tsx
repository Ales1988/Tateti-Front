import React from "react"
import { NavLink } from "react-router-dom"
import "./Menu.css"
import { logout } from "../user/userService"




export default function MainMenu() {
  const logoutApp = () => {//No puedo poner directamente logout() en el onclick porque sino me se ejecuta cuando renderizo el boton y no cuando hago click
    void logout()
  }
  return (
    
    <div>  
      <NavLink to="/gameNew" className="menu_item btn btn-sm btn-link">Nuova partida</NavLink><br />   
      <NavLink to="/gameList" className="menu_item btn btn-sm btn-link">Partidas disponibles</NavLink><br />
      <NavLink to="" onClick={logoutApp} className="menu_item btn btn-sm btn-link">Logout</NavLink><br />
    </div>
  )
}
