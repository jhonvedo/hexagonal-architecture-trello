import { Module, Provider } from '@nestjs/common';
import { CardModule } from './infraestructure/card/card.module';

const providers:Provider[] = [

];

@Module({
  imports: [CardModule],
  providers: [
    ...providers   
  ],
  exports: [
      ...providers     
  ]

})
export class AppModule {}
