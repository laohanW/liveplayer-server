import models from '../models'
export let start = async (categoryId, childCategoryId, account) => {
  let category = await models.category.findOne({
    where: {
      id: categoryId
    },
    include:
      [
        {
          model: models.childCategory.instance,
          where: {
            id: childCategoryId
          }
        }
      ]
  })
  let user = await models.user.findOne({
    where: {
      account: account
    }
  })
  if (category && user) {
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
      msg: 'dont has category or user or childCategory=>' + categoryId + '  ' + childCategoryId + '   ' + account,
      response: null
    }
  }
}
export let cancel = async (streamId, account) => {
  let user = await models.user.findOne({
    where: {
      account: account
    }
  })
  if (user) {
    let result = await models.liveStream.destroy({
      where: {
        id: streamId,
        account: account
      }
    });
    if (result > 0) {
      return {
        resCode: 0,
        msg: null,
        response: null
      }
    } else {
      return {
        resCode: 1,
        msg: 'cancel failure',
        response: null
      }
    }
  } else {
    return {
      resCode: 1,
      msg: 'dont has stream or user=>' + streamId + '   ' + account,
      response: null
    }
  }
}
export let list = async (childCategoryId) => {
  let liveStream = await models.liveStream.findAll({
    where: {
      childCategoryId: childCategoryId
    }
  })
  if (liveStream) {
    return JSON.stringify(liveStream)
  } else {
    return {
      resCode: 1,
      msg: 'dont has this categoryId and childCategoryId',
      response: null
    }
  }
};
