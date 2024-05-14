import { CARD_STATE_TODO, CardEntity } from '../../domain/cards/card.entity';
import { ICardRepository } from '../../domain/cards/card.repository';
import { CardEvents } from '../../domain/cards/card.events';


export class CreateCardDto {
  readonly title: string;
  readonly description: string;
}

export class CreateCard {
  constructor(private readonly cardRepository: ICardRepository, private readonly cardEvents: CardEvents) {}

  async run(createCardDto: CreateCardDto): Promise<CardEntity> {
    const { title, description } = createCardDto;
    const card = new CardEntity();
    card.title = title;
    card.description = description;
    card.state = CARD_STATE_TODO;
    return this.cardRepository.create(card).then(x=> {
      this.cardEvents.cardCreated(x)
      return x;
    });
  }

}
