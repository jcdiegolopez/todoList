TODO-LIST
Autor: Diego López
Dos branches: Main es solamente cliente, aunque existan las dos carpetas. El branch Server es el todo list con la implementación de servidor de MongoDB con express.
Requisitos: Tener descargado node js.
Como correr desde la ruta "./": 
  cd client
  npm i
  cd .. 
  cd server
  npm i
  cd ..
  npm i
  npm start
La ruta ./ tiene módulos de node para correr el servidor y cliente simultáneamente con una sola línea de código “npm start”, esto se logra a través de concurrently.
