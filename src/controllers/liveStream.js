import service from '../services'

export let start = async (ctx) => {
  let categoryId = ctx.checkBody('categoryId').notEmpty().isInt()
  let account = ctx.checkBody('account').notEmpty()
  if (ctx.errors) {
    ctx.body = {
      resCode: 1,
      msg: 'start error',
      response: ctx.errors
    }
  } else {
    ctx.body = await service.liveStream.start(categoryId.value, account.value)
  }
}
export let cancel = async (ctx) => {
  let categoryId = ctx.checkBody('categoryId').notEmpty().isInt()
  let account = ctx.checkBody('account').notEmpty()
  if (ctx.errors) {
    ctx.body = {
      resCode: 1,
      msg: 'start error',
      response: ctx.errors
    }
  } else {
    ctx.body = await service.liveStream.start(categoryId.value, account.value)
  }
}
export let join = async (ctx) => {
  ctx.body = {
    resCode: 0,
    msg: null,
    response: null
  }
}
export let list = async (ctx) => {
  let categoryId = ctx.checkBody('categoryId').notEmpty().isInt()
  let detailId = ctx.checkBody('detailId').notEmpty().isInt()
  if (ctx.errors) {

  } else {

  }
}
