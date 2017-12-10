import models from '../models'
export let add = async (type, categoryName, desc) => {
  let h = await models.category.findOne(
    {
      where: {
        type: type,
        name: categoryName
      }
    })
  if (h) {
    return {
      resCode: 1,
      msg: 'categoryName is has ',
      response: null
    }
  } else {
    let result = await models.category.create({
      type: type,
      name: categoryName,
      recommended: 0,
      description: desc
    })
    if (result) {
      return {
        resCode: 1,
        msg: 'category create fail ',
        response: result
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
export let remove = async (categoryId) => {
  let result = await models.category.destroy(
    {
      where: {
        id: categoryId
      }
    });
  if (result === 1) {
    return {
      resCode: 0,
      msg: null,
      response: null
    }
  } else {
    return {
      resCode: 1,
      msg: 'category remove filure',
      response: result
    }
  }
}
export let recomList = async (type) => {
  let cat = await models.category.findAll({
    where: {
      type: type,
      recommended: true
    }
  })
  if (cat && cat.length > 0) {
    let result = []
    for (let p of cat) {
      result.push(JSON.stringify(p))
    }
    return result
  } else {
    return {
      resCode: 1,
      msg: 'dont has this type=>' + type,
      response: null
    }
  }
}
export let setRecom = async (categoryId, recommended) => {
  let error = await models.category.update({
    recommended: recommended
  }, {
    where: {
      id: categoryId
    }
  });
  if (error) {
    return {
      resCode: 1,
      msg: 'dont has this categoryId=>' + categoryId,
      response: error
    };
  } else {
    return {
      resCode: 0,
      msg: null,
      response: null
    }
  }
}
export let allList = async (type) => {
  let cat = await models.category.findAll({
    where: {
      type: type
    },
    distinct: true
  })
  if (cat && cat.length > 0) {
    let result = []
    for (let p of cat) {
      result.push(JSON.stringify(p))
    }
    return result
  } else {
    return {
      resCode: 1,
      msg: 'dont has this type' + type,
      response: null
    }
  }
}
