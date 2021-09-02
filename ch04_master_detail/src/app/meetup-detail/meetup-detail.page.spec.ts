import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeetupDetailPage } from './meetup-detail.page';

describe('MeetupDetailPage', () => {
  let component: MeetupDetailPage;
  let fixture: ComponentFixture<MeetupDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetupDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeetupDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
