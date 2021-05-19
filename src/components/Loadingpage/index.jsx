import React from 'react'

import styles from './styles.module.scss'

const Loadingpage = () => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.icon}>
      </div>
      <h1>Buscando asteroides</h1>
    </div>
  )
}

export default Loadingpage
