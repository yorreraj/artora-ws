import { Field, InputType } from "type-graphql";

@InputType()
export class CoordinateInput{
    @Field()
    longitude:number

    @Field()
    latitude:number
}