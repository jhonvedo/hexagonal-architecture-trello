import { Module, Provider } from '@nestjs/common';
import { EventEmitterService } from '../shared/EventEmiterService';
import { SendEmailWhenCardIsClosedHandlerService } from '../shared/send-email-when-card-is-closed-handler.service';
import { SendEmail } from 'my-trello-core/application/shared/send.email';



const providers: Provider[] = [
    {
        provide: SendEmail,
        useFactory: (
        ) => new SendEmail()
    },
    {
        provide: SendEmailWhenCardIsClosedHandlerService,
        useFactory: (
            emitter: EventEmitterService,
            sendEmail: SendEmail
        ) => new SendEmailWhenCardIsClosedHandlerService(emitter, sendEmail),
        inject: [EventEmitterService, SendEmail]
    },
    {
        provide: EventEmitterService,
        useFactory: (
        ) => new EventEmitterService()
    }
]

@Module({
    providers: [
        ...providers
    ],
    exports: [
        ...providers
    ]
})
export class SharedModule { }
