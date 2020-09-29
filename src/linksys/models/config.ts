import { PlatformConfig } from 'homebridge';

export interface LinksysConfig extends PlatformConfig {
  routerIP: string;
  password: string;
}
