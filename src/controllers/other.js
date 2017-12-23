import service from '../services'
export let categoryRecomList = async (ctx) => {
  let type = ctx.checkBody('type').notEmpty().isInt();
  if (ctx.errors) {
    ctx.body = {
      resCode: 1,
      msg: 'validate errors',
      response: ctx.errors
    }
  } else {
    let recomListBody = await service.category.recomList(type.value);
    if (recomListBody.resCode === 0) {
      let recomContentBody = await service.other.recomContent(type.value);
      if (recomContentBody.resCode === 0) {
        ctx.body = {
          resCode: 0,
          msg: null,
          response: {
            list: recomListBody.response,
            bannerItems: [],
            content: recomContentBody.response
          }
        };
      } else {
        ctx.body = recomContentBody;
      }
    } else {
      ctx.body = recomListBody;
    }
  }
}
export let childCategoryRecomList = async (ctx) => {
  let categoryId = ctx.checkBody('categoryId').notEmpty().isInt();
  if (ctx.errors) {
    ctx.body = {
      resCode: 1,
      msg: 'validate errors',
      response: ctx.errors
    }
  } else {
    let recomListBody = await service.category.childCategoryRecomList(categoryId.value);
    if (recomListBody.resCode === 0) {
      let recomContentBody = await service.other.childRecomContent(categoryId.value);
      if (recomContentBody.resCode === 0) {
        ctx.body = {
          resCode: 0,
          msg: null,
          response: {
            list: recomListBody.response,
            bannerItems: [],
            content: recomContentBody.response
          }
        };
      } else {
        ctx.body = recomContentBody;
      }
    } else {
      ctx.body = recomListBody;
    }
  }
}
