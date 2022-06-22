import React, { useEffect, useState } from "react"
import { useErrorHandler } from "../common/utils/ErrorHandler"
import "../styles.css"
import "./Game.css"
import { recuperaBoard, saveResult } from "./gameService"
import {useLocation} from 'react-router-dom'
import { useSessionUser } from "../store/userStore"


export default function Play() {
    
    const errorHandler = useErrorHandler()
    let location = useLocation(); //Recupero informacion desde el navlink...en particular el id del game que se està jugando
    let gameId = location.state as number //Recupero gameId desde state que llega con el navLink, asi despues puedo hacer un get al game para recuperarlo desde el back
    const user = useSessionUser() //Recupero el user conexo
    const [nombreGame, setNombreGame]=useState<string>("") //Donde guardo en LOCAL el nombre del game
    const [player1, setPlayer1]=useState<number>() //Donde guardo en LOCAL quien es el jugador 1
    const [player2, setPlayer2]=useState<number>() //Donde guardo en LOCAL quien es el jugado 2
    const [turno, setTurno]=useState<number>(0) //Donde guardo en LOCAL el turno
    const[resultCurrent, setResultCurrent]=useState<String[]>([]) //Donde guardo en LOCAL el resultado
    const [ganador, setGanador]=useState<string>("")


    useEffect(()=>{

        const interval = setInterval(() => {//Me permite ejecutar cada 1000 ms el siguiente codigo donde siguo preguntando al back los datos del game que estoy jugando
                                            //Eso sirve porque  no tengo otro modo de actualizar la pantalla del jugador que està esperando su turno
                                             recuperaBoard({gameId}).then(res=>{//Ejecuto la promesa que recupera los datos
                                              
                                              /*Esta es la linea que hace redebujar el componente BOARD: porque cambio el useState de resultCurrent
                                              y el BOARD utiliza resultCurrent asi cuando modifico ese useState, el Board se redebuja*/
                                              setResultCurrent(res.result.split(','))//Guardo en local el resultado actual del game. 
                                                                                      //Split me sirve porque en el back tengo el resultado
                                                                                      //como uno string, en el front lo manejo como Array

                                               setPlayer1(res.player1_id) //Guardo en LOCAL quien es jugador1: esto seria suficiente hacerlo una vez, pero me se complica
                                               setPlayer2(res.player2_id) //Guardo en LOCAL quien es el jugador2: esto seria suficiente hacerlo una vez, pero me se complica
                                               setTurno(res.turn) //Guardo en LOCAL que turno estamos para ver quien juega
                                               setNombreGame(res.gameName) //Guardo en LOCAL el nombre del game
                                               
                                               if (res.winner===res.player1_id){
                                                setGanador("O")//Guardo en LOCAL el ganador
                                               }

                                               if (res.winner===res.player2_id){
                                                setGanador("X")//Guardo en LOCAL el ganador
                                               }

                                             
                                              })
          
        }, 1000);//Aca termina el codigo que se repite cada 1000 ms, justamente cambiando 1000 cambio el intervalo
       return () => clearInterval(interval);

    
    
      }, [])//Aca termina useEffect. Las [] me permiten de ejecutar el useEffect solo una volta
    

 
    const onClick = async (buttonId: number) => {//Recive como argumento el ID del button relativo a la celda clickata
   
      if ((turno%2===0)&& (user?.id===player1)){//Si es un turno par y quien hace click es el jugador1 entonces puede jugar
      
        if(resultCurrent[buttonId]===""){//Empieza control para ver si la celda ya fue marcada
        resultCurrent[buttonId]="O" //Uso el ID del button para modificar la corespondente posiciòn del Array resultado

            let result = resultCurrent.toString() //Casteo result para guardarlo en el attributo string del backend
      

            if (errorHandler.hasErrors()) {
              return
              }

            try {
                await saveResult({ //LLamo la promesa para guardar el resultado
              gameId, //Params que paso a la promesa para mandarlos al back
              result
                })
              
            } catch (error) {
                errorHandler.processRestValidations(error)
            }
          }
          else{
            alert("La celda ya fue marcada!")
          }//Termina control para ver si la celda era ya marcada
      
      }
      else{
            if((turno%2===1)&& (user?.id===player2)){//Su es un turno impar y quien hace click es el jugador2 entonces puede jugar
              if(resultCurrent[buttonId]===""){//Empieza control para ver si la celda ya fue marcada
                resultCurrent[buttonId]="X" //Uso el ID del button para modificar la corespondente posiciòn del Array resultado

                  let result = resultCurrent.toString() //Casteo result para guardarlo en el attributo string del backend
            

                    if (errorHandler.hasErrors()) {
                      return
                  }
              
                  try {
                      await saveResult({ //LLamo la promesa para guardar el resultado
                    gameId,//Params que paso a la promesa para mandarlos al back
                    result
                      })
                    
                  } catch (error) {
                      errorHandler.processRestValidations(error)
                  }
              }
              else{
                alert("La celda ya fue marcada!")
              }//Termina control para ver si la celda era ya marcada

            }
            else{//Si ninguno de los dos if precedentes cumple, entonces significa que ha hecho click un jugador cuando no era su turno
              alert("No es tu turno!")
            }
        }//Termina primer IF
    
    
      }//Termina funcion onClick
       
  function Board() { 


    return (
        <div>
          <h3>Nombre partida: {nombreGame}.</h3>
          <h3>Jugador: {user?.name}</h3>
          <h3>Turno numero: {turno}</h3>
          <h3>Ganador: {ganador}</h3>

        <table className="mitable">
          <tr>
                <th><button id="0" onClick={() => onClick(0)}>{resultCurrent[0]}</button></th>
                <th><button id="1" onClick={() => onClick(1)}>{resultCurrent[1]}</button></th>
                <th><button id="2" onClick={() => onClick(2)}>{resultCurrent[2]}</button></th>
            </tr>
            <tr>
                <th><button id="3" onClick={() => onClick(3)}>{resultCurrent[3]}</button></th>
                <th><button id="4" onClick={() => onClick(4)}>{resultCurrent[4]}</button></th>
                <th><button id="5" onClick={() => onClick(5)}>{resultCurrent[5]}</button></th>
            </tr>
            <tr>
                <th><button id="6" onClick={() => onClick(6)}>{resultCurrent[6]}</button></th>
                <th><button id="7" onClick={() => onClick(7)}>{resultCurrent[7]}</button></th>
                <th><button id="8" onClick={() => onClick(8)}>{resultCurrent[8]}</button></th>
            </tr>
        </table>

        </div>
    )}
     
  return (
   
    <Board />
    
  
  )
}
