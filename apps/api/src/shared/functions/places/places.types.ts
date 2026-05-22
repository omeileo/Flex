export interface AirportLocation {
  country: LocationCountry
  city: LocationCity
  airport: LocationAirport
}

export interface LocationCountry {
  name: string
  code: string
}

export interface LocationCity {
  name: string
  iataCode: string
}

export interface LocationAirport {
  name: string
  iataCode: string
}
