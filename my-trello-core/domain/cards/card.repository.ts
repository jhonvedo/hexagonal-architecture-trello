import { CardEntity } from "./card.entity";

export interface ICardRepository {    
    update(data: CardEntity): Promise<CardEntity>
    list(): Promise<CardEntity[]>
    find(id: string): Promise<CardEntity|null>
    create(data: CardEntity): Promise<CardEntity>
}
