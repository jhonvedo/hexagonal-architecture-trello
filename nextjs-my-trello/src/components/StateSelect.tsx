'use client'
import React, { useState } from 'react'
import {changePostState} from '../app/actions'
import { CardEntity, CardState } from 'my-trello-core/domain/cards/card.entity'


export type PostProps = {
  post: CardEntity
};


export default function StateSelect(props: PostProps) {
  const { post } = props;
  const [state, setState] = useState(post.state);

  const onchangeHandler = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    try {
      await changePostState(post.id, newValue as CardState)
      setState(newValue as CardState);       
    } catch (error) {
      console.log("error",error)
    }
  }

  return (
    <select onChange={onchangeHandler} value={state}>
      <option value="todo">To Do</option>
      <option value="doing" >In Dev</option>
      <option value="closed" >Closed</option>
    </select>
  )
}