const regularPrice = 14;
const discountedPrice = 11;
const TAX = 0.13;

export const specialsCheck = (day, pizzas) => {
	let invoiceDetails = [];
	if (day === 0) {
		let totalNumOfPizzas = 0;
		pizzas.forEach((pizza) => {
			totalNumOfPizzas += pizza.count;
		});
		console.log('total number of pizzas is: ', totalNumOfPizzas);
	} else {
		switch (day) {
			case 1:
				pizzas.forEach((pizza) => {
					const price =
						pizza.title === 'Quattro Formaggi' ? discountedPrice : regularPrice;
					const priceDesc =
						pizza.title === 'Quattro Formaggi' ? 'Monday Special' : 'Regular';
					const subTotal = pizza.count * price;
					invoiceDetails.push({
						qty: pizza.count,
						title: pizza.title,
						subTotal: subTotal,
						priceDesc: priceDesc,
						id: pizza.id
					});
				});
				break;
			case 2:
				pizzas.forEach((pizza) => {
					const price =
						pizza.title === 'Margherita' ? discountedPrice : regularPrice;
					const priceDesc =
						pizza.title === 'Margherita' ? 'Tuesday Special' : 'Regular';
					const subTotal = pizza.count * price;
					invoiceDetails.push({
						qty: pizza.count,
						title: pizza.title,
						subTotal: subTotal,
						priceDesc: priceDesc,
						id: pizza.id
					});
				});
				break;
			case 3:
				pizzas.forEach((pizza) => {
					const price =
						pizza.title === 'Bianca' ? discountedPrice : regularPrice;
					const priceDesc =
						pizza.title === 'Bianca' ? 'Wednesday Special' : 'Regular';
					const subTotal = pizza.count * price;
					invoiceDetails.push({
						qty: pizza.count,
						title: pizza.title,
						subTotal: subTotal,
						priceDesc: priceDesc,
						id: pizza.id
					});
				});
				break;
			case 4:
				pizzas.forEach((pizza) => {
					const price =
						pizza.title === 'Marinara' ? discountedPrice : regularPrice;
					const priceDesc =
						pizza.title === 'Marinara' ? 'Thursday Special' : 'Regular';
					const subTotal = pizza.count * price;
					invoiceDetails.push({
						qty: pizza.count,
						title: pizza.title,
						subTotal: subTotal,
						priceDesc: priceDesc,
						id: pizza.id
					});
				});
				break;
			case 5:
				pizzas.forEach((pizza) => {
					const price =
						pizza.title === 'Anchovies' ? discountedPrice : regularPrice;
					const priceDesc =
						pizza.title === 'Anchovies' ? 'Friday Special' : 'Regular';
					const subTotal = pizza.count * price;
					invoiceDetails.push({
						qty: pizza.count,
						title: pizza.title,
						subTotal: subTotal,
						priceDesc: priceDesc,
						id: pizza.id
					});
				});
				break;
			case 6:
				pizzas.maforEach((pizza) => {
					const price =
						pizza.title === 'Salsiccia' ? discountedPrice : regularPrice;
					const priceDesc =
						pizza.title === 'Anchovies' ? 'Saturday Special' : 'Regular';
					const subTotal = pizza.count * price;
					invoiceDetails.push({
						qty: pizza.count,
						title: pizza.title,
						subTotal: subTotal,
						priceDesc: priceDesc,
						id: pizza.id
					});
				});
				break;

			default:
				break;
		}
	}
	return invoiceDetails;
};

export const calculateTotal = (invoiceDetails, tip) => {
	let totalBTax = 0;

	invoiceDetails.forEach((i) => {
		totalBTax += i.subTotal;
	});

	const tax = totalBTax * TAX;

	const grandTotal = totalBTax + tax + tip;

	// RETURN VALUES AS A STRING AND FORMATTED

	return { totalBTax: totalBTax, tax: tax, tip: tip, grandTotal: grandTotal };
};
