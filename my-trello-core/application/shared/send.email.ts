export class SendEmail {
    async run(message: string): Promise<void>{
        console.log("email :",message)
        return Promise.resolve();
    }
}