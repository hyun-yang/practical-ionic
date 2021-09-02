export class Coin {
	name?: string;
	amount?: number;
	comment?: string;
	value?: number;
	upOrDown?: number;

	constructor()
	constructor(name?: string, amount?: number, comment?: string, value?: number, upOrDown?: number) {
		this.name = name;
		this.amount = amount;
		this.comment = comment;
		this.value = value;
		this.upOrDown = upOrDown;
	}
}
