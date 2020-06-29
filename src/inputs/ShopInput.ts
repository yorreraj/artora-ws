import { InputType, Field, Int } from "type-graphql";

@InputType()
export class CreateShopInput{
    @Field()
    name:string;

    @Field({nullable:true})
    logoUri?:string;

    @Field({nullable:true})
    photoUri?:string;

    @Field()
    ownerId:string;

    @Field(() => [Int])
    familyProductsIds:Array<number>;
}