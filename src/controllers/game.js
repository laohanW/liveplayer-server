import service from '../services'

export let categoryAll = (ctx) => {
  ctx.body = {
    resCode: 0,
    msg: null,
    response: service.game.categoryAll()
  }
}
export let categoryRecom = (ctx) => {
  ctx.body = {
    resCode: 0,
    msg: null,
    response: service.game.categoryRecom()
  }
}

export let create = (ctx) => {
  service.game.create(ctx.request.body)
  ctx.body = {
    resCode: 0,
    msg: null,
    response: {}
  }
}
