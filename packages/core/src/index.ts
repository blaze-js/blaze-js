import * as Http from 'http';
import { Server as HttpServer } from 'http';
import { Server as SocketServer } from 'socket.io';

import { BlazeService } from './lib/service';

class BlazeJS extends BlazeService {
  http: HttpServer;
  io: SocketServer;

  constructor() {
    super();

    this.http = Http.createServer();
    this.io = new SocketServer(this.http);

    this.init();
  }

  init() {
    this.io.on('connection', (socket) => {
      socket.on('__runService', async (data) => {
        const { name, payload, reqId } = data;
        const serviceResult = await this.runService(name, payload);

        socket.emit('__serviceResult', {
          result: serviceResult,
          reqId,
        });
      });
    });
  }

  listen(port: number, cb?: () => void) {
    this.http.listen(port);
    if (cb) cb();
  }
}

export { BlazeJS };
