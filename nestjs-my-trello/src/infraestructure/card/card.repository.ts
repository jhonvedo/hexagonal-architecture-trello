
import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CardEntity } from 'my-trello-core/domain/cards/card.entity';
import { ICardRepository } from 'my-trello-core/domain/cards/card.repository';

@Injectable()
export class CardRepository implements ICardRepository {    
    private cardData: CardEntity[] = [
        {
            id: "1",
            title: "title 1",
            description: "desc1",
            state: "doing"
        },
        {
            id: "2",
            title: "title 2",
            description: "desc2",
            state: 'closed'
        },
    ];

    update(data: CardEntity): Promise<CardEntity> {
        const itemIndex = this.cardData.findIndex(x=>x.id === data.id); 
        this.cardData[itemIndex] = data;
        return Promise.resolve(data)   
    }
    find(id: string): Promise<CardEntity> {
        const card = this.cardData.find(x=>x.id === id);
        return Promise.resolve(card)   
    }

    list(): Promise<CardEntity[]> {
        return Promise.resolve(this.cardData)       
    }
    create(data: CardEntity): Promise<CardEntity> {
        let newCard: CardEntity = {...data, id: uuidv4() }
        this.cardData.push(newCard);

        return Promise.resolve(newCard)     
    }
   
}
