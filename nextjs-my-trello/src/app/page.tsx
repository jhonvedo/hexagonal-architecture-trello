'use server'
import { revalidatePath } from "next/cache";
import PostCard from "../components/PostCard";
import { STATUS_CARD_UPDATED_EVENT_KEY } from "my-trello-core/domain/cards/card.events";
import container from "../infraestructure/container";


container.IEventEmitter.subscribe(STATUS_CARD_UPDATED_EVENT_KEY, async () => { 
    revalidatePath("/")
});

export default async function Home() {
    let posts = await container.listCard.run();
    
    return (
       <>
       <div className="bg-blue w-full h-screen font-sans">
            <div className="flex p-2 bg-blue-dark items-center">   
                <div className="mx-0 md:mx-auto">
                    <h1 className="text-blue-lighter text-xl flex items-center font-sans italic">                       
                        My Trello
                    </h1>
                </div>     
            </div>

            <div className="flex">
                <div className="rounded bg-grey-light bg-cyan-100 flex-no-shrink w-64 p-2 mr-3">
                    <div className="flex justify-between py-1">
                        <h3 className="text-sm">ToDo</h3>                       
                    </div>
                    <div className="text-sm mt-2">                        
                        {posts.filter(x=> x.state === "todo").map(post => <PostCard post={post} />)}
                    </div>
                    <p className="mt-3 text-grey-dark">Add a card...</p>
                </div>
                <div className="rounded bg-grey-light bg-cyan-100 flex-no-shrink w-64 p-2 mr-3">
                    <div className="flex justify-between py-1">
                        <h3 className="text-sm">In Dev</h3>
                        <svg className="h-4 fill-current text-grey-dark cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z"/></svg>
                    </div>
                    <div className="text-sm mt-2">
                      <div className="text-sm mt-2">                        
                          {posts.filter(x=> x.state === "doing").map(post => <PostCard post={post} />)}
                      </div>                        
                    </div>
                </div>
                <div className="rounded bg-grey-light bg-cyan-100 flex-no-shrink w-64 p-2 mr-3">
                    <div className="flex justify-between py-1">
                        <h3 className="text-sm">Closed</h3>
                        <svg className="h-4 fill-current text-grey-dark cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z"/></svg>
                    </div>
                    <div className="text-sm mt-2">
                      <div className="text-sm mt-2">                        
                          {posts.filter(x=> x.state === "closed").map(post => <PostCard post={post} />)}
                      </div>                       
                    </div>
                </div>
            </div>
        </div>
       </>
    );
}
