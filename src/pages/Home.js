import React from 'react'

// HOOKS
import {useState, useEffect} from 'react'

// REQUEST
import { api, apiKey } from '../../services/api'

// HANDLE DATES
import { handleDate } from '../../utils/handleDate'

const Home = () => {
  const [asteroidsArray, setAsteroidsArray] =useState([])

  useEffect(() => {
    getNasaApi()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const mergeAsteroidsByMultipleDays = (asteroidByDays) => {
    let asteroidsArr = []
    let keys = Object.keys(asteroidByDays)

    for(let i =0; i < keys.length; i++) {
      asteroidsArr.push(asteroidByDays[keys[i]])
    }

    const mergeAsteroids = [].concat.apply([], asteroidsArr)
    setAsteroidsArray(mergeAsteroids)
  }

  const getNasaApi = async() => {
    const { startDate, endDate } = handleDate()

    await api
      .get(`feed?start_date=${endDate}&end_date=${startDate}&api_key=${apiKey}`)
      .then((response) => {
        mergeAsteroidsByMultipleDays(response.data.near_earth_objects)
      })
      .catch((error) => console.log(error))
  }

  console.log(asteroidsArray)

  if(asteroidsArray) {
    return (
      <>
        <h1>Lista de asteroides</h1>
        <ul>
          <li>
            <p>Nome</p>
            <span>Diametro Min</span>
            <span>Diametro Max</span>
            <p>Distancia que passou da terra</p>
          </li>
          {/* {asteroidsArray.map((item) => {
            return (
              <li>{item.name}</li>
            )
          })} */}
        </ul>
      </>
      )
  } else {
    return (
      <h1>Carregando dados</h1>
    )
  }
}



export default Home
