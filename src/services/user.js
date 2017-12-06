import models from '../models'
export let add = async (account, password, name) => {
  await models.user.create({
    account: account,
    password: password,
    name: name
  })
  return {
    resCode: 0,
    msg: null,
    response: null
  }
}
export let remove = async (account) => {
  await models.user.destroy({
    where: {
      account: account
    }
  })
  return {
    resCode: 0,
    msg: null,
    response: null
  }
}
