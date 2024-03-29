import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const TAX = 0.13;

export const getWeekDayStr = (day) => {
	const weekdayStrArray = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];
	return weekdayStrArray[day];
};

export const getSundaySpecial = async () => {
	try {
		const docRef = doc(db, 'QtySpecial', 'SundaySpecial');
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			return docSnap.data();
		} else {
			console.log('No such document!');
		}
	} catch {
		console.log('error trying to get Sunday special');
	}
};


export const specialsCheck = (day, pizzas, sundaySpecial) => {
	const invoiceDetails = [...pizzas];
	if (day === 0) {
		let pizzaCount = 0;
		invoiceDetails.forEach((pizza) => {
			pizzaCount += pizza.count;
		});
		invoiceDetails.forEach((pizza) => {
			pizza.price = pizzaCount >= sundaySpecial.minQty ? sundaySpecial.pricePerPizza : pizza.regularPrice;
			pizza.pizzaDesc = pizzaCount >= sundaySpecial.minQty ? `${getWeekDayStr(0)} Special` : 'Regular';
			pizza.subTotal = pizza.price * pizza.count;
		});
	} else {
		invoiceDetails.forEach((pizza) => {
			pizza.pizzaDesc = 'Regular';
			if (pizza.specialDay.includes(day)) {
				pizza.price = pizza.specialPrice;
				pizza.pizzaDesc = `${getWeekDayStr(day)} Special`;
			}
			pizza.subTotal = pizza.price * pizza.count;
		});
	}
	return invoiceDetails;
};

export const calculateTotal = (organizedPizzas) => {
	let totalBTax = 0;
	organizedPizzas.forEach((i) => {
		totalBTax += i.subTotal;
	});
	const tax = totalBTax * TAX;
	const grandTotal = Math.round((totalBTax + tax) * 100) / 100;
	return { totalBTax: totalBTax, tax: tax, grandTotal: grandTotal };
};

export const formatCurrency = (num) => {
	const formatter = new Intl.NumberFormat('en-CA', {
		style: 'currency',
		currency: 'CAD'
	});
	return formatter.format(num);
};

export const canadianProvincesTerritoriesInitials = [
    'AB', // Alberta
    'BC', // British Columbia
    'MB', // Manitoba
    'NB', // New Brunswick
    'NL', // Newfoundland and Labrador
    'NS', // Nova Scotia
    'NT', // Northwest Territories
    'NU', // Nunavut
    'ON', // Ontario
    'PE', // Prince Edward Island
    'QC', // Quebec
    'SK', // Saskatchewan
    'YT', // Yukon
  ];

  const dateNumberToString = (n) => {
	  let str = n.toString();
	  if (str.length === 1) {
		str = '0' + str;
	  }
	  return str
  }

  const formatHours = (h, m) => {
	const isAfterNoon = h > 12;
	const period = isAfterNoon ? 'PM' : 'AM'
	const hourNum = isAfterNoon ? h - 12 : h;
	return `${dateNumberToString(hourNum)}: ${dateNumberToString(m)} ${period}`;
  }

  export const getFormattedDate = (timestamp) => {
	  const date = new Date(timestamp);
	  const year = date.getFullYear();
	  const month = dateNumberToString(date.getMonth() + 1);
	  const day = dateNumberToString(date.getDate());
	  const time = formatHours(date.getHours(), date.getMinutes());
	  const formattedDate = `${year}-${month}-${day} at ${time}`;


	return formattedDate
  }

  export const formatStatusStr = (str) => {
	if (str === 'pending') {
		return 'Pending'
	}
	if (str === 'fordeliver') {
		return 'For Deliver'
	}
	if (str === 'delivered') {
		return 'Delivered'
	}
  }



