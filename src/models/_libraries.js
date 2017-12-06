import sequelize from '../lib/sequelize'

let libraries = {}
export let addModel = (tableName, param, option) => {
  let model = sequelize.define(tableName, param, option)
  model.sync()
  libraries[tableName] = model
}
export let create = async (tableName, param) => {
  await libraries[tableName].create(param)
}
export let update = async (tableName, param, query) => {
  await libraries[tableName].update(param, query)
}
export let destroy = async (tableName, query) => {
  await libraries[tableName].destroy(query)
}
export let drop = async (tableName) => {
  libraries[tableName].drop()
  delete libraries[tableName]
}
export let findAll = async (tableName, query) => {
  return await libraries[tableName].findAll(query, {raw: true, logging: true, plain: false})
}
export let has = async (tableName, param) => {
  return await libraries[tableName].findAll(param, {raw: true, logging: true, plain: false})
}
