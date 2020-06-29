import { InputType, Field, Int } from "type-graphql";
import { Sex, User } from "../entity/User";
import { getConnection } from "typeorm";
import { VENDOR } from "../common/constant";
import { ApolloError } from "apollo-server";

@InputType()
export class CreateUserInput{
    @Field()
    name:string;

    @Field({nullable:true})
    phone?: string;

    @Field({nullable:true})
    mail?: string;

    @Field()
    password: string;

    async validate(){
        const entityManager = getConnection().manager

        if(!this.phone && !this.mail)
            throw "The email address or phone number expected."  

        if(this.phone){
            const phoneExits = await entityManager.findOne(User, { where : { activate:true, phone:this.phone } })
            if(phoneExits)
                throw new ApolloError('Phone number is already in use.', "PHONE_EXISTS")
        }
        
        if(this.mail){
            const mailExists = await entityManager.findOne(User, { where : { activate:true, mail:this.mail } })
            if(mailExists)
                throw new ApolloError("Mail adress is already in use", "MAIL_EXISTS")
        }
    
    }
}