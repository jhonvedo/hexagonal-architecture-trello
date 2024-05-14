'use server'
import { CardEntity } from 'my-trello-core/domain/cards/card.entity'
import StateSelector from './StateSelect'

export type PostProps = CardEntity 

export default async function Post({ post }: { post: PostProps }) {

  const authorName = 'Unknown author'
  return (
    <div className="bg-white p-2 rounded mt-1 border-b border-grey cursor-pointer hover:bg-grey-lighter">
        <h2 className='text-md'>{post.title}</h2>
        <p>{authorName}</p>
        {/* <p>{post.createdAt.toLocaleDateString()}</p> */}
        <StateSelector post={post}/>
    </div>
  )
}