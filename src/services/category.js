import models, { addModel } from '../models'
import Sequelize from 'sequelize'

export let categoryAll = (type) => {
  console.log(models)
  return {
    a: 1
  }
}
export let categoryRecom = (type) => {
  return {
    b: 2
  }
}
export let has = async (param) => {
  let h = await models.category.has(param)
  return h
}
export let add = async (type, categoryName, desc) => {
  let h = await has(
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
    await addModel(categoryName, {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
      },
      type: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      recommended: {
        type: Sequelize.BOOLEAN
      },
      description: {
        type: Sequelize.STRING
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
      msg: 'categoryName is has ',
      response: null
    }
  }
}
export let remove = async (categoryId) => {
  let h = await has(
    {
      where: {
        id: categoryId
      }
    })
  if (h.length > 0) {

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
