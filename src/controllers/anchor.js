export let GameCategory = (ctx) => {
  ctx.body({
    result: 'get',
    name: ctx.params.name,
    para: ctx.query
  })
}
export let EntertainCategory = (ctx) => {

}
