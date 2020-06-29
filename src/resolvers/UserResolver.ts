import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import { User } from '../entity/User'
import { CreateUserInput } from '../inputs/CreateUserInput'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../custom-repository/UserRepository';

@Resolver()
export class UserResolver{

    @Mutation(() => User)
    async createUser(@Arg("user") data: CreateUserInput){
        return await getCustomRepository(UserRepository).createUser(data)
    }

    @Mutation(() => User)
    async activateAccount(@Arg("userId") userId:string, @Arg("activationKey") activationKey:string){
        return await getCustomRepository(UserRepository).activateAccount(userId, activationKey)
    }

    @Query(() => User)
    async authenticate(@Arg("userName") userName:string, @Arg("password") password:string){
        return await getCustomRepository(UserRepository).authenticate(userName, password)
    }
}