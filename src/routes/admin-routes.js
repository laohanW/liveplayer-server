import KoaRouter from 'koa-router'
import controllers from '../controllers/index.js'

import jwt from 'koa-jwt'
import fs from 'fs'
import path from 'path'

const router = new KoaRouter()

const publicKey = fs.readFileSync(path.join(__dirname, '../../publicKey.pub'))

const API_PATH = '/admin/1.0'

router
  .use(jwt({secret: publicKey}))
  .get('/public/get', function (ctx, next) {
    ctx.body = '禁止访问！'
  }) // 以/public开头则不用经过权限认证
  .all(API_PATH + '/upload', controllers.upload.default)
  .get(API_PATH + '/api/:name', controllers.api.Get)
  .post(API_PATH + '/api/:name', controllers.api.Post)
  .put(API_PATH + '/api/:name', controllers.api.Put)
  .del(API_PATH + '/api/:name', controllers.api.Delect)

  .post(API_PATH + '/auth/:action', controllers.auth.Post)

module.exports = router
