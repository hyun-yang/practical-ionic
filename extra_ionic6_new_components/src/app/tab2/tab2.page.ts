import {Component} from '@angular/core';
import {PopoverController} from '@ionic/angular';
import {PopoverComponent} from '../popover/popover.component';


@Component({
	selector: 'app-tab2',
	templateUrl: 'tab2.page.html',
	styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

	maxBreadcrumbs = 4;

	constructor(public popoverController: PopoverController) {
	}

	expandBreadcrumbs() {
		this.maxBreadcrumbs = undefined;
	}

	async presentPopover(ev: any) {
		const popover = await this.popoverController.create({
			component: PopoverComponent,
			componentProps: {
				collapsedBreadcrumbs: ev.detail.collapsedBreadcrumbs
			},
			event: ev
		});
		await popover.present();
	}
}
