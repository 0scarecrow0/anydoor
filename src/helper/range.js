module.exports=( totalSize , req , res )=>{
    // totalSize总的字节数，req.res因为要在请求头和响应头中设置headers
    const range=req.headers['range']
    if (!range) {
        return { code:200 }
    }
    const sizes=range.match(/bytes=(\d*)-(\d*)/)
    const start = sizes[1] || totalSize-end;
    const end = sizes[2] || totalSize-1;
    if (start>end || start<0 || end>totalSize) {
        return {code:200}
    }
    res.setHeader('Accept-Ranges','bytes')
    res.setHeader('Content-Range',`bytes ${start}-${end}/${totalSize}`)
    res.setHeader('Content-Length',end-start)
    return {
        code:206,
        start:parseInt(start),
        end:parseInt(end)
    }
}