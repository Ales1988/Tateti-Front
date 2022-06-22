import axios, { responseEncoding } from "axios"
import { environment } from "../app/environment/environment"
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
axios.defaults.headers.common["Content-Type"] = "application/json"


//ESTRUCTURA DE UN GAME
export interface Game {
  id: number
  player1_id: number
  player2_id: number
  gameName: string
  result: string
  turn: number
  winner: number
  
}

//CREA UN NUEVO GAME
export async function newGame(params: {
    player1_id: number
    gameName: string
    
  }): Promise<Game> {
    const res = (
      await axios.post(environment.backendUrl +"/games", params)
      ).data 
     
      let game: Game = {id: res.game.id, player1_id: res.game.player1_id, player2_id: res.game.player2_id, gameName: res.game.gameName, result: res.game.result, turn: res.game.turn, winner: res.game.winner}
    return game
  }

  //BUSCO TODOS LOS GAMES DONDE FALTA UN JUGADOR 
export async function openGames(): Promise<Game[]> {
    const res = (
      await axios.get(environment.backendUrl +"/games/indexOpenGames")
      ).data 
      
     let numeroGames= res.games.length //Recupero length de mi response, osea cuantos game devuelvo
     let game= new Array<Game>()
     
     for (let i = 0; i<numeroGames; i++){
     game[i]={id: res.games[i].id, player1_id: res.games[i].player1_id, player2_id: res.games[i].player2_id, gameName: res.games[i].gameName, result: res.games[i].result, turn: res.games[i].turn, winner: res.games[i].winner}
     }
    
     return game
  }

  //ASIGNA EL SEGUNDO JUGADOR A UN GAME
  export async function joinGame(params: {
    gameId: number
    player2_id: number
    
  }): Promise<Game> {
    const res = (
      await axios.put(environment.backendUrl +"/games/"+params.gameId, params)
      ).data 
     
    return res
  }

  //ACTUALIZA EL RESULTADO DE UN GAME EN LA BASE DE DATOS ( cada vez que se marca una celda)
  export async function saveResult(params: {
    gameId: number
    result: string
    
    
  }): Promise<Game> {
    const res = (
      await axios.put(environment.backendUrl +"/games/"+params.gameId+"/saveResult", params)
      ).data 
     
    return res
  }

  //RECUPERA DATOS DEL GAME
  export async function recuperaBoard(params: {
    gameId: number  
    
  }): Promise<Game> {
    const res = (
      await axios.get(environment.backendUrl +"/games/"+params.gameId)
      ).data 
     
     
     let game: Game = {id: res.game.id, player1_id: res.game.player1_id, player2_id: res.game.player2_id, gameName: res.game.gameName, result: res.game.result, turn: res.game.turn, winner: res.game.winner}
   
    return game
  }