export {};

// 산술, 비교 연산자
let A: number = 20;
let B: number = 10;

console.log('A + B = ' + (A + B));
console.log('A - B = ' + (A - B));
console.log('A * B = ' + (A * B));
console.log('A / B = ' + (A / B));
console.log('A % B = ' + (A % B));

console.log('A > B = ' + (A > B));
console.log('A < B = ' + (A < B));
console.log('A >= B = ' + (A >= B));
console.log('A <= B = ' + (A <= B));
console.log('A == B = ' + (A == B));
console.log('A != B = ' + (A != B));
console.log('A === B = ' + (A === B));
console.log('A !== B = ' + (A !== B));

// 조건 연산자
let A: number = 20;
let B: number = 10;
A < B ? console.log('Go to A') : console.log('Go to B');

// 전개 연산자
let SPACE = ' ';

function buildAddress(houseNumber: number, streetName: string, ...restOfAddress: string[]) {
	return houseNumber + SPACE + streetName + SPACE + restOfAddress.join(SPACE);
}

console.log(buildAddress(110, 'Sejong-daero', 'Myeong-dong', 'Jung-gu', 'Seoul'));

let arrayA: number[] = [1, 2, 3];
console.log([...arrayA, 4, 5]);

let objectA: Object = {a: 1, b: 2, c: 3};
let objectB: Object = {...objectA, d: 4, e: 5};
console.log(objectB);

// 타입 연산자
let stringType: string = 'string type';
console.log(typeof stringType);

class App {
	constructor() {
	}
}

let classA: App = new App();
if (classA instanceof App) {
	console.log('call classA function');
} else {
	console.log('call default class function');
}

// 그 외 연산자
let A: number = 1;
let B: number = 2;

console.log('++A = ' + (++A));
console.log('--A = ' + (--A));
console.log('A & B = ' + (A & B));
console.log('A | B = ' + (A | B));
console.log('A << B = ' + (A << B));
console.log('A >> B = ' + (A >> B));
console.log('A >>> B = ' + (A >>> B));

// 상수
const Person = {
	name: 'Yang Hyun Seok', age: '20'
};
console.log(Person);

Person.name = 'Hayden Yang';
console.log(Person);

// Person = {};

// 조건문
let trafficLight: string = 'Green';

if (trafficLight === 'Green') {
	console.log('Go');
} else if (trafficLight === 'Yellow') {
	console.log('Ready to stop');
} else if (trafficLight === 'Green') {
	console.log('Stop');
} else {	// 그 외에는 아래 명령어를 실행합니다.	console.log('Stop');}

switch (trafficLight) {
	case 'Green': {
		console.log('Go');
		break;
	}
	case 'Yellow': {
		console.log('Ready to stop');
		break;
	}
	case 'Red': {
		console.log('Stop');
		break;
	}
	default: {
		console.log('Stop');
		break;
	}
}

// 반복문, 분기문
let totalCount: number = 0;

for (let number = 0; number <= 10; number++) {
	if (number % 2 === 0) {
		continue;
	}
	console.log(number);
	totalCount++;
}

console.log('0 과 10 사이에 홀수의 갯수는 : ' + totalCount);
