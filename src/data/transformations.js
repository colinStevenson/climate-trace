export const getDataByCountry = data => {
  const value = {}
      data.forEach(d => {
       value[d.country] = value[d.country] || {
         name: d.country_full,
         code: d.country,
         data: []
       }
       value[d.country].data.push(d)
    })
    return value
}

export const getCountriesFromData = dataByCountry => {
  return Object.values(dataByCountry).map(d => {
    return {
      name: d.name,
      code: d.code
    }
  })
}

export const getSectors = data => {
  const sectors = {}
  data.forEach(d => {
    sectors[d.sector] = true
  })
  return Object.keys(sectors)
}
