/* eslint-disable no-multi-spaces */
import Sequelize from 'sequelize'
import sequelize from '../lib/sequelize'

let anchor = sequelize.define('anchor',
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
    tableName: 'anchor',
    timestamp: false,
    freezeTableName: true
  }
)

export let create = (param) => {
  anchor.create(param)
}
export let update = (param, query) => {
  anchor.update(param, query)
}
export let destroy = (query) => {
  anchor.destroy(query)
}
