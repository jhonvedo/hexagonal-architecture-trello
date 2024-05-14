import { Provider, Module } from "@nestjs/common";
import { CreateCard } from "my-trello-core/application/card/card.create";
import { ListCard } from "my-trello-core/application/card/card.list";
import { UpdateCard } from "my-trello-core/application/card/card.update";
import { UpdateStateCard } from "my-trello-core/application/card/card.update-state";
import { CardEvents } from "my-trello-core/domain/cards/card.events";
import { EventEmitterService } from "../shared/EventEmiterService";
import { SharedModule } from "../shared/shared.module";
import { CardController } from "./card.controller";
import { CardRepository } from "./card.repository";



const providers:Provider[] = [
  CardRepository,  
  {
    provide: CardEvents,
    useFactory: ( 
      emitter: EventEmitterService     
     ) => new CardEvents(emitter),
    inject: [EventEmitterService]
  }, 
  {
    provide: ListCard,
    useFactory: (
      card: CardRepository      
    ) => new ListCard(card),
    inject: [CardRepository]
  },
  {
    provide: CreateCard,
    useFactory: (
      card: CardRepository,
      event: CardEvents
    ) => new CreateCard(card,event),
    inject: [CardRepository,CardEvents]
  },
  {
    provide: UpdateCard,
    useFactory: (
      card: CardRepository,
      event: CardEvents    
    ) => new UpdateCard(card,event),
    inject: [CardRepository,CardEvents]
  },
  {
    provide: UpdateStateCard,
    useFactory: (
      card: CardRepository,
      event: CardEvents
    ) => new UpdateStateCard(card,event),
    inject: [CardRepository,CardEvents]
  } 
]

@Module({
  imports: [SharedModule],
  controllers: [CardController],
  providers: [
    ...providers   
  ],
  exports: [
      ...providers     
  ]
})
export class CardModule {}
