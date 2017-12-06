import models from '../models'
import {addTFirst} from '../tool/Common'
import Sequelize from 'sequelize'
export let add = async (type, categoryName, desc) => {
  let h = await models.category.findAll(
    {
      where: {
        type: type,
        name: categoryName
      }
    })
  if (h.length === 0) {
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
  let h = await models.category.findAll(
    {
      where: {
        id: categoryId
      }
    })
  if (h.length > 0) {
    models._libraries.drop(h[0].dataValues.name)
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
