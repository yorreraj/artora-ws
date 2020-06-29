import { InputType, Field, Int } from "type-graphql";

@InputType()
export class UserPreferenceInput{
    @Field()
    userId:string

    @Field(() => [Int], { nullable:true })
    categoryPersonIds?:Array<number>

    @Field(() => [Int], { nullable:true })
    categoryProductIds?:Array<number>

    @Field(() => [String], { nullable:true })
    shopIds?:Array<string>

    validate(){
        if(!this.categoryPersonIds && !this.categoryProductIds && !this.shopIds)
            throw "Expect at least a preference."
    }
}