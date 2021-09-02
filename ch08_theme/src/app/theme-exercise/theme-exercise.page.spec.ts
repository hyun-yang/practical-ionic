import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ThemeExercisePage } from './theme-exercise.page';

describe('ThemeExercisePage', () => {
  let component: ThemeExercisePage;
  let fixture: ComponentFixture<ThemeExercisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeExercisePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeExercisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
