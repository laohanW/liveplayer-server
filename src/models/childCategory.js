/* eslint-disable no-multi-spaces */
import Sequelize from 'sequelize'
import sequelize from '../lib/sequelize'

let model = sequelize.define('childCategory',
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true
    },
    name: {
      type: Sequelize.STRING
    }
  },
  {
    tableName: 'TChildCategory',
    timestamp: false
    // freezeTableName: true
  }
)
model.sync()
export let create = async (param) => {
  await model.create(param)
}
export let update = async (param, query) => {
  await model.update(param, query)
}
export let destroy = async (query) => {
  await model.destroy(query)
}
export let findAll = async (query) => {
  return await model.findAll(query, {raw: true, logging: true, plain: false})
}
