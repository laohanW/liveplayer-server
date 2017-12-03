import service from '../services'

export let categoryAll = (ctx) => {
  ctx.body = {
    resCode: 0,
    msg: null,
    response: service.entertain.categoryAll()
  }
}
export let categoryRecom = (ctx) => {
  ctx.body = {
    resCode: 0,
    msg: null,
    response: service.entertain.categoryRecom()
  }
}

export let start = (ctx) => {
  let category = ctx.checkBody('category').notEmpty().isInt()
  let account = ctx.checkBody('account').notEmpty()
  if (ctx.errors) {
    ctx.body = {
      resCode: 1,
      msg: 'error',
      response: ctx.errors
    }
  } else {
    ctx.body = service.entertain.start(category.value, account.value)
  }
}
export let cancel = (ctx) => {

}
