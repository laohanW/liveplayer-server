import models from '../models'
export let categoryAll = () => {
  console.log(models)
  return {
    a: 1
  }
}
export let categoryRecom = () => {
  return {
    b: 2
  }
}
export let create = (param) => {
  console.log(models.anchor)
  models.anchor.create(param)
}
