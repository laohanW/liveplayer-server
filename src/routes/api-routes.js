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
  .post(API_PATH + '/entertain/start', controllers.entertain.start)
  .get(API_PATH + '/entertain/categoryAll', controllers.entertain.categoryAll)
  .get(API_PATH + '/entertain/categoryRecom', controllers.entertain.categoryRecom)

module.exports = router
