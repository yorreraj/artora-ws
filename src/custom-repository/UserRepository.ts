import { Repository, EntityRepository } from "typeorm";
import { User } from "../entity/User";
import { CreateUserInput } from "../inputs/CreateUserInput";
import * as bcrypt from 'bcrypt';
import * as otpGenerator from 'otp-generator';
import { UserPreferenceInput } from '../inputs/UserPreferenceInput';

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(userInput:CreateUserInput):Promise<User>{
        await userInput.validate()

        const hashPassword = await bcrypt.hash(userInput.password, 10)
        const activationKey = otpGenerator.generate(4, { alphabets:false, specialChars:false, upperCase:false })

        const user = new User({
            ...userInput,
            password:hashPassword,
            activationKey
        })
        await this.save(user)

        console.log(activationKey) //This must be send by email or sms
        
        return user
    }

    async activateAccount(userId:string, activationKey:string):Promise<User>{
        const user = await this.findOne({where:{id:userId}})
        if(!user)
            throw "The user does not exist."
        if(user.activationKey !== activationKey)
            throw "The activation key is incorrect"

        user.activate = true
        user.activationKey = null
        await this.save(user)

        return user
    }

    async authenticate(userName:string, password:string):Promise<User>{
        const user = await this.findOne({where:{userName}, relations:['type', 'myShops']})
        const authFailed = "Authentication failed: incorrect username or password"
        if(!user) throw authFailed

        const passwordCorrect = await bcrypt.compare(password, user.password)
        if(!passwordCorrect) throw authFailed

        return user
    }
}