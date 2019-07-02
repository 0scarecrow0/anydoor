const { cache }=require('../config/defaultConfig')


function refreshRes(stats,res) {  // 根据我们的配置，来更新我们的响应
    const { maxAge, expires ,cacheControl,lastModified,etag }=cache
    if(expires){
        res.setHeader('Expires',(new Date(Date.now()+maxAge*1000)).toUTCString() )
        // Data.now()+maxAge*1000是一个字符串，所以需要用new Data()
        // .toUTCString()然后转成一个时间字符串
    }
    if (cacheControl) {
        res.setHeader('Cache-Control',`public,max-age=${maxAge}`)
    }
    if (lastModified) {
        res.setHeader('Last-Modified',stats.mtime.toUTCString())
    }
    if (etag) {
        res.setHeader('ETag',`${stats.size}-${stats.mtime}`)
    }
}

module.exports=function isFresh(stats,req,res) {
    refreshRes(stats,res);

    const lastModified=req.headers['if-modified-since']
    const etag=req.headers['if-none-match']
    if (!lastModified && !etag) {
        return false
    }
    if (lastModified && lastModified!== res.getHeader('Last-Modified')) {
        return false
    }
    if (etag && etag!==res.getHeader('ETag')) {
        return false
    }
    return true
}