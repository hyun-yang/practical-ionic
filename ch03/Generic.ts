import {KMeetUpData} from './KMeetUpData';
import {KMeetUpDetail} from './KMeetUpDetail';
import {GenericCollection} from './GenericCollection';

const kMeetUpList: KMeetUpData[] = [];
for (let i = 0; i < 10; i++) {
	kMeetUpList.push(new KMeetUpData(i + 1, '제목' + (i + 1)));
}

const kMeetUpDetailList: KMeetUpDetail[] = [];
for (let i = 0; i < 10; i++) {
	kMeetUpDetailList.push(new KMeetUpDetail(i, '주소 ' + (i + 1), '설명 ' + (i + 1)));
}

const gc1 = new GenericCollection(kMeetUpList);
const gc2 = new GenericCollection(kMeetUpDetailList);

console.log(gc1.find(1));
console.log(gc2.find(2));
