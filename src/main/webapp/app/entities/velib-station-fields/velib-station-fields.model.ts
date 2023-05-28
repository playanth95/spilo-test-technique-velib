export interface IVelibStationFields {
  id: number;
  name?: string | null;
  stationcode?: string | null;
  ebike?: number | null;
  mechanical?: number | null;
  coordonneesGeo?: number | null;
  numbikesavailable?: number | null;
  numdocksavailable?: number | null;
  capacity?: number | null;
  isRenting?: string | null;
  isInstalled?: string | null;
  nomArrondissementCommunes?: string | null;
  isReturning?: string | null;
}

export type NewVelibStationFields = Omit<IVelibStationFields, 'id'> & { id: null };
