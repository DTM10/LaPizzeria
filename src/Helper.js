import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

const TAX = 0.13;

const getWeekdDayStr = (day) => {
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
	console.log('sundaySpecial in specialsCheck :', sundaySpecial);
	const invoiceDetails = [...pizzas];
	if (day === 0) {
		let pizzaCount = 0;
		let pizzaPrice = 0;
		invoiceDetails.forEach((pizza) => {
			pizzaCount += pizza.count;
		});
		console.log('pizzaCount: ', pizzaCount);
		if (pizzaCount >= sundaySpecial.minQty) {
			pizzaPrice = sundaySpecial.pricePerPizza;
			console.log('sundaySpecial.pricePerPizza: ', sundaySpecial.pricePerPizza);
		}
		console.log('pizzaPrice', pizzaPrice);
		invoiceDetails.forEach((pizza) => {
			console.log('pizza', pizza);
			pizza.price = pizzaPrice !== 0 ? pizzaPrice : pizza.price;
			pizza.priceDesc = `${getWeekdDayStr(0)} Special`;
			pizza.subTotal = pizza.price * pizza.count;
		});
	} else {
		invoiceDetails.forEach((pizza) => {
			pizza.pizzaDesc = 'Regular';
			if (pizza.specialDay.includes(day)) {
				pizza.price = pizza.specialPrice;
				pizza.priceDesc = `${getWeekdDayStr(day)} Special`;
			}
			pizza.subTotal = pizza.price * pizza.count;
		});
		console.log('invoiceDetails are: ', invoiceDetails);
	}
	return invoiceDetails;
};

export const aggregateItems = (cartItems) => {
	if (cartItems.length > 0) {
		const aggregationMap = cartItems.reduce((acc, item) => {
			if (!acc[item.id]) {
				acc[item.id] = { ...item, count: 1 };
			} else {
				acc[item.id].count += 1;
			}
			return acc;
		}, {});
		return Object.values(aggregationMap);
	}
	return [];
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
