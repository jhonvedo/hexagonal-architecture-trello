import { PrismaClient, Prisma } from '@prisma/client'
import { CARD_STATE_CLOSED, CARD_STATE_DOING, CARD_STATE_TODO } from 'my-trello-core/domain/cards/card.entity'

const prisma = new PrismaClient()

const postData: Prisma.CardCreateInput[] = [
    {
        title: 'Join the Prisma Discord',
        description: 'https://pris.ly/discord',
        state: CARD_STATE_TODO
      },
      {
        title: 'Follow Prisma on Twitter',
        description: 'https://www.twitter.com/prisma',
        state: CARD_STATE_DOING
      },
      {
        title: 'Ask a question about Prisma on GitHub',
        description: 'https://www.github.com/prisma/prisma/discussions'  ,
        state: CARD_STATE_CLOSED     
      },
]


async function main() {
  console.log(`Start seeding ...`)
  for (const u of postData) {
    const user = await prisma.card.create({
      data: u,
    })
    console.log(`Created post with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })