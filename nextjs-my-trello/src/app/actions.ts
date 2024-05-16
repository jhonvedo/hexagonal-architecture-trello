'use server'
import { CardState } from "my-trello-core/domain/cards/card.entity";
import container from "../infraestructure/container";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function changePostState(id: string, newStatus: CardState) {
  await container.updateStateCard.run({
    id,
    state: newStatus
  });
}

export async function createCard(formData: FormData) {
  const schema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  });
  const parse = schema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
  });

  if (!parse.success) {
    let errors = parse.error.errors.map(x=>x.message);
    return { message: `Failed to create card: ${errors.join(",")}}` };
  }
  const data = parse.data;
  try {
   
    await container.createCard.run({
      description: data.description,
      title: data.title
    });
    revalidatePath("/");
    return { message: `Added card ${data.title}` };
  } catch (e) {
    return { message: "Failed to create card" };
  }
}