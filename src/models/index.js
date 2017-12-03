import sequelize from '../lib/sequelize'
let requireDirectory = require('require-directory')
let models = requireDirectory(module)
let tableNameToTable = (name) => {
  let fir = name.slice(0, 1).toUpperCase()
  let cont = name.slice(1)
  return 'T' + fir + cont
}
export let addModel = async (tableName, param) => {
  let table = sequelize.define(tableName, param, {
    tableName: tableNameToTable(tableName),
    timestamp: false
  })
  await table.sync()
  models[tableName] = table
}
export default models

