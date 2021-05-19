import React from 'react'

import styles from './styles.module.scss'

const Datepicker = (props) => {
  return (
    <div className={styles.datePicker} >
      <label>
        <p>Data Inicial</p>
        <input 
          type="date" 
          max={props.dataInicialMax}
          onChange={props.dataInicialOnChange}
        />
      </label>
      <label>
        <p>Data Final</p>
        <input 
          type="date" 
          min={props.dataFinalMin} 
          max={props.dataFinalMax}
          onChange={props.dataFinalOnChange}
          disabled={props.dataFinalDisabled}
        />
      </label>
    </div>
  )
}

export default Datepicker
