import React from 'react'

import styles from './styles.module.scss'

const Presentation = () => {
  return (
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
  )
}

export default Presentation
