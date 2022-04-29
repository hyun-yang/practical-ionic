import {Component, ViewChild} from '@angular/core';
import {IonAccordionGroup} from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild(IonAccordionGroup, {static: true}) accordionGroup: IonAccordionGroup;

  constructor() {
  }

  logAccordionValue() {
    console.log(this.accordionGroup.value);
  }

  clickAccordionItem(event:Event) {
    console.log(event.target);
  }

  closeAccordion() {
    this.accordionGroup.value = undefined;
  }
}
