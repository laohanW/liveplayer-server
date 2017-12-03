import service from '../services'

export let add = async (ctx) => {
  let type = ctx.checkBody('type').notEmpty().isInt()
  let categoryName = ctx.checkBody('categoryName').notEmpty()
  let desc = ctx.checkBody('desc').notEmpty()
  if (ctx.errors) {
    ctx.body = {
      resCode: 1,
      msg: 'categort add fail',
      response: ctx.errors
    }
  } else {
    ctx.body = await service.category.add(type.value, categoryName.value, desc.value)
  }
}
export let remove = async (ctx) => {
  let categoryId = ctx.checkBody('categoryId').notEmpty().isInt()
  if (ctx.errors) {
    ctx.body = {
      resCode: 1,
      msg: 'category remove fail',
      response: ctx.errors
    }
  } else {
    ctx.body = await service.category.remove(categoryId.value)
  }
}
