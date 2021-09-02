import {BaseModel} from './BaseModel';

export class GenericCollection<T extends BaseModel> {

	private collection: T[] = [];

	constructor(collection: T[]) {
		this.collection = collection;
	}

	getFirst(): T {
		return this.collection[0];
	}

	getLast(): T {
		return this.collection[this.collection.length - 1];
	}

	getLength(): number {
		return this.collection.length;
	}

	add(collection: T) {
		this.collection.push(collection);
	}

	remove(id: number) {
		if (this.find(id)) {
			this.collection = this.collection.filter(element => element.id !== id);
		}
	}

	find(id: number) {
		return this.collection.filter(element => element.id === id)[0];
	}

}
