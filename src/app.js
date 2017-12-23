import Koa2 from 'koa'
import http from 'http'
import socketIO from 'socket.io'
import KoaBody from 'koa-body'
import KoaStatic from 'koa-static2'
import {
  System as SystemConfig
} from './config'
import path from 'path'
import validate from 'koa-validate'
import apiRoutes from './routes/api-routes'
// import adminRoutes from './routes/admin-routes'
import ErrorRoutesCatch from './middleware/ErrorRoutesCatch'
import ErrorRoutes from './routes/error-routes'
import './lib/sequelize'
import './models/index'
const app = new Koa2()
const env = process.env.NODE_ENV || 'development' // Current mode
const server = http.createServer(app.callback);
validate(app)
app.io = socketIO(server, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});
app
  .use((ctx, next) => {
    if (ctx.request.header.host.split(':')[0] === 'localhost' || ctx.request.header.host.split(':')[0] === '127.0.0.1') {
      ctx.set('Access-Control-Allow-Origin', '*')
    } else {
      ctx.set('Access-Control-Allow-Origin', SystemConfig.HTTP_server_host)
    }
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    ctx.set('Access-Control-Allow-Credentials', true) // 允许带上 cookie
    return next()
  })
  .use(ErrorRoutesCatch())
  .use(KoaStatic('assets', path.resolve(__dirname, '../assets'))) // Static resource
  .use(KoaBody({
    multipart: true,
    strict: false,
    formidable: {
      uploadDir: path.join(__dirname, '../assets/uploads/tmp')
    },
    jsonLimit: '10mb',
    formLimit: '10mb',
    textLimit: '10mb'
  })) // Processing request
  // .use(PluginLoader(SystemConfig.System_plugin_path))
  .use(apiRoutes.routes())
  .use(apiRoutes.allowedMethods())
  // .use(adminRoutes.routes())
  // .use(adminRoutes.allowedMethods())
  .use(ErrorRoutes())
// app.io.on('connection', (socket) => {
//   console.log('connection => ' + socket.id);
//   socket.on('message', (data) => {
//     socket.broadcast.emit('message', data);
//     console.log('message' + data);
//   });
//   socket.on('disconnect', (reason) => {
//     console.log('disconnect' + reason);
//   });
// });
if (env === 'development') { // logger
  app.use((ctx, next) => {
    const start = new Date()
    return next().then(() => {
      const ms = new Date() - start
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })
  })
}

server.listen(SystemConfig.API_server_port)

console.log('Now start API server on port ' + SystemConfig.API_server_port + '...')

export default app
