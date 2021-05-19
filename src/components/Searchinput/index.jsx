import React from 'react'

import styles from './styles.module.scss'
import { BiSearchAlt } from "react-icons/bi";

const Searchinput = (props) => {
  return (
    <label className={styles.searchName}>
      <input 
        type="text" 
        value={props.value} 
        onChange={props.onChange} 
        placeholder={props.placeholder}/>
      <BiSearchAlt />
    </label>
  )
}

export default Searchinput
