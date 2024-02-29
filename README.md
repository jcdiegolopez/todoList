TODO-LIST Autor: Diego López

Descripción:

Este proyecto contiene dos ramas:

Main: Contiene solo el cliente, aunque existan las dos carpetas. Server: Contiene la implementación del servidor de MongoDB con Express. Requisitos:

Tener Node.js descargado e instalado. Cómo ejecutar:

Cliente: Navegar a la carpeta client: cd client Instalar las dependencias: npm i Servidor: Navegar a la carpeta server: cd server Instalar las dependencias: npm i Ejecutar ambos simultáneamente: Navegar a la carpeta raíz del proyecto: cd .. Ejecutar el comando npm start desde la raiz "./" : npm start Nota:

El comando npm start utiliza la herramienta concurrently para ejecutar el servidor y el cliente al mismo tiempo con una sola línea de código.

Archivos:

./client/package.json: Contiene las dependencias del cliente. ./server/package.json: Contiene las dependencias del servidor. ./package.json: Contiene las dependencias del proyecto general y la configuración de concurrently. Instrucciones adicionales:

Puedes modificar el código del cliente y del servidor según tus necesidades. Puedes acceder a la base de datos MongoDB a través de una herramienta como MongoDB Compass. Para más información sobre Node.js, MongoDB y Express, consulta la documentación oficial.

Si tienes alguna pregunta o necesitas ayuda con este proyecto, puedes contactarme a través de correo electrónico: dijolopez@gmail.com.
