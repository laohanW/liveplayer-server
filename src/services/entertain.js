import models from '../models'
export let categoryAll = () => {
  console.log(models)
  return {
    a: 1
  }
}
export let categoryRecom = () => {
  return {
    b: 2
  }
}
export let start = (category, account) => {
  let hasCategory = models.category.has(category)
  let hasAccount = models.user.has(account)
  if (hasCategory) {
    if (hasAccount) {
      models[category].create()
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
      msg: 'dont has category=>' + category,
      response: null
    }
  }
}
