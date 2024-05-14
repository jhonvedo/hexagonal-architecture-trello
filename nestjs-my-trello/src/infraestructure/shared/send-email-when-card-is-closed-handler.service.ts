import { Injectable } from '@nestjs/common';
import { SendEmail } from 'my-trello-core/application/shared/send.email';
import { CARD_STATE_CLOSED } from 'my-trello-core/domain/cards/card.entity';
import { STATUS_CARD_UPDATED_EVENT_KEY, StatusCardUpdatedEventData } from 'my-trello-core/domain/cards/card.events';
import { IEventEmitter } from 'my-trello-core/domain/shared/IEventEmitter';


@Injectable()
export class SendEmailWhenCardIsClosedHandlerService {
    constructor(private readonly eventEmitter: IEventEmitter,private readonly sendEmail: SendEmail) {
        this.eventEmitter.subscribe(STATUS_CARD_UPDATED_EVENT_KEY,this.handleEvent.bind(this))        
    }

    private handleEvent(data: StatusCardUpdatedEventData) {
        if(data.card.state === CARD_STATE_CLOSED){
            this.sendEmail.run(`card:${data.card.id} is closed - before state: ${data.beforeStatus}`)
        }
    }
}
