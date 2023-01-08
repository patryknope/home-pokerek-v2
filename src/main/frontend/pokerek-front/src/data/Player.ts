import {WithId} from "../utils/WithId";
import {containsTextInFields} from "../utils/FilterFields";

export class Player implements PlayerBase, WithId<string> {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly email: string;
    readonly telephoneNumber: string;
    readonly gamesWon: number;

    public constructor(response: PlayerResponse) {
        this.id = response.id;
        this.firstName = response.firstName;
        this.lastName = response.firstName;
        this.email = response.email;
        this.telephoneNumber = response.telephoneNumber;
        this.gamesWon = response.gamesWon;
    }
    public dataContainsText(text: string) {
        return containsTextInFields(
            [this.firstName, this.lastName, this.email],
            text
        );
    }
    public get fullName(): string {
        return `${this.firstName} ${this.lastName}`
    }
    public get fullNameWithEmail(): string {
        return `${this.fullName} (${this.email})`
    }
}
export interface PlayerBase {
    firstName: string;
    lastName: string;
    gamesWon: number;
    email: string;
    telephoneNumber: string;

}
export interface CreatePlayerRequest extends PlayerBase {}
export interface UpdatePlayerRequest extends PlayerBase, WithId<string> {}
export interface PlayerResponse extends PlayerBase, WithId<string> {}