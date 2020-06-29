import { Field, InputType, Int } from "type-graphql"
import { CoordinateInput } from "./CoordinateInput"

@InputType()
export class CreatePointOfSaleInput{
    @Field({nullable:true})
    name?:string

    @Field()
    location:string

    @Field(() => CoordinateInput, {nullable:true})
    coordinate:CoordinateInput

    @Field({nullable:true})
    mainPointOfSale:boolean

    @Field(() => Int)
    quarterId:number

    @Field()
    shopId:string
}