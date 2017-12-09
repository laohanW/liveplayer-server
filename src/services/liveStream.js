import models from '../models'
export let start = async (categoryId, account) => {
  let hasCategory = await models.category.findOne({
    where: {
      id: categoryId
    }
  })
  let hasAccount = await models.user.findOne({
    where: {
      account: account
    }
  })
  if (hasCategory) {
    if (hasAccount) {
      await models._libraries.create(hasCategory.get('name'),
        {
          account: account
        }
      )
      return {
        resCode: 0,
        msg: null,
        response: {
          streamId: 1001
        }
      }
    } else {
      return {
        resCode: 1,
        msg: 'dont has account=>' + account,
        response: null
      }
    }
  } else {
    return {
      resCode: 1,
      msg: 'dont has category=>' + categoryId,
      response: null
    }
  }
}
export let cancel = async (categoryId, account) => {
  let hasCategory = await models.category.findAll({
    where: {
      id: categoryId
    }
  })
  let hasAccount = await models.user.findAll(account)
  if (hasCategory.length > 0) {
    if (hasAccount.length > 0) {
      await models[hasCategory[0].dataValues.name].destroy(
        {
          where: {
            account: account
          }
        }
      )
      return {
        resCode: 0,
        msg: null,
        response: null
      }
    } else {
      return {
        resCode: 1,
        msg: 'dont has account=>' + account,
        response: null
      }
    }
  } else {
    return {
      resCode: 1,
      msg: 'dont has category=>' + categoryId,
      response: null
    }
  }
}
