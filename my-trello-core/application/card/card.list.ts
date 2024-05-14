import { CardEntity } from '../../domain/cards/card.entity';
import { ICardRepository } from '../../domain/cards/card.repository';


export class ListCard {
  constructor(private readonly cardRepository: ICardRepository) {}

  async run(): Promise<CardEntity[]> {
    return this.cardRepository.list();
  }

}
