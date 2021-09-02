import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IonTextarea} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
	selector: 'app-operator',
	templateUrl: './operator.page.html',
	styleUrls: ['./operator.page.scss'],
})
export class OperatorPage implements OnInit, OnDestroy {

	@ViewChild(IonTextarea) textArea: IonTextarea;
	output: any = '';

	operatorList: string[] = ['creation', 'filter', 'transformation', 'combining', 'conditional', 'mathematical', 'utility', 'error'];

	constructor(private router: Router) {
	}

	goOperatorPage(operator: string) {
		this.router.navigateByUrl(operator, {state: {operator}});
	}

	mapReduceFilterExample() {
		const sandwichIngredient = ['Bread', 'Lettuce', 'Tomato', 'Pepper', 'Cucumber', 'Onion', 'Bacon', 'Cheese'];
		const sandwich = sandwichIngredient
			.map(allIngredient => this.sliceIngredient(allIngredient, 5))
			.filter(eachIngredient => this.filterIngredient(eachIngredient, 'Onion'))
			.reduce((readyIngredient, currentIngredient) => this.makeSandwich(readyIngredient, currentIngredient));
		console.log(sandwich);
	}

	sliceIngredient(ingredient: string, len: number) {
		const numberArray = Array.from({length: len}, (element, numValue) => numValue + 1);
		return numberArray.map(element => ingredient + element);
		// return Array.from({length: len}, (element, numValue) => numValue + 1)
		// 	.map(element => ingredient + element);
	}

	filterIngredient(stringArray: string[], name: string) {
		return !stringArray.every(element => element.includes(name));
	}

	makeSandwich(readyIngredient: string[], currentIngredient: string[]) {
		if (readyIngredient.length !== currentIngredient.length) {
			throw new Error('두 배열의 길이가 일치 하지 않습니다.');
		}
		console.log('이제 까지 reduce 한 값은 : ' + readyIngredient);
		console.log('새로 들어온 값은 : ' + currentIngredient);
		const mergedArray = [];
		for (let i = 0; i < readyIngredient.length; i++) {
			mergedArray[i] = readyIngredient[i] + '+' + currentIngredient[i];
		}
		return mergedArray;
	}

	reduceExample1() {
		const sampleNumberList = [1, 2, 3, 4, 5];
		const reduceResult = sampleNumberList.reduce(this.add, 0);
		console.log(reduceResult);
	}

	reduceExample2() {
		const sampleNumberList = [1, 2, 3, 4, 5];
		const reduceResult = sampleNumberList.reduce(this.multiply, 1);
		console.log(reduceResult);
	}

	add(a, b) {
		return a + b;
	}

	multiply(a, b) {
		return a * b;
	}

	maxValue(a, b) {
		return Math.max(a, b);
	}

	minValue(a, b) {
		return Math.min(a, b);
	}

	ngOnInit() {
	}

	ngOnDestroy(): void {
	}
}
