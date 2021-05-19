import React from 'react'

import styles from './styles.module.scss'

const Searchloading = () => {
  return (
    <div className={styles.searchLoadingContainer}>
      <img className={styles.satelite} src="/icons/satelite.png" alt="" />
      <h1>Contatando a NASA</h1>
    </div>
  )
}

export default Searchloading
