import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'

import jwt from 'koa-jwt'
import fs from 'fs'
import path from 'path'

const router = new KoaRouter()

const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))
const API_PATH = '/api/1.0'

router
// .use(jwt({ secret: publicKey }).unless({ path: [/^\/public|\/user\/login|\/assets/] }))
  .get('/public/get', function (ctx, next) {
    ctx.body = '禁止访问！'
  }) // 以/public开头则不用经过权限认证
  .all(API_PATH + '/upload', controllers.upload.default)

  .post(API_PATH + '/category/add', controllers.category.add)
  .post(API_PATH + '/category/remove', controllers.category.remove)
  .post(API_PATH + '/category/recomList', controllers.category.recomList)
  .post(API_PATH + '/category/allList', controllers.category.allList)
  .post(API_PATH + '/category/setRecom', controllers.category.setRecom)
  .post(API_PATH + '/category/addChild', controllers.category.addChild)
  .post(API_PATH + '/category/removeChild', controllers.category.removeChild)

  .post(API_PATH + '/liveStream/start', controllers.liveStream.start)
  .post(API_PATH + '/liveStream/cancel', controllers.liveStream.cancel)
  .post(API_PATH + '/liveStream/list', controllers.liveStream.list)
  .post(API_PATH + '/liveStream/join', controllers.liveStream.join)

  .post(API_PATH + '/user/add', controllers.user.add)
  .post(API_PATH + '/user/remove', controllers.user.remove)
  .post(API_PATH + '/user/resetPassword', controllers.user.resetPassword)

  .post(API_PATH + '/chat/create',controllers.chat.create)

module.exports = router
