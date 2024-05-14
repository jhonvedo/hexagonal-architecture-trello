import { CardEntity } from '../../domain/cards/card.entity';
import { ICardRepository } from '../../domain/cards/card.repository';
import { CardEvents } from '../../domain/cards/card.events';

export class UpdateCardDto {
  readonly title: string;
  readonly description: string;
}

export class UpdateCard {
  constructor(private readonly cardRepository: ICardRepository, private readonly cardEvents: CardEvents) {}

  async run(id:string, updateCardDto: UpdateCardDto): Promise<CardEntity> {
    const { title, description } = updateCardDto;

    const existingCard = await this.cardRepository.find(id);

    if(!existingCard){
      throw new Error("Card not exist")
    }

    const card = new CardEntity();
    card.id = id;
    card.title = title;
    card.description = description;
    card.state = existingCard.state;
    return this.cardRepository.update(card).then(x=> {
      this.cardEvents.cardUpdated(x)
      return x;
    });
  }

}
