const path = require('path')
const fs =require('fs')

const mimeTypes={
    'css':{name:'text/css',icon:'icon-css'},
    'doc':{name:'application/msword',icon:'icon-DOc'},
    'gif':{name:'image/gif',icon:'icon-gif'},
    'html':{name:'text/html',icon:'icon-html'},
    'jpg':{name:'image/jpeg',icon:'icon-jpg'},
    'jpeg':{name:'image/jpeg',icon:'icon-jpg'},
    'js':{name:'text/javascript',icon:'icon-js'},
    'json':{name:'application/json',icon:'icon-json'},
    'mp3':{name:'audio/mpeg',icon:'icon-mp'},
    'png':{name:'image/png',icon:'icon-jpg'},
    'pdf':{name:'application/pdf',icon:'icon-pdf'},
    'svg':{name:'image/svg+xml',icon:'icon-svg'},
    'swf':{name:'application/x-shockwave-flash',icon:'icon-SWF'},
    'tiff':{name:'image/tiff',icon:'icon-Tiff'},
    'txt':{name:'text/plain',icon:'icon-txt'},
    'zip':{name:'application/zip',icon:'icon-zip'},
    'wav':{name:'audio/x-wav',icon:'icon-wav'},
    'wma':{name:'audio/x-ms-wma',icon:'icon-wav'},
    'wmv':{name:'video/x-ms-wmv',icon:'icon-wmv'},
    'xml':{name:'text/xml',icon:'icon-xml'},
    'file':{name:'text/html',icon:'icon-wenjianjia'}
}

module.exports=(filePath)=>{
    const stats=fs.statSync(filePath)
    if (stats.isFile()) {
        let ext = path.extname(filePath).split('.').pop().toLowerCase()
        // 取到传入进来的地址的拓展名，因为存在 .min.js这种文件，所以要将它们分割
        // 取到最后一位，然后转换成小写
        if (!ext) {
            ext=filePath
        }
        return mimeTypes[ext] || mimeTypes['txt']
    } else if(stats.isDirectory()){
        return mimeTypes['file']
    }
    // return mimeTypes[ext] || mimeTypes['txt']
}

// const isFile= async function(path){
//     const stats=await stat(path)
//     if (stats.isFile()) {
//         return true
//     } else if(stats.isDirectory()){
//         return false
//     }
// }