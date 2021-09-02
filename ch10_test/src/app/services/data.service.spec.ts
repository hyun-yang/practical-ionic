import {TestBed} from '@angular/core/testing';
import {DataService} from './data.service';
import {of} from 'rxjs';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';

describe('Data Service', () => {
	let service: DataService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				AngularFireModule.initializeApp(environment.FIREBASE_CONFIG)
			],
		}).compileComponents();
		service = TestBed.inject(DataService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should return a collection of kmeetup', () => {
		const expectedData = [
			{
				uid: 'eQsch0YtKwWaSHBhXetowqT0QGy7',
				name: 'Test1',
				title: 'Test1 Title',
				description: 'Test1 Description',
				date: '2021-01-01',
				phone: '011 7777 9999',
				map: {
					latitude: 37.56678925,
					longitude: 126.97842039866163
				}
			},
			{
				uid: 'eQsch0YtKwWaSHBhXetowqT0QGy7',
				name: 'Test2',
				title: 'Test2 Title',
				description: 'Test2 Description',
				date: '2021-01-01',
				phone: '011 7777 9999',
				map: {
					latitude: 37.56678925,
					longitude: 126.97842039866163
				}
			},
		];

		spyOn(service, 'getData').and.returnValue(of(expectedData));
		service.getData(15, '').subscribe(result => {
			expect(result).toEqual(expectedData);
		});
	});

	it('should return a single kmeetup', () => {
		const expectedData = [
			{
				id: '1234567',
				uid: 'eQsch0YtKwWaSHBhXetowqT0QGy7',
				name: 'Test1',
				title: 'Test1 Title',
				date: '2021-01-01',
				description: 'Test1 Description',
				phone: '011 7777 9999',
				map: {
					latitude: 37.56678925,
					longitude: 126.97842039866163
				}
			}
		];

		spyOn(service, 'getMeetUpByMeetUpId').and.returnValue(of(expectedData));
		service.getMeetUpByMeetUpId('1234567').subscribe(result => {
			expect(result).toEqual(expectedData);
		});
	});
});
