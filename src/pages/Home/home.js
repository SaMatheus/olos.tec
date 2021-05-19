import React from 'react'

// STYLES
import styles from './Home.module.scss'

// ICONS
import { RiMouseLine } from "react-icons/ri";
import { BiSearchAlt } from "react-icons/bi";

// HOOKS
import {useState, useEffect, useMemo} from 'react'

// REQUEST
import request from '../../services/requestApi'

// HANDLE DATES
import { handleDate } from './utils/handleDate'

// HANDLE CUT DATA
import { 
  cutName,
  cutDiameterMin,
  cutDiameterMax,
  cutDistanceFromEarth } from './utils/handleCutData'

// COMPONENTS
import Button from '../../components/Button'
import Presentation from '../../components/Presentation'
import Searchloading from '../../components/Searchloading'
import Searchinput from '../../components/Searchinput'
import Datepicker from '../../components/Datepicker'
import Loadingpage from '../../components/Loadingpage'


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
    let asteroidsArr = Object.keys(asteroidByDays).map(obj => asteroidByDays[obj])

    const mergeAsteroids = [].concat.apply([], asteroidsArr).reverse()
    setAsteroidsArray(mergeAsteroids)
  }

  const getNasaApi = async(startDate, endDate) => {
    setIsSearchLoading(true)
    const json = await request.getAsteroids(startDate, endDate)
    await setIsSearchLoading(false)
    await mergeAsteroidsByMultipleDays(json)
  }

  const searchingFilteredNames = useMemo(() => {
    const lowerSearchName = searchName.toLowerCase()

    return asteroidsArray.filter((asteroidName) => {
      const name = asteroidName.name
      return name.toLowerCase().includes(lowerSearchName)
    })
  }, [searchName])

  const showArray = () => searchName ? searchingFilteredNames : asteroidsArray

  const hazardousText = "Esse asteroide é potencialmente um perigo para a terra!" 

  return (
    <>
      <div className={styles.mainContainer}>
        {asteroidsArray.length ? (
          <div>
            <div className={styles.headerContainer}>
              {isSearchLoading && <Searchloading />}
              <Presentation />
              <div className={styles.filterContainer}>
               <Searchinput 
                value={searchName}
                onChange={(event) => setSearchName(event.target.value)}
                placeholder="Busque aqui por um asteroide pelo nome"
              />
              <h3>Busque pela data</h3>
              <Datepicker 
                dataInicialMax={inputEndtDate} 
                dataInicialOnChange={(event) => setInitialDate(event.target.value)}
                dataFinalMin={initialDate}
                dataFinalMax={inputEndtDate}
                dataFinalOnChange={(event) => setFinalDate(event.target.value)}
                dataFinalDisabled={!initialDate}
              />
              {initialDate
                ? <h6>A data final deve ser até 7 dias após a data inicial.</h6> 
                : <h6>A busca inicial é feita a partir da sua data atual.</h6>}
              <div className={styles.buttons}>
                <Button onClick={() => {
                  setInitialDate("")
                  setFinalDate("")
                }}>Limpar</Button>
                <Button 
                  onClick={() => getNasaApi(initialDate, finalDate)}
                  disabled={finalDate.slice(-2) - initialDate.slice(-2) > 7 }>Buscar</Button>
              </div>
            </div>
            </div>
            <div className={styles.tableContainer}>
              <RiMouseLine />
              <table cellSpacing="0">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th colSpan="2">Diametro estimado</th>
                    <th>Distancia da Terra</th>
                    <th></th>
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
                            {cutName(obj)}
                          </p>
                        </td>
                        <td>
                          <span>
                            {cutDiameterMin(obj)} <strong>Km</strong>
                          </span>
                        </td>
                        <td>
                          <span>
                            {cutDiameterMax(obj)} <strong>Km</strong>
                          </span>
                        </td>
                        <td>
                          <p>{cutDistanceFromEarth(obj)} <strong>Km</strong></p>
                        </td>
                        <td>
                          {/* COMPOENTENTIZAR */}
                        { obj.is_potentially_hazardous_asteroid && ( 
                          <div 
                            onMouseEnter={() => setIsHazardousTextIndex(index)}
                            onMouseLeave={() => setIsHazardousTextIndex(null)}
                          >
                            <img 
                              src="icons/warn.svg" 
                              alt="Asteroide perigoso" 
                            />
                            {isHazardousTextIndex === index && 
                            <div className={styles.hazardousText}>
                              <p>
                                {hazardousText}
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
        ) : ( <Loadingpage /> )}
      </div>
    </>
  )
}



export default Home
