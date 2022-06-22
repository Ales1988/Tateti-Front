# card_game_react

UI en react para el [proyecto card game](https://github.com/nmarsollier/card_game_node)

Abrir ventana de comandos en la carpeta, ejecutar:

```bash
npm install
npm start
```

Desde un browser debemos abrir [localhost:4200](http://localhost:4200/)

## VSCode

Este proyecto utiliza eslint

```bash
sudo npm install -g eslint
```

## Docker

Podemos usar Docker para levantar este servidor, esta configuración es un build para producción, pero sirve para probarlo:

```bash
docker build --no-cache -t card_game_react https://raw.githubusercontent.com/nmarsollier/card_game_react/master/Dockerfile

# Mac || Windows
docker run -it -d --name card_game_react -p 4200:80 card_game_react

# Linux
docker run --add-host host.docker.internal:172.17.0.1 -it -d --name card_game_react -p 4200:80 card_game_react
```

[Test](http://localhost:4200/)
# Tateti-Front
