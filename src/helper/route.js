
const fs =require('fs')
const path=require('path')
const HandLebars=require('handlebars')
const promisify = require('util').promisify
const stat=promisify(fs.stat)
const readdir=promisify(fs.readdir)
// const config=require('../config/defaultConfig')
const compress=require('./compress')
const tplPath=path.join(__dirname,'../template/dir.tpl')
const csspath=path.join(__dirname,'../style/iconfont.js')
// 处理路径的时候尽量使用绝对路径，__dirname锚点是个绝对路径，表示这个文件所在的文件夹
const source=fs.readFileSync(tplPath)
// 因为下面的东西要想工作，必须等待这个执行完成，所以在这里用同步的方法


const tempalte=HandLebars.compile(source.toString())
// 因为compile接收的是一个字符串，而readFile读取的是一个Buffer对象，所以要转成字符串
// 因为readFile读取Buffer对象比较快，所以在读取后再进行转换

const mime=require('./mime')
const range=require('./range')
const isFresh = require('./cache')

module.exports=async function(req,res,filePath,config){
    try {
        const stats=await stat(filePath)
        if (stats.isFile()) {
            const contentType=mime(filePath)
            res.setHeader('Content-Type',contentType.name)
            if (isFresh(stats,req,res)) {
                res.statusCode=304;
                res.end()
                return
            }
            let rs;
            const {code,start,end}=range(stats.size,req,res);
            if (code===200) {
                res.statusCode=200;
                rs=fs.createReadStream(filePath)
            } else {
                res.statusCode=206;
                rs=fs.createReadStream(filePath,{start , end})
            }
            if (filePath.match(config.compress)) {
                rs=compress(rs,req,res)   
            }
            rs.pipe(res)
        }else if(stats.isDirectory()){
            const files=await readdir(filePath)
            res.statusCode=200;
            res.setHeader('Content-Type','text/html')
            const Dir=path.relative(config.root,filePath) 
            // path.relative()方法用于获取从第一个参数进入到第二个参数的相对路径，当两个参数都为绝对路径，且不同盘时，返回第二个参数
            // const cssPath=path.relative(config.root,css)
            const data={
                title:path.basename(filePath),
                dir:Dir?`/${Dir}`:'',
                cssPath:csspath,
                // 应该加上根路径
                // 当我们访问根路径的时候path.relative()会给我们返回空字符串，所以用三木判断
                files:files.map((file)=>{
                    return {
                        file,
                        iconobj:mime(path.join(filePath,file))
                    }
                })
            }
            res.end(tempalte(data))
        }
    } catch (error) {
        res.statusCode=404;
        res.setHeader('Content-Type','text/plain');
        res.end(`${filePath} is not a directroy or file`)
    }
}