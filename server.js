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
	let url = req.url;

	if (url.startsWith('/index')||url==='/') {
		return serveIndex(res);
	}

	if (url==='/app') {
		return serveApp(res);
	}

	res.statusCode=404;
	res.end(`Not Found: ${url}`);
}

function serveIndex(res) {
	let index = path.join(__dirname,'public','index.html');
	let rs = fs.createReadStream(index);
	
	res.setHeader('Content-Type', 'text/html');
	rs.pipe(res);

	rs.on('error', function (err) {
		res.setHeader('Content-Type', 'text/plain');
		res.end(err.message);
	});
}

function serveApp(res) {
	let app = path.join(__dirname,'public','/app.js');
	let rs = fs.createReadStream(app);
	
	res.setHeader('Content-Type', 'text/javascript');
	rs.pipe(res);

	rs.on('error', function (err) {
		res.setHeader('Content-Type', 'text/plain');
		res.end(err.message);
	});
}
function onListening(){
	console.log(`Server Up and Running on port ${port}`);
}