'use server'
import { CardState } from "my-trello-core/domain/cards/card.entity";
import container from "../infraestructure/container";


export async function changePostState(id: string, newStatus: CardState) {
    await container.updateStateCard.run({
      id,
      state : newStatus
    });      
}