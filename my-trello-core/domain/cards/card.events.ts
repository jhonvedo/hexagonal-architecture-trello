import { CardEntity, CardState } from './card.entity';
import { IEventEmitter } from '../shared/IEventEmitter';

export const CARD_CREATED_EVENT_KEY: string = "card.created";
export const CARD_UPDATED_EVENT_KEY: string = "card.updated";
export const STATUS_CARD_UPDATED_EVENT_KEY: string = "status.card.updated";

export type CardCreatedEventData = CardEntity;
export type CardUpdatedEventData = CardEntity;
export type StatusCardUpdatedEventData = {card:CardEntity,beforeStatus: CardState};

export class CardEvents {
  constructor(private readonly eventEmitter: IEventEmitter) {}

  cardCreated(card: CardEntity): void {
    let eventData: CardCreatedEventData = {...card}
    this.eventEmitter.publish(CARD_CREATED_EVENT_KEY,eventData);    
  }

  cardUpdated(card: CardEntity): void {
    let eventData: CardUpdatedEventData = {...card}
    this.eventEmitter.publish(CARD_UPDATED_EVENT_KEY, eventData);
  }

  statusCardUpdated(card: CardEntity, beforeStatus: CardState): void {
    let eventData: StatusCardUpdatedEventData = {beforeStatus,card}
    this.eventEmitter.publish(STATUS_CARD_UPDATED_EVENT_KEY, eventData);
  }

}