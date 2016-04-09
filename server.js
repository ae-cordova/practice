'use strict'

//Requiriendo las librerias necesarias:
const http = require('http');
const fs = require ("fs"); //filesystem
const path = require ('path');

//Definiendo el puerto de escucha, o bien si no esta especificado se pone por default el 8080
const port = process.env.PORT||8080;

const server= http.createServer();//Creamos el server

server.on('request', onRequest);//Definimos que hacer en el evento request
server.on('listening', onListening);//Definimos que hacer al inicial la escucha del server

server.listen(port);//empezamos a excuchar por el pueto definido


function onRequest (req, res){
	let index = path.join(__dirname,'public','index.html');
	let rs = fs.createReadStream(index);
	
	rs.setHeader('Content-Type', 'text/html');
	rs.pipe(res);

	});
}

function onListening(){
	console.log("Server Up and Running on port "+ port);
}