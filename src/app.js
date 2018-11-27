const http = require('http');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const conf = require('./config/defaultConfig.js');

const server = http.createServer((req, res) => {
	const filePath = path.join(conf.root, req.url);
	fs.stat(filePath,(err,stats) =>{
		if (err) {
		  	res.statusCode = 404;
		  	res.setHeader('Content-Type', 'text/plain');
		  	res.end('404 NotFound');
		  	return
		}
		if (stats.isFile()) {
			res.statusCode = 200;
		  	res.setHeader('Content-Type', 'text/plain');
		  	fs.createReadStream(filePath).pipe(res);
		}else if (stats.isDirectory()) {
			fs.readdir(filePath, function(err, files) {
				res.statusCode = 200;
		  		res.setHeader('Content-Type', 'text/plain');
		  		res.end(files.join(','));
			})
		}
	})


});

server.listen(conf.port,conf.hostname,() => {
	const addr = `http://${conf.hostname}:${conf.port}`;
	console.log(`server is starting at ${chalk.green(addr)}`);
})