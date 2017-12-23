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
      },
      include: [models.childCategory.instance]
    })
  if (result > 0) {
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
    return JSON.stringify(cat)
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
    return JSON.stringify(cat)
  } else {
    return {
      resCode: 1,
      msg: 'dont has this type' + type,
      response: null
    }
  }
}
export let addChild = async (categoryId, childCategoryName) => {
  let category = await models.category.findOne({
    where: {
      id: categoryId
    },
    include: [
      {
        model: models.childCategory.instance,
        where: {
          name: childCategoryName
        }
      }
    ]
  });
  if (category) {
    let errors = await models.childCategory.create({
      categoryId: categoryId,
      name: childCategoryName
    })
    if (errors) {
      return {
        resCode: 1,
        msg: null,
        response: null
      };
    } else {
      return {
        resCode: 0,
        msg: null,
        response: errors
      }
    }
  } else {
    return {
      resCode: 1,
      msg: 'dont has this categoryId or has this childCategoryName=>' + categoryId + '   ' + childCategoryName
    };
  }
}
export let removeChild = async (childCategoryId) => {
  let result = await models.childCategory.destroy({
    where: {
      id: childCategoryId
    }
  })
  if (result > 0) {
    return {
      resCode: 0,
      msg: null,
      response: null
    }
  } else {
    return {
      resCode: 1,
      msg: 'destroy errors',
      response: result
    };
  }
}
export let childRecomLIst = async (categoryId) => {
  let cat = await models.childCategory.findAll({
    where: {
      type: categoryId
    }
  })
  if (cat && cat.length > 0) {
    return JSON.stringify(cat)
  } else {
    return {
      resCode: 1,
      msg: 'dont has this type=>' + categoryId,
      response: null
    }
  }
}
