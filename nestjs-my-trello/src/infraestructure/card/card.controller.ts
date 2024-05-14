import { Body, Controller, Get, Inject, Param, Patch, Post, Put } from '@nestjs/common';
import { ListCard } from 'my-trello-core/application/card/card.list';
import { CreateCard, CreateCardDto } from 'my-trello-core/application/card/card.create';
import { UpdateCard, UpdateCardDto } from 'my-trello-core/application/card/card.update';
import { UpdateStateCard } from 'my-trello-core/application/card/card.update-state';
import { CardEntity, CardState } from 'my-trello-core/domain/cards/card.entity';


@Controller('card')
export class CardController {

    constructor(private readonly listCard: ListCard,private readonly createCard: CreateCard, private readonly updateCard:UpdateCard, private readonly updateStatusCard: UpdateStateCard) {  }

    @Get()
    async getAll(): Promise<CardEntity[]> {
      return await this.listCard.run();
    }

    @Post()
    async create(@Body() request: CreateCardDto): Promise<CardEntity> {
      return await this.createCard.run(request);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() request: UpdateCardDto) {
      return this.updateCard.run(id,request);
    }


    @Patch(':id/state')
    updateStatus(@Param('id') id: string, @Body() request: {state:CardState}) {
      return this.updateStatusCard.run({id,state: request.state});
    }

}
