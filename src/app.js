const http = require('http')
const chalk=require('chalk')
const path =require('path')
const route = require('./helper/route')
const conf = require('./config/defaultConfig')

const openUrl=require('./helper/openUrl')

// const server = http.createServer((req,res)=>{
//     const filePath=path.join(conf.root,req.url)
//     fs.stat(filePath,(err,stats)=>{
//         if (err) {
//             res.statusCode=404;
//             res.setHeader('Content-Type','text/plain');
//             res.end(`${filePath} is not a directroy or file`)
//             return;
//         }
//         if (stats.isFile()) {
//             res.statusCode=200;
//             res.setHeader('Content-Type','text/plain')
//             fs.createReadStream(filePath).pipe(res)
//         }else if(stats.isDirectory()){
//             fs.readdir(filePath,(err,files)=>{
//                 res.statusCode=200;
//                 res.setHeader('Content-Type','text/plain')
//                 res.end(files.join(','))
//             })
//         }
//     })
// })

class Server{
    constructor(config){
        this.conf=Object.assign({},conf,config)
    }
    start(){
        const server = http.createServer((req,res)=>{
            const filePath=path.join(this.conf.root,req.url)
            route(req,res,filePath,this.conf)
        })
        server.listen(this.conf.port,this.conf.hostname,()=>{
            const addr=`http://${this.conf.hostname}:${this.conf.port}`;
            console.info(`Server started at ${chalk.green(addr)}`)
            openUrl(addr)
        })
    }
}
module.exports=Server
// const server = http.createServer((req,res)=>{
//     const filePath=path.join(this.conf.root,req.url)
//     route(req,res,filePath)
// })
// server.listen(this.conf.port,this.conf.hostname,()=>{
//     const addr=`http://${this.conf.hostname}:${this.conf.port}`;
//     console.info(`Server started at ${chalk.green(addr)}`)
// })