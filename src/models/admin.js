/* eslint-disable no-multi-spaces */
import Sequelize from 'sequelize'
import sequelize from '../lib/sequelize'

let model = sequelize.define('admin',
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
    tableName: 'TAdmin',
    timestamp: false
    // freezeTableName: true
  }
)
model.sync()
export let create = (param) => {
  model.create(param)
}
export let update = (param, query) => {
  model.update(param, query)
}
export let destroy = (query) => {
  model.destroy(query)
}
