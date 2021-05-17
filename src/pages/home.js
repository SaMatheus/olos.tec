import React from 'react'

// STYLES
import styles from '../styles/pages/Home.module.scss'

// ICONS
import { RiMouseLine } from "react-icons/ri";
import { BiSearchAlt } from "react-icons/bi";

// HOOKS
import {useState, useEffect, useMemo} from 'react'

// REQUEST
import { api, apiKey } from '../services/api'

// HANDLE DATES
import { handleDate } from '../utils/handleDate'


const Home = () => {
  const [asteroidsArray, setAsteroidsArray] =useState([])
  const [searchName, setSearchName] = useState('')
  const [initialDate, setInitialDate] = useState('')
  const [finalDate, setFinalDate] = useState('')

  let maxFinalDateRange = initialDate && `${initialDate.slice(0, 8)}${Number(initialDate.slice(-2)) + 6}`

  useEffect(() => {
    const { startDate, endDate } = handleDate()
    getNasaApi(startDate, endDate)
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

  const getNasaApi = async(startDate, endDate) => {
    await api
      .get(`feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`)
      .then((response) => {
        mergeAsteroidsByMultipleDays(response.data.near_earth_objects)
      })
      .catch((error) => console.log(error))
  }

  const searchingFilteredNames = useMemo(() => {
    const lowerSearchName = searchName.toLowerCase()

    return asteroidsArray.filter((asteroidName) => {
      const name = asteroidName.name
      return name.toLowerCase().includes(lowerSearchName)
    })
  }, [searchName])

  const showArray = () => {
    return searchName ? searchingFilteredNames : asteroidsArray
  }

  const clearDateFields = () => {
    setInitialDate('')
    setFinalDate('')
  }

  return (
    <>
      <div className={styles.mainContainer}>
        {asteroidsArray.length ? (
          <div className={styles.listingContainer}>
            <div className={styles.filterContainer}>
              <label className={styles.searchName}>
                <input type="text" value={searchName} onChange={(event) => setSearchName(event.target.value) } placeholder="Ache um asteroide pelo nome"/>
                <BiSearchAlt />
              </label>
              <h3>Busque pela data</h3>
              <div className={styles.datePicker} >
                <label>
                  <p>Data Inicial</p>
                  <input type="date" value={initialDate} min={initialDate} required onChange={(event) => setInitialDate(event.target.value)}/>
                </label>
                <label>
                  <p>Data Final</p>
                  <input type="date" value={finalDate} min={initialDate} max={maxFinalDateRange} onChange={(event) => setFinalDate(event.target.value)}/>
                </label>
              </div>
              {initialDate && <h6>A data final deve ser até 7 dias após a data inicial.</h6>}
              <div className={styles.buttons}>
                <button className={styles.clearButton} onClick={() => clearDateFields()}>Limpar</button>
                <button type="submit" className={styles.searchButton} onClick={() => getNasaApi(initialDate, finalDate)}>Buscar</button>
              </div>
            </div>
            <div className={styles.table}>
              <RiMouseLine />
              <table cellSpacing="0">
                <thead>
                  <tr>
                    <th rowSpan="2">Nome</th>
                    <th colSpan="2">Diametro estimado (km)</th>
                    <th rowSpan="2">Distancia da Terra</th>
                    <th></th>
                  </tr>
                  <tr>
                  </tr>
                  <tr>
                    <th>
                      <span>Encontrados: <strong>{showArray().length} </strong></span>
                    </th>
                    <th>Min</th>
                    <th>Max</th>
                    <th colSpan="2"></th>
                  </tr>
                </thead>
                <tbody>
                {showArray().map((obj, index) => {
                  return (
                      <tr key={index}>
                        <td>
                          <p>
                            {obj.name.substring(0, 1) === "(" ? obj.name.slice(1, -1) : obj.name}
                          </p>
                        </td>
                        <td>
                          <span>
                            {obj.estimated_diameter.meters.estimated_diameter_min}
                          </span>
                        </td>
                        <td>
                          <span>
                            {obj.estimated_diameter.meters.estimated_diameter_max}
                          </span>
                        </td>
                        <td>
                          <p>{obj.close_approach_data[0].miss_distance.kilometers} <strong>Km</strong></p>
                        </td>
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
    </>
  )
}



export default Home
