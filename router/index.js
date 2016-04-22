const path= require('path');
const course = require('course');
const st = require('st');

const router = course();

const mount =st({
	path: path.join(__dirname,'..', 'public'),
	index: 'index.html',
	passthrough: true
});

function onRequest(req, res){
	mount(req,res,function(err){
		if (err) return res.end(err.message);

		router(req, res,function (err){
			if (err) return res.end(err.message);
			
			res.statuscode=404;
			res.end(`Not Found: ${req.url}`);
		});
	});
}

module.exports=onRequest;
