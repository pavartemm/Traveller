export type CityType = {
  id: number
  name: string
  country: string
  visited: boolean
  wishlist: boolean
}

export type CititesDataType = {
  cities: {
    total: number
    cities: CityType[]
  }
}
