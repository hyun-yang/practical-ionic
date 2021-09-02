import {Component} from '@angular/core';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
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

  detectedObjects: DetectObject[] = [];

  constructor(private httpClient: HttpClient,
              private utilService: UtilService) {
  }

  async takePhoto() {
    await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    }).then((imageData) => {
      this.utilService.showLoading('이미지 추정 중...');
      this.getLabels(imageData.base64String).subscribe((result) => {
        this.utilService.dismissLoading();
        const image: DetectObject = new DetectObject();
        image.imageData = imageData.base64String;
        image.result = result.responses;
        this.detectedObjects.push(image);
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
              type: 'LABEL_DETECTION',
              maxResults: 3,
              model: 'builtin/stable'
            }
          ]
        }
      ]
    };
    return this.httpClient.post('https://vision.googleapis.com/v1/images:annotate?key=' + environment.GOOGLE_VISION_API_KEY, request);
  }

  reset() {
    this.detectedObjects = [];
  }

}
