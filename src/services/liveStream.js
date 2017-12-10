import models from '../models'
export let start = async (categoryId, childCategoryId, account) => {
  let category = await models.category.findOne({
    where: {
      id: categoryId
    }
  })
  let childCategory = await models.childCategory.findOne({
    where: {
      id: childCategoryId
    }
  })
  let user = await models.user.findOne({
    where: {
      account: account
    }
  })
  if (category && childCategory && user) {
    let error = await models.liveStream.create({
      account: account,
      categoryId: categoryId,
      childCategoryId: childCategoryId
    })
    if (error) {
      return {
        resCode: 1,
        msg: 'create fail',
        response: null
      }
    } else {
      return {
        resCode: 0,
        msg: null,
        response: null
      }
    }
  } else {
    return {
      resCode: 1,
      msg: 'dont has category or user or childCategory=>' + categoryId + '  '+childCategoryId + '   ' + account,
      response: null
    }
  }
}
export let cancel = async (categoryId, childCategoryId, account) => {
  let category = await models.category.findOne({
    where: {
      id: categoryId
    }
  })
  let childCategory = await models.childCategory.findOne({
    where: {
      id: childCategoryId
    }
  })
  let user = await models.user.findOne({
    where: {
      account: account
    }
  })
  if (user && category && childCategory)
  {
    let result = await models.liveStream.destroy({
      where: {
        categoryId: categoryId,
        childCategoryId: childCategoryId,
        account: account
      }
    });
    if (result) {
      return {
        resCode: 1,
        msg: 'cancel failure',
        response: null
      }
    } else {
      return {
        resCode: 0,
        msg: null,
        response: null
      }
    }
  } else {
    return {
      resCode: 1,
      msg: 'dont has category or user or childCategory=>' + categoryId + '  '+childCategoryId + '   ' + account,
      response: null
    }
  }
}
export let list = async (categoryId,childCategoryId) => {
  return {
    resCode: 0,
    msg: null,
    response: null
  }
}
