import {Component} from '@angular/core';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {Clipboard} from '@capacitor/clipboard';
import {HttpClient} from '@angular/common/http';
import {DetectObject} from './DetectObject';
import {environment} from '../../environments/environment';
import {UtilService} from '../services/util.service';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {

	ocrText: DetectObject;
	ocrString: string;

	constructor(private httpClient: HttpClient,
							private utilService: UtilService) {
	}

	async copyOCRString() {
		await Clipboard.write({
			string: this.ocrString
		}).then(() => {
			this.utilService.showToast('클립보드에 복사되었습니다.');
			this.ocrString = '';
		});
	}

	async takePhoto() {
		await Camera.getPhoto({
			quality: 100,
			allowEditing: false,
			resultType: CameraResultType.Base64,
			source: CameraSource.Camera
		}).then((imageData) => {
			this.utilService.showLoading('문자 추출 중...');
			this.getLabels(imageData.base64String).subscribe((result) => {
				this.utilService.dismissLoading();
				this.ocrText = new DetectObject();
				this.ocrText.imageData = imageData.base64String;
				this.ocrText.result = result.responses[0].fullTextAnnotation.text;
				this.ocrString = this.ocrText.result = result.responses[0].fullTextAnnotation.text;
			}, error => {
				this.utilService.dismissLoading();
				this.utilService.showAlert('에러', error.message);
			});
		}, error => {
			this.utilService.dismissLoading();
			this.utilService.showAlert('에러', error.message);
		});
	}

	getLabels(imageData) {
		const request = {
			requests: [
				{
					image: {
						content: imageData
					},
					features: [
						{
							type: 'DOCUMENT_TEXT_DETECTION',
						}
					]
				}
			]
		};
		return this.httpClient.post('https://vision.googleapis.com/v1/images:annotate?key=' + environment.GOOGLE_VISION_API_KEY, request);
	}

	reset() {
		this.ocrText = null;
	}

}
