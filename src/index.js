const yargs = require('yargs')
const Server = require('./app')


const argv = yargs.usage('xiaobai01 [options]')
    .option('p',{
        alias:'port',       // 别名
        describe:'端口号',  // 描述
        default:'6666'     // 默认值
    })
    .option('h',{
        alias:'hostname',       // 别名
        describe:'host',  // 描述
        default:'127.0.0.1'     // 默认值
    })
    .option('d',{
        alias:'root',       // 别名
        describe:'root path',  // 描述
        default:process.cwd()     // 默认值
    })
    .version()
    .alias('v','version')
    .help()
    .argv

const server = new Server(argv)

server.start()