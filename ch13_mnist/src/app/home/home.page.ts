import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UtilService} from '../services/util.service';
import {DropDownSelect} from './DropDownSelect';
import {Label} from './Label';
import * as tf from '@tensorflow/tfjs';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	selectedModel: any;
	pretrainedModelList: DropDownSelect[] = [];

	selectedDataSet: string;
	testDataSetDropDownSelect: DropDownSelect[] = [];

	preTrainedModel: tf.LayersModel;
	PRE_TRAINED_MODEL_JSON = 'assets/keras/model.json';

	scorecard: any = [];
	accuracyResult: string;
	predictResultLabelList: Label[] = [];

	constructor(private httpClient: HttpClient,
							private utilService: UtilService) {

		this.testDataSetDropDownSelect = [
			{id: 'Test10', value: 'assets/dataset/mnist_test_10.csv'},
			{id: 'Test30', value: 'assets/dataset/mnist_test_30.csv'},
			{id: 'Test50', value: 'assets/dataset/mnist_test_50.csv'},
			{id: 'Test100', value: 'assets/dataset/mnist_test_100.csv'}
		];

		this.pretrainedModelList = [
			{id: 'Keras', value: 'keras'}
		];

		this.loadPretrainedModel();
	}

	async loadPretrainedModel() {
		await this.utilService.showLoading('모델 로딩 중...');
		tf.loadLayersModel(this.PRE_TRAINED_MODEL_JSON)
			.then(async (result) => {
				this.utilService.dismissLoading();
				this.utilService.showAlert('모델 로딩 성공', '학습된 모델 사용 가능합니다');
				this.preTrainedModel = result;
			})
			.catch(async (error) => {
				this.utilService.dismissLoading();
				this.utilService.showAlert('에러', error.message);
			});
	}

	async testPreTrainedModel() {
		this.predictResultLabelList = [];
		await this.utilService.showLoading('숫자 예측 중...');
		this.httpClient.get(this.selectedDataSet, {responseType: 'text'})
			.subscribe((file) => {
				this.predict(this.makeTestTensor(this.parseCSVFile(file)));
				this.utilService.dismissLoading();
			}, async (error) => {
				this.utilService.showAlert('에러', '파일 로딩 실패');
				this.utilService.dismissLoading();
			});
	}

	makeTestTensor(csvData) {
		const testArray = [];
		const labelArray = [];
		for (const numberData of csvData) {
			const labelTensorR2 = this.makeLabelTensor(numberData[0]);
			labelArray.push(labelTensorR2);
			const testTensorR2 = this.makeTargetTensor(numberData.slice(1));
			testArray.push(testTensorR2);
		}
		return [labelArray, testArray];
	}

	parseCSVFile(csvString): any {
		const result = [];
		let row = 0;
		let col = 0;

		for (let i = 0; i < csvString.length; i++) {
			const currentChar = csvString[i];
			result[row] = result[row] || [];
			result[row][col] = result[row][col] || '';

			if (currentChar === ',') {
				++col;
				continue;
			}

			if (currentChar === '\n') {
				++row;
				col = 0;
				continue;
			}
			result[row][col] += currentChar;
		}
		return result.map(a => a.map(Number));
	}

	makeTargetTensor(arrayData) {
		return tf.tensor1d(arrayData).div(tf.scalar(255.0)).mul(tf.scalar(0.99)).add(tf.scalar(0.01)).expandDims(0);
	}

	makeLabelTensor(labelData) {
		const defaultTargetValue = [0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01];
		const tb = new tf.TensorBuffer([10], 'float32', Float32Array.from(defaultTargetValue));
		tb.set(0.99, labelData);
		return tb.toTensor().expandDims(0);
	}

	predict(testingDataSet) {
		const labelArray = testingDataSet[0];
		const testArray = testingDataSet[1];

		this.scorecard = [];
		for (let i = 0; i < testArray.length; i++) {
			const correctTensor = labelArray[i] as tf.Tensor;
			const correctLabel = correctTensor.argMax(1).dataSync()[0];

			let predictedTensor: tf.Tensor;
			let predictedLabel: any;

			if (this.selectedModel === 'keras') {
				predictedTensor = this.predictNumberWithKeras(testArray[i]) as tf.Tensor;
				predictedLabel = predictedTensor.argMax(1).dataSync()[0];
			} else {
				throw new Error('새로운 모델 준비 중입니다.');
			}

			const label = new Label();
			label.xtest = correctLabel.toString();
			label.ylabel = predictedLabel.toString();
			label.correct = label.xtest === label.ylabel;
			this.predictResultLabelList.push(label);

			if (correctLabel === predictedLabel) {
				this.scorecard.push(1);
			} else {
				this.scorecard.push(0);
			}
		}
		this.accuracyResult = ((this.scorecard.reduce((sum, current) => sum + current, 0)) / this.scorecard.length) * 100 + ' %';
	}

	predictNumberWithKeras(input) {
		return this.preTrainedModel.predict(input.reshape([1, 28, 28, 1]));
	}
}
