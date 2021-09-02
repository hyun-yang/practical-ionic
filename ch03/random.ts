let RXJS_OPERATOR = ['filter', 'map', 'reduce', 'pipe', 'take', 'merge'];

function getRandomRxJSOperator() {
	return RXJS_OPERATOR[Math.floor(Math.random() * (RXJS_OPERATOR.length))];
}

console.log(getRandomRxJSOperator());
