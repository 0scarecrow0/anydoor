const { createGzip,createDeflate }=require('zlib')

module.exports=(rs,req,res)=>{
    // 压缩一个文件需要的参数
    // 第一个事我们要压缩的文件
    // 第二参数拿到浏览器支持的压缩方式--->req.headers
    // 第三个参数是压缩之后并告诉浏览器使用的是那种方式压缩的，方便浏览器解压
    const acceptEncoding=req.headers['accept-encoding']
    // 有两种情况是不能压缩的，第一种是浏览器已经申明来了不支持任何压缩方式
    // 第二种是拿到的压缩方式不是浏览器支持的
    if (!acceptEncoding || !acceptEncoding.match(/\b(gzip|deflate)\b/)) {
        return rs
    }else if(acceptEncoding.match(/\bgzip\b/)){
        res.setHeader('Content-Encoding','gzip')
        return rs.pipe(createGzip())
    }else if(acceptEncoding.match(/\deflate\b/)){
        res.setHeader('Content-Encoding','deflate')
        return rs.pipe(createDeflate())
    }
}