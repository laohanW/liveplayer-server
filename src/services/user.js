import models from '../models'
export let add = async (account, password, name) => {
  let result = await models.user.findOne({
    where: {
      account: account
    }
  })
  console.log(result)
  if (result) {
    return {
      resCode: 1,
      msg: 'has this user=> ' + account,
      response: null
    }
  } else {
    let error = await models.user.create({
      account: account,
      password: password,
      name: name
    })
    if (error) {
      return {
        resCode: 1,
        msg: 'create error',
        response: error
      }
    } else {
      return {
        resCode: 0,
        msg: null,
        response: null
      }
    }
  }
}
export let remove = async (account) => {
  let result = await models.user.findOne({
    where: {
      account: account
    }
  })
  if (result) {
    let error = await models.user.destroy({
      where: {
        account: account
      }
    })
    if (error) {
      return {
        resCode: 1,
        msg: 'delete failer=>' + account,
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
      msg: 'dont has this user=>' + account,
      response: null
    }
  }
}
export let resetPassword = async (account, oldPassword, newPassword) => {
  let result = await models.user.findOne({
    where: {
      account: account
    }
  })
  if (result) {
    let pas = result.get('password');
    if (pas === oldPassword) {
      let error = await models.user.update(
        {
          password: newPassword
        },
        {
          where: {
            account: account
          }
        });
      if (error) {
        return {
          resCode: 1,
          msg: 'reset password failer=>' + account,
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
        msg: 'oldPassword is invalidr=>' + account,
        response: null
      }
    }
  } else {
    return {
      resCode: 1,
      msg: 'dont has this user=>' + account,
      response: null
    };
  }
}
