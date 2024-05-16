export type CardState = "todo" | "doing" | "closed" 

export const CARD_STATE_TODO:CardState = "todo"; 
export const CARD_STATE_DOING:CardState = "doing"; 
export const CARD_STATE_CLOSED:CardState = "closed"; 

export class CardEntity {
    id: string
    createdAt: Date
    title: string
    description: string
    state: CardState
}