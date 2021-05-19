const cutName = (obj) => obj.name.substring(0, 1) === "(" ? obj.name.slice(1, -1) : obj.name

const cutDiameterMin = (obj) => {
  const diameterMin = 
    String(obj.estimated_diameter.kilometers.estimated_diameter_min)
      .split('')
      .indexOf('.')
  return (String(obj.estimated_diameter.kilometers.estimated_diameter_min)
    .slice(0, diameterMin + 4))
}

const cutDiameterMax = (obj) => {
  const diameterMax = 
    String(obj.estimated_diameter.kilometers.estimated_diameter_max)
      .split('')
      .indexOf('.')
  return (String(obj.estimated_diameter.kilometers.estimated_diameter_max)
    .slice(0, diameterMax + 4))
}

const cutDistanceFromEarth = (obj) => {
  const distanceFromEarth = 
    String(obj.close_approach_data[0].miss_distance.kilometers)
    .split('')
    .indexOf('.')
  return (String(obj.close_approach_data[0].miss_distance.kilometers)
  .slice(0, distanceFromEarth))
}

export {
  cutName,
  cutDiameterMin,
  cutDiameterMax,
  cutDistanceFromEarth
}