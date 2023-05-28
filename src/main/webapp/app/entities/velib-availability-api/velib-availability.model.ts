export class VelibAvailabilityApiResponse {
  nhits?: number
  parameters?: Parameters
  records?: Record[]
  facet_groups?: FacetGroup[]
}

export class Parameters {
  dataset?: string
  rows?: number
  start?: number
  facet?: string[]
  format?: string
  timezone?: string
}

export class Record {
  datasetid?: string
  recordid?: string
  fields?: Field
  geometry?: Geometry
  record_timestamp?: string
}

export class Field {
  name?: string
  stationcode?: string
  ebike?: number
  mechanical?: number
  coordonnees_geo?: number[]
  duedate?: string
  numbikesavailable?: number
  numdocksavailable?: number
  capacity?: number
  is_renting?: string
  is_installed?: string
  nom_arrondissement_communes?: string
  is_returning?: string
  dist?: string
}

export class Geometry {
  type?: string
  coordinates?: number[]
}

export class FacetGroup {
  name?: string
  facets?: any[]
}
