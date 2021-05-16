import React from 'react'

// STYLES
import styles from '../styles/pages/Home.module.scss'

// ICONS
import { RiMouseLine } from "react-icons/ri";

// HOOKS
import {useState, useEffect} from 'react'

// REQUEST
import { api, apiKey } from '../services/api'

// HANDLE DATES
import { handleDate } from '../utils/handleDate'

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
    setAsteroidsArray(mergeAsteroids.reverse())
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

  return (
    <>
    <div className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        {asteroidsArray && asteroidsArray.length ? (
          <div className={styles.listingContainer}>
            <h1>Asteroides mais recentes</h1>
            <div className={styles.tableContainer}>
              <RiMouseLine />
              <table cellSpacing="0">
                <thead>
                  <tr>
                    <th rowSpan="2">Nome</th>
                    <th colSpan="2">Diametro estimado(km)</th>
                    <th rowSpan="2">Distancia da Terra</th>
                    <th></th>
                  </tr>
                  <tr>
                  </tr>
                  <tr>
                    <th></th>
                    <th>Min</th>
                    <th>Max</th>
                    <th colSpan="2"></th>
                  </tr>
                </thead>
                <tbody className={styles.tBody}>
                {asteroidsArray.map((obj, index) => {
                  return (
                      <tr key={index}>
                        <td><p>{obj.name}</p></td>
                        <td>
                            <span>
                              {obj.estimated_diameter.kilometers.estimated_diameter_min} km
                            </span>
                        </td>
                        <td>
                            <span>
                              {obj.estimated_diameter.kilometers.estimated_diameter_max} km
                            </span>
                        </td>
                        <td><p>{obj.close_approach_data[0].miss_distance.kilometers}</p></td>
                        <td>{ obj.is_potentially_hazardous_asteroid && <img src="icons/warn.svg" alt="Asteroide perigoso" />}</td>
                      </tr>
                  )
                })}
                </tbody>
              </table>
            </div>
          </div>
        ) : <h1>Carregando dados...</h1>}
      </div>
    </div>
    </>
  )
}



export default Home
