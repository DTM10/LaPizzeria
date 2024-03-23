import React, { useCallback, useContext, useEffect } from 'react';
import styles from './Home.module.scss';
import CarouselCard from '../CarouselCard/CarouselCard';
import { CartContext } from '../../context/CartContext';
import { getSundaySpecial } from '../../Helper';

export function Home() {
  //   const { scheduleWeekDayUpdate, setSundaySpecial } = useContext(CartContext);

  // const getSpecial = useCallback(() => {
  // 	getSundaySpecial()
  // 		.then((res) => {
  // 			setSundaySpecial(res);
  // 		})
  // 		.catch((e) => {
  // 			console.log('Error trying to get special', e);
  // 		});
  // }, [setSundaySpecial]);

  // useEffect(() => {
  // 	scheduleWeekDayUpdate();
  // 	getSpecial();
  // }, [scheduleWeekDayUpdate, getSpecial]);

  return (
    <div className={styles.home}>
      <div className={styles.imgContainer}>
        <CarouselCard />
      </div>
    </div>
  );
}
