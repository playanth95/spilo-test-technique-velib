import { IVelibStationFields, NewVelibStationFields } from './velib-station-fields.model';

export const sampleWithRequiredData: IVelibStationFields = {
  id: 86649,
};

export const sampleWithPartialData: IVelibStationFields = {
  id: 24626,
  name: '1080p Fish Decentralized',
  stationcode: 'Small',
  ebike: 33705,
  numbikesavailable: 53055,
  numdocksavailable: 8960,
  capacity: 39992,
};

export const sampleWithFullData: IVelibStationFields = {
  id: 9377,
  name: 'Intelligent sensor',
  stationcode: 'GB',
  ebike: 98308,
  mechanical: 66700,
  coordonneesGeo: 56628,
  numbikesavailable: 91286,
  numdocksavailable: 92922,
  capacity: 42104,
  isRenting: 'efficient XSS Soft',
  isInstalled: 'gold grow Consultant',
  nomArrondissementCommunes: 'Small utilize Lepic',
  isReturning: 'application',
};

export const sampleWithNewData: NewVelibStationFields = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
