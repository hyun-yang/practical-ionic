import {Component, Input, OnInit} from '@angular/core';
import {KMeetUp} from '../model/KMeetUp';

@Component({
  selector: 'app-binding-test',
  templateUrl: './binding-test.component.html',
  styleUrls: ['./binding-test.component.scss'],
})
export class BindingTestComponent implements OnInit {
  @Input()
  meetup: KMeetUp;

  constructor() {
  }

  ngOnInit() {
  }

}
