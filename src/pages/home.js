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

// COMPONENTS
import Button from '../components/Button'


const Home = () => {
  const [asteroidsArray, setAsteroidsArray] =useState([])
  const [searchName, setSearchName] = useState('')
  const [initialDate, setInitialDate] = useState('')
  const [finalDate, setFinalDate] = useState('')
  const [isHazardousTextIndex, setIsHazardousTextIndex] = useState(null)
  const [inputEndtDate, setInputEndtDate] = useState()
  const [isSearchLoading, setIsSearchLoading] = useState(false)

  useEffect(() => {
    const { startDate, endDate } = handleDate()
    setInputEndtDate(endDate)
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
    setIsSearchLoading(true)
    await api
      .get(`feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`)
      .then((response) => {
        setIsSearchLoading(false)
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

  const cutDiameterMin = (index) => {
    const diameterMin = 
      String(asteroidsArray[index].estimated_diameter.kilometers.estimated_diameter_min).split('').indexOf('.')
    return (String(asteroidsArray[index].estimated_diameter.kilometers.estimated_diameter_min).slice(0, diameterMin + 4))
  }

  const cutDiameterMax = (index) => {
    const diameterMax = 
      String(asteroidsArray[index].estimated_diameter.kilometers.estimated_diameter_max).split('').indexOf('.')
    return (String(asteroidsArray[index].estimated_diameter.kilometers.estimated_diameter_max).slice(0, diameterMax + 4))
  }

  const cutDistanceFromEarth = (index) => {
    const distanceFromEarth = 
      String(asteroidsArray[index].close_approach_data[0].miss_distance.kilometers).split('').indexOf('.')
    return (String(asteroidsArray[index].close_approach_data[0].miss_distance.kilometers).slice(0, distanceFromEarth))
  }

  return (
    <>
      <div className={styles.mainContainer}>
        {asteroidsArray.length ? (
          <div>
            <div className={styles.headerContainer}>
              {isSearchLoading && 
                <div className={styles.searchLoadingContainer}>
                  <img className={styles.satelite} src="/icons/satelite.png" alt="" />
                  <h1>Contatando a NASA</h1>
                </div>
              }
              <div className={styles.presentationContainer}>
                <img className={styles.earth} src="icons/earth.png" alt="" />
                <img className={styles.logo} src="icons/logo.png" alt="" />

                {/* STARS */}
                <img className={`${styles.star1} ${styles.star}`} src="icons/star.png" alt="" />
                <img className={`${styles.star2} ${styles.star}`} src="icons/star.png" alt="" />
                <img className={`${styles.star3} ${styles.star}`} src="icons/star.png" alt="" />
                <img className={`${styles.star4} ${styles.star}`} src="icons/star.png" alt="" />
                <img className={`${styles.star5} ${styles.star}`} src="icons/star.png" alt="" />
                <img className={`${styles.star6} ${styles.star}`} src="icons/star.png" alt="" />
                <img className={`${styles.star7} ${styles.star}`} src="icons/star.png" alt="" />
                <img className={`${styles.star8} ${styles.star}`} src="icons/star.png" alt="" />
                <img className={`${styles.star9} ${styles.star}`} src="icons/star.png" alt="" />

                {/* ASTEROIDS */}
                <img className={`${styles.asteroid1} ${styles.asteroid}`} src="icons/asteroid.png" alt="" />
                <img className={`${styles.asteroid2} ${styles.asteroid}`} src="icons/asteroid2.png" alt="" />
                <img className={`${styles.asteroid3} ${styles.asteroid}`} src="icons/asteroid3.png" alt="" />
              </div>
              <div className={styles.filterContainer}>
              <label className={styles.searchName}>
                <input 
                  type="text" 
                  value={searchName} 
                  onChange={(event) => setSearchName(event.target.value) } 
                  placeholder="Busque aqui por um asteroide pelo nome"/>
                <BiSearchAlt />
              </label>
              <h3>Busque pela data</h3>
              <div className={styles.datePicker} >
                <label>
                  <p>Data Inicial</p>
                  <input 
                    type="date" 
                    max={inputEndtDate } 
                    onChange={(event) => setInitialDate(event.target.value)}
                  />
                </label>
                <label>
                  <p>Data Final</p>
                  <input 
                    type="date" 
                    min={initialDate} 
                    max={inputEndtDate} 
                    onChange={(event) => setFinalDate(event.target.value)}
                    disabled={!initialDate && true}
                  />
                </label>
              </div>
              {initialDate
                ? <h6>A data final deve ser até 7 dias após a data inicial.</h6> 
                : <h6>A busca inicial é feita a partir da sua data atual.</h6>}
              <div className={styles.buttons}>
                <Button onClick={() => {
                  setInitialDate(null)
                  setFinalDate(null)
                }}>Limpar</Button>
                <Button onClick={() => getNasaApi(initialDate, finalDate)}>Buscar</Button>
              </div>
            </div>
            </div>
            <div className={styles.tableContainer}>
              <RiMouseLine />
              <table cellSpacing="0">
                <thead>
                  <tr>
                    <th rowSpan="2">Nome</th>
                    <th colSpan="2">Diametro estimado</th>
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
                            {cutDiameterMin(index)} <strong>Km</strong>
                          </span>
                        </td>
                        <td>
                          <span>
                            {cutDiameterMax(index)} <strong>Km</strong>
                          </span>
                        </td>
                        <td>
                          <p>{cutDistanceFromEarth(index)} <strong>Km</strong></p>
                        </td>
                        <td>
                        { obj.is_potentially_hazardous_asteroid && ( 
                          <div 
                          onMouseEnter={() => setIsHazardousTextIndex(index)} 
                          onMouseLeave={() => setIsHazardousTextIndex(null)} >
                            <img 
                              src="icons/warn.svg" 
                              alt="Asteroide perigoso" 
                            />
                            {isHazardousTextIndex === index && 
                            <div className={styles.hazardousText}>
                              <p>
                                Esse asteroide é potencialmente um perigo para a terra!
                                <img src="icons/scared.png" alt="Medo" />
                              </p>
                            </div>}
                          </div>
                        )}
                        </td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className={styles.loadingContainer}>
            <div className={styles.icon}>
            </div>
            <h1>Buscando asteroides</h1>
          </div>
        )}
      </div>
    </>
  )
}



export default Home
