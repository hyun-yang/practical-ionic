import {Inject, Injectable} from '@angular/core';
import {Storage} from '@ionic/storage-angular';
import {DOCUMENT} from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class ThemeService {

	theme: string;

	constructor(@Inject(DOCUMENT) private document: Document,
							private storage: Storage) {
		this.initializeStorage();
	}

	async initializeStorage() {
		await this.storage.create();
	}

	setAppDefaultTheme() {
		this.storage.get('KMEETUP_THEME')
			.then((theme) => {
				if (theme == null) {
					this.theme = 'light';
				} else {
					this.theme = theme;
				}
				this.changeTheme(this.theme);
			});
	}

	changeTheme(theme: string) {
		this.storage.set('KMEETUP_THEME', theme);

		let currentTheme;
		switch (theme) {
			case 'light':
				currentTheme = this.getLightTheme();
				break;
			case 'dark':
				currentTheme = this.getDarkTheme();
				break;
			default:
				currentTheme = this.getLightTheme();
				break;
		}

		this.document.documentElement.style.cssText = currentTheme;
	}

	getDarkTheme() {
		return `
      --ion-color-primary: #264653;
      --ion-color-primary-rgb: 38,70,83;
      --ion-color-primary-contrast: #ffffff;
      --ion-color-primary-contrast-rgb: 255,255,255;
      --ion-color-primary-shade: #213e49;
      --ion-color-primary-tint: #3c5964;

      --ion-color-secondary: #2a9d8f;
      --ion-color-secondary-rgb: 42,157,143;
      --ion-color-secondary-contrast: #ffffff;
      --ion-color-secondary-contrast-rgb: 255,255,255;
      --ion-color-secondary-shade: #258a7e;
      --ion-color-secondary-tint: #3fa79a;

      --ion-color-tertiary: #e9c46a;
      --ion-color-tertiary-rgb: 233,196,106;
      --ion-color-tertiary-contrast: #000000;
      --ion-color-tertiary-contrast-rgb: 0,0,0;
      --ion-color-tertiary-shade: #cdac5d;
      --ion-color-tertiary-tint: #ebca79;

      --ion-color-success: #f4a261;
      --ion-color-success-rgb: 244,162,97;
      --ion-color-success-contrast: #000000;
      --ion-color-success-contrast-rgb: 0,0,0;
      --ion-color-success-shade: #d78f55;
      --ion-color-success-tint: #f5ab71;

      --ion-color-warning: #e76f51;
      --ion-color-warning-rgb: 231,111,81;
      --ion-color-warning-contrast: #000000;
      --ion-color-warning-contrast-rgb: 0,0,0;
      --ion-color-warning-shade: #cb6247;
      --ion-color-warning-tint: #e97d62;

      --ion-color-danger: #eb445a;
      --ion-color-danger-rgb: 235,68,90;
      --ion-color-danger-contrast: #ffffff;
      --ion-color-danger-contrast-rgb: 255,255,255;
      --ion-color-danger-shade: #cf3c4f;
      --ion-color-danger-tint: #ed576b;

      --ion-color-dark: #222428;
      --ion-color-dark-rgb: 34,36,40;
      --ion-color-dark-contrast: #ffffff;
      --ion-color-dark-contrast-rgb: 255,255,255;
      --ion-color-dark-shade: #1e2023;
      --ion-color-dark-tint: #383a3e;

      --ion-color-medium: #92949c;
      --ion-color-medium-rgb: 146,148,156;
      --ion-color-medium-contrast: #ffffff;
      --ion-color-medium-contrast-rgb: 255,255,255;
      --ion-color-medium-shade: #808289;
      --ion-color-medium-tint: #9d9fa6;

      --ion-color-light: #f4f5f8;
      --ion-color-light-rgb: 244,245,248;
      --ion-color-light-contrast: #000000;
      --ion-color-light-contrast-rgb: 0,0,0;
      --ion-color-light-shade: #d7d8da;
      --ion-color-light-tint: #f5f6f9;
    `;
	}

	getLightTheme() {
		return `
      --ion-color-primary: #3880ff;
      --ion-color-primary-rgb: 56,128,255;
      --ion-color-primary-contrast: #ffffff;
      --ion-color-primary-contrast-rgb: 255,255,255;
      --ion-color-primary-shade: #3171e0;
      --ion-color-primary-tint: #4c8dff;

      --ion-color-secondary: #3dc2ff;
      --ion-color-secondary-rgb: 61,194,255;
      --ion-color-secondary-contrast: #ffffff;
      --ion-color-secondary-contrast-rgb: 255,255,255;
      --ion-color-secondary-shade: #36abe0;
      --ion-color-secondary-tint: #50c8ff;

      --ion-color-tertiary: #5260ff;
      --ion-color-tertiary-rgb: 82,96,255;
      --ion-color-tertiary-contrast: #ffffff;
      --ion-color-tertiary-contrast-rgb: 255,255,255;
      --ion-color-tertiary-shade: #4854e0;
      --ion-color-tertiary-tint: #6370ff;

      --ion-color-success: #2dd36f;
      --ion-color-success-rgb: 45,211,111;
      --ion-color-success-contrast: #ffffff;
      --ion-color-success-contrast-rgb: 255,255,255;
      --ion-color-success-shade: #28ba62;
      --ion-color-success-tint: #42d77d;

      --ion-color-warning: #ffc409;
      --ion-color-warning-rgb: 255,196,9;
      --ion-color-warning-contrast: #000000;
      --ion-color-warning-contrast-rgb: 0,0,0;
      --ion-color-warning-shade: #e0ac08;
      --ion-color-warning-tint: #ffca22;

      --ion-color-danger: #eb445a;
      --ion-color-danger-rgb: 235,68,90;
      --ion-color-danger-contrast: #ffffff;
      --ion-color-danger-contrast-rgb: 255,255,255;
      --ion-color-danger-shade: #cf3c4f;
      --ion-color-danger-tint: #ed576b;

      --ion-color-dark: #222428;
      --ion-color-dark-rgb: 34,36,40;
      --ion-color-dark-contrast: #ffffff;
      --ion-color-dark-contrast-rgb: 255,255,255;
      --ion-color-dark-shade: #1e2023;
      --ion-color-dark-tint: #383a3e;

      --ion-color-medium: #92949c;
      --ion-color-medium-rgb: 146,148,156;
      --ion-color-medium-contrast: #ffffff;
      --ion-color-medium-contrast-rgb: 255,255,255;
      --ion-color-medium-shade: #808289;
      --ion-color-medium-tint: #9d9fa6;

      --ion-color-light: #f4f5f8;
      --ion-color-light-rgb: 244,245,248;
      --ion-color-light-contrast: #000000;
      --ion-color-light-contrast-rgb: 0,0,0;
      --ion-color-light-shade: #d7d8da;
      --ion-color-light-tint: #f5f6f9;
    `;
	}
}
