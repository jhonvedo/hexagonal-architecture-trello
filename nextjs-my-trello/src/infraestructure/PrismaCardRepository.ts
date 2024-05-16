import { Card } from "@prisma/client";
import { CardEntity, CardState } from "my-trello-core/domain/cards/card.entity";
import { ICardRepository } from "my-trello-core/domain/cards/card.repository";
import prisma from '../lib/prisma'

export class PrismaCardRepository implements ICardRepository {
    update(data: CardEntity): Promise<CardEntity> {
        return prisma.card.update({
            where: {
                id: data.id
            },
            data: {
                title: data.title,
                description: data.description,
                state: data.state                
            }
        }).then(x=> PrismaCardRepository.convertCard(x))
    }
    async list(): Promise<CardEntity[]> {     
        return (await prisma.card.findMany()).map(x=> PrismaCardRepository.convertCard(x));       
    }
    find(id: string): Promise<CardEntity | null> {
        return prisma.card.findUnique({
            where: {
                id
            }
        }).then()
    }
    create(data: CardEntity): Promise<CardEntity> {
        return prisma.card.create({
            data: {
                title: data.title,
                description: data.description,
                state: data.state                
            }
        }).then(x=> PrismaCardRepository.convertCard(x))
    }


    private static convertCard(card: Card): CardEntity{
        return {
            id: card.id,
            description: card.description,
            state: card.state as CardState,
            title: card.title,
            createdAt: card.createdAt
        }
    }

}