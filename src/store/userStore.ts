import { Subject } from "rxjs"
import { User } from "../user/userService"
import { useState, useLayoutEffect } from "react"
//useEffect(()=> {console.log(user)}, [user]) //[cada vez cambia esto]  haces {esto}  seria un hook
//useEffect(()=> {console.log("Render")}, []) //Si [esto està vacio]...{esto} se ejecuta cada vez vez que renderizo el componente
//useEffect(()=> {console.log("Render")})  //Sin corcette {este} se ejecuta cada vez que cambia el estato del componente NOOO HACER
 
//const [nombre, setNombre]=useState("") [Variable, funcion que actualiza la variable] = useState("valor inicial variable")
//useEffect(()=> {console.log("LOGIN")}, [userName]) //En general useEffect util para buscar datos y esto datos quiero guardarlo en una variable


 let currentUser: User | undefined

const userSubject = new Subject<User | undefined>()


export function useSessionUser() {
  const [user, setUser] = useState(currentUser) //[Variable, funcion que actualiza la variable] = useState("valor inicial variable") Al principio currentUser es undefinied asi menu.tsx sabe que tiene que renderizar el menu de login

//useLayoutEffect es un poco como useEffect, solo que useEffect es async ( primero se actualiza pantalla despues se ejecuta mi effecto                                        
//mientras useLayoutEffect es sync, primero se ejecuta mi effecto y despues se actualiza la pantalla
  useLayoutEffect(() => {       //Me sirve para renderizar de vuelta el menu y la toolbar cada vez que cambia el estato de user
    userSubject.subscribe((newState) => { 
      setUser(newState)
    })
  }, []) //Las 3 lineas anterior se ejecutan cada vez que renderizo el componente

  return user
}


//Se utiliza en userService en las funciones newUser y login para guardar los datos en el front del usuario que acaba de conectarse o registrarse
export function updateSessionUser(user: User) {
  
  currentUser= user
  userSubject.next(currentUser)
}

export function cleanupSessionUser() {
  currentUser = undefined
  userSubject.next(currentUser)
}
