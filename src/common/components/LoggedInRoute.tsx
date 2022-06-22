import React from "react"
import { Navigate } from 'react-router-dom'
import { FC } from 'react'
import { useSessionUser } from "../../store/userStore";


interface PropType {
  component: React.FC;
}

export const StateLoggedInRoute: FC<PropType> = ({ component: Component }) => {
  const currentUser = useSessionUser() //Recupero el User

  const isAuthenticated  = currentUser !== undefined //User es definido solo si està loggado. Si no està loggado no doy acceso a la route pedida

  if (isAuthenticated) return <Component />
  return <Navigate to='/' />
}
