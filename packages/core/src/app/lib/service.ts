class BlazeService {
  services: Map<string, ServiceCallback>;

  constructor() {
    this.services = new Map();
  }

  async runService(name: string, payload: any) {
    if (!this.services.has(name)) {
      throw new Error('Service does not exist');
    }

    const service = this.services.get(name);
    if (service) return service(payload);
  }

  addService(name: string, cb: ServiceCallback) {
    if (this.services.has(name)) {
      throw new Error('Service already exist');
    }

    this.services.set(name, cb);
  }
}

export { BlazeService };
