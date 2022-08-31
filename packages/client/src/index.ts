import Hashids from 'hashids';
import { io, Socket } from 'socket.io-client';

const hashids = new Hashids('blaze-js');

class BlazeJSClient {
  hits = 0;
  client: Socket;
  queue: Map<
    string,
    {
      resolve: (value: unknown) => void;
      reject: (value: unknown) => void;
    }
  >;

  constructor(host: string) {
    this.client = io(host);
    this.queue = new Map();

    this.handleResponse();
  }

  handleResponse() {
    this.client.on('__serviceResult', (data) => {
      const { result, reqId } = data;
      const serviceQueue = this.queue.get(reqId);
      if (serviceQueue) {
        serviceQueue.resolve(result);
      }

      this.queue.delete(reqId);
    });
  }

  async run(name: string, payload?: unknown) {
    const reqId = hashids.encode(this.hits);

    this.client.emit('__runService', {
      name,
      payload,
      reqId,
    });
    this.hits += 1;

    const promise = new Promise((resolve, reject) => {
      this.queue.set(reqId, { resolve, reject });
    });

    return promise;
  }
}

export { BlazeJSClient };
