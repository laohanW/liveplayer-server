import service from '../services'
export let add = async (ctx) => {
  let account = ctx.checkBody('account').notEmpty()
  let password = ctx.checkBody('password').notEmpty()
  let name = ctx.checkBody('name').notEmpty()
  if (ctx.errors) {
    ctx.body = {
      resCode: 1,
      msg: 'start error',
      response: ctx.errors
    }
  } else {
    ctx.body = await service.user.add(account.value, password.value, name.value)
  }
}

export let remove = async (ctx) => {
  let account = ctx.checkBody('account').notEmpty()
  if (ctx.errors) {
    ctx.body = {
      resCode: 1,
      msg: 'start error',
      response: ctx.errors
    }
  } else {
    ctx.body = await service.user.remove(account.value)
  }
}
