import {Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UtilService} from '../services/util.service';
import * as tf from '@tensorflow/tfjs';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {

	@ViewChild('mnistCanvas') canvas: ElementRef;

	preTrainedModel: tf.LayersModel;
	PRE_TRAINED_MODEL_JSON = 'assets/keras/model.json';

	canvasElement: any;
	canvasPosition: any;
	context: CanvasRenderingContext2D;

	predictedLabel: any;
	x: number;
	y: number;

	CANVAS_WIDTH = 300;
	CANVAS_HEIGHT = 300;

	constructor(private httpClient: HttpClient,
							private utilService: UtilService) {
		this.loadPretrainedModel();
	}

	ionViewDidEnter() {
		this.canvasElement = this.canvas.nativeElement;
		this.context = this.canvasElement.getContext('2d');
		this.canvasPosition = this.canvasElement.getBoundingClientRect();
		this.canvasElement.width = this.CANVAS_WIDTH;
		this.canvasElement.height = this.CANVAS_HEIGHT;

		this.context.lineWidth = 10;
		this.context.lineCap = 'round';
		this.context.strokeStyle = '#ffffff';
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

	startDrawing(event: TouchEvent) {
		this.x = event.touches[0].pageX - this.canvasPosition.x;
		this.y = event.touches[0].pageY - this.canvasPosition.y;
	}

	moveDrawing(event) {
		const currentX = event.touches[0].pageX - this.canvasPosition.x;
		const currentY = event.touches[0].pageY - this.canvasPosition.y;

		this.context.beginPath();
		this.context.moveTo(this.x, this.y);
		this.context.lineTo(currentX, currentY);
		this.context.closePath();
		this.context.stroke();

		this.x = currentX;
		this.y = currentY;
	}

	endDrawing(event) {
	}

	predict() {
		const drawingNumber = tf.browser.fromPixels(this.canvasElement)
			.resizeNearestNeighbor([28, 28])
			.mean(2)
			.expandDims(2)
			.expandDims()
			.toFloat()
			.div(255);

		console.log(drawingNumber.shape);
		let predictedTensor: any;
		predictedTensor = this.preTrainedModel.predict(drawingNumber);
		this.predictedLabel = predictedTensor.argMax(1).dataSync()[0];
	}

	clear() {
		this.predictedLabel = null;
		this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
	}

}
