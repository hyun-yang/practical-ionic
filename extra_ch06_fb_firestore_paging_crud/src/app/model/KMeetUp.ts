import {KMeetUpMap} from './KMeetUpMap';

export interface KMeetUp {
  docs?: any;
  id?: string;
  uid: string;
  name: string;
  title: string;
  description: string;
  date: string;
  orderedDate: string;
  phone: string;
  map: KMeetUpMap;
}
