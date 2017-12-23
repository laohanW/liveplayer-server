
export let create = async (ctx) => {
  let account = ctx.checkBody('account').notEmpty();
  if (ctx.errors) {
    ctx.body = {
      resCode: 1,
      msg: 'validate body',
      response: ctx.errors
    };
  } else {
    ctx.app.io.of('/' + account).on('connection', (socket) => {
      socket.on('message', (data) => {
        socket.broadcast.emit('message', data);
        console.log(data);
      });
      socket.on('disconnect', (reason) => {
        console.log(reason);
      });
    });
  }
}
