import { HAP, Logging, PlatformAccessory, PlatformConfig, Service, WithUUID } from 'homebridge';

type ServiceType = WithUUID<typeof Service>;

export class LinksysAccessory {
  private readonly log: Logging;
  private readonly hap: HAP;
  private accessory: PlatformAccessory;
  private config: PlatformConfig;

  constructor(accessory: PlatformAccessory, config: PlatformConfig, log: Logging, hap: HAP) {
    this.accessory = accessory;
    this.config = config;
    this.log = log;
    this.hap = hap;
  }

  createService(serviceType: ServiceType, name?: string): Service {
    const existingService = name
      ? this.accessory.getServiceById(serviceType, `${this.accessory.displayName} ${name}`)
      : this.accessory.getService(serviceType);

    const service =
      existingService ||
      (name
        ? this.accessory.addService(
            serviceType,
            `${this.accessory.displayName} ${name}`,
            `${this.accessory.displayName} ${name}`,
          )
        : this.accessory.addService(serviceType, this.accessory.displayName));
    return service;
  }

  removeService(serviceType: ServiceType, name?: string): void {
    const existingService = name
      ? this.accessory.getServiceById(serviceType, `${this.accessory.displayName} ${name}`)
      : this.accessory.getService(serviceType);

    if (existingService) {
      this.accessory.removeService(existingService);
    }
  }

  getServicesByType(serviceType: ServiceType): Array<Service> {
    return this.accessory.services.filter((x) => x.UUID === serviceType.UUID);
  }
}
