import React from 'react';
import styles from '../styles/home.module.css';
import Header from './Header';

export function Tracker() {
	return (
		<div className={styles.home}>
			<div>
				<Header />
				<h1>I am the Tracker</h1>
			</div>
		</div>
	);
}
