import models from '../models'
import {addTFirst} from '../tool/Common'
import Sequelize from 'sequelize'
export let add = async (type, categoryName, desc) => {
  let h = await models.category.findOne(
    {
      where: {
        type: type,
        name: categoryName
      }
    })
  if (h) {
    await models.category.create({
      type: type,
      name: categoryName,
      recommended: false,
      description: desc
    })
    await models._libraries.addModel(categoryName, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
      },
      account: {
        type: Sequelize.STRING
      }
    }, {
      tableName: addTFirst(categoryName),
      timestamp: false
    })
    return {
      resCode: 0,
      msg: null,
      response: null
    }
  } else {
    return {
      resCode: 1,
      msg: 'categoryName is has ',
      response: null
    }
  }
}
export let remove = async (categoryId) => {
  let h = await models.category.findOne(
    {
      where: {
        id: categoryId
      }
    })
  if (h) {
    models._libraries.drop(h.get('name'))
    models.category.destroy(
      {
        where: {
          id: categoryId
        }
      })
    return {
      resCode: 0,
      msg: null,
      response: null
    }
  } else {
    return {
      resCode: 1,
      msg: 'categoryId is dont has ',
      response: null
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
  if (cat.length > 0) {
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
export let allList = async (type) => {
  let cat = await models.category.findAll({
    where: {
      type: type
    },
    distinct: true
  })
  if (cat.length > 0) {
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
