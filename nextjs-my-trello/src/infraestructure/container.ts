import { ListCard } from 'my-trello-core/application/card/card.list';
import { CreateCard } from 'my-trello-core/application/card/card.create';
import { UpdateStateCard } from 'my-trello-core/application/card/card.update-state';
import { CardEvents } from 'my-trello-core/domain/cards/card.events';
import { TrelloEventemitter } from './EventEmitter';
import { PrismaCardRepository } from './PrismaCardRepository';

const trelloEmitter =  new TrelloEventemitter();
const cardRepository =  new PrismaCardRepository();
const cardEvents = new CardEvents(trelloEmitter);

const container = {
    IEventEmitter: trelloEmitter, 
    ICardRepository: cardRepository, 
    updateStateCard: new UpdateStateCard(cardRepository,cardEvents),
    listCard: new ListCard(cardRepository),
    createCard: new CreateCard(cardRepository,cardEvents)
};

export default container;