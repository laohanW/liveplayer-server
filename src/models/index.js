import Sequelize from 'sequelize'
import {addTFirst} from '../tool/Common'
let requireDirectory = require('require-directory')
let models = requireDirectory(module)
async function initialize () {
  let categories = await models.category.findAll()
  for (let c of categories) {
    await models._libraries.addModel(c.dataValues.name, {
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
      tableName: addTFirst(c.dataValues.name),
      timestamp: false
    })
  }
}
initialize()
export default models
