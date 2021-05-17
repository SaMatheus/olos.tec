import React from 'react'

// STYLES
import styles from '../styles/components/Button.module.scss'

const Button = (props) => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  )
}

export default Button
