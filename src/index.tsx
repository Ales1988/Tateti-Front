import "bootstrap/dist/css/bootstrap.css"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./app/App"
import "./styles.css"

const el = document.getElementById('root')
if (el === null) throw new Error('Root container missing in index.html')
ReactDOM.createRoot(el).render(/* Typescript tiene muchos mas controles. Si */
                                /* comento linea anterior, me va a dar error el */
                                /* porque createRoot necesita que el no sea null */
    <React.StrictMode>
        <App />
    </React.StrictMode> /* en el index solo levanto app */
)
