import React from "react"
import LoginMenu from "./LoginMenu"
import MainMenu from "./MainMenu"
import "./Menu.css"
import { useSessionUser } from "../store/userStore"

export default function Menu() {
  const user = useSessionUser()

  const menu = user ? <MainMenu /> : <LoginMenu /> // Para mostrar dos menu distinto si el usuario està logeado o no

  return (
    <div className="menu_div navbar-nav bg-light shadow">
      {menu}
    </div>
  )
}
