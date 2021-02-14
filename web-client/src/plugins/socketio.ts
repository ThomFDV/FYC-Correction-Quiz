import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';

export default new VueSocketIO({
  debug: true,
  // @ts-expect-error
  connection: SocketIO('https://fyc-server.herokuapp.com'),
});
