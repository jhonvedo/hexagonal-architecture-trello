import { CARD_STATE_CLOSED, CardEntity, CardState } from '../../domain/cards/card.entity';
import { ICardRepository } from '../../domain/cards/card.repository';
import { CardEvents } from '../../domain/cards/card.events';

export class UpdateStateCardDto {
  readonly id: string;
  readonly state: CardState;
}


export class UpdateStateCard {
  constructor(private readonly cardRepository: ICardRepository, private readonly cardEvents: CardEvents) {}

  async run(updateCardDto: UpdateStateCardDto): Promise<CardEntity> {
    const { id, state } = updateCardDto;

    const existingCard = await this.cardRepository.find(id);
    if(!existingCard){
      throw new Error("Card not found");
    }

    if(existingCard.state === CARD_STATE_CLOSED){
      throw new Error("Card is closed");
    }

    const card = new CardEntity();
    card.id = id;
    card.title = existingCard.title;
    card.description = existingCard.description;
    card.state = state;
    return this.cardRepository.update(card).then(x=> {
      this.cardEvents.statusCardUpdated(card,existingCard.state)
      return x;
    });
  }

}
