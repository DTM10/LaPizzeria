import React from 'react';
import styles from '../styles/home.module.css';
import Header from './Header';

export function Login() {
	return (
		<div className={styles.home}>
			<div>
				<Header />
				<h1>I am the Login</h1>
			</div>
		</div>
	);
}
