import React, { useCallback, useContext, useEffect } from 'react';
import styles from '../styles/home.module.css';
import { CartContext } from '../context/CartContext';
import { getSundaySpecial } from '../Helper';

export function Home() {
	const { scheduleWeekDayUpdate, setSundaySpecial } = useContext(CartContext);

	const getSpecial = useCallback(() => {
		getSundaySpecial()
			.then((res) => {
				setSundaySpecial(res);
			})
			.catch((e) => {
				console.log('Error trying to get special', e);
			});
	}, [setSundaySpecial]);

	useEffect(() => {
		scheduleWeekDayUpdate();
		getSpecial();
	}, [scheduleWeekDayUpdate, getSpecial]);

	return (
		<div className={styles.home}>
			<div className={styles.imgContainer}>
				<img
					src={'/images/Promo.png'}
					alt="promo-two-pizzas-for-20-dollars"
					className={styles.img}
				/>
			</div>
		</div>
	);
}
