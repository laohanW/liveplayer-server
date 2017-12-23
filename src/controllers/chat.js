
export let create = async (ctx) => {
  let account = ctx.checkBody('account').notEmpty();
  if (ctx.errors) {
    ctx.body = {
      resCode: 1,
      msg: 'validate body',
      response: ctx.errors
    };
  } else {
    ctx.io.of('/chats').on('connection')
  }
}
