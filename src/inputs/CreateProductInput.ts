import { InputType, Field, Int } from "type-graphql";
import { Currency } from "../entity/Price";

@InputType()
export class CreateProductInput{
    @Field()
    name:string;

    @Field({nullable:true})
    available?:boolean;

    @Field({nullable:true})
    youtubeVideoId?:string;

    @Field({nullable:true})
    newArrival?:boolean;

    @Field(() => [String], { nullable:true })
    colors?:Array<string>;

    @Field(() => [String], { nullable:true })
    tags?:Array<string>;

    @Field(() => [CreatePictureWithProductInput], { nullable:true })
    pictures?:Array<CreatePictureWithProductInput>

    @Field(() => [CreateDescriptionWithProductInput])
    descriptions:Array<CreateDescriptionWithProductInput>;

    @Field(() => CreatePriceWithProduct)
    prices:Array<CreatePriceWithProduct>;

    @Field(() => [Int])
    subCategoriesIds:Array<number>;

    @Field(() => [String])
    pointsOfSaleIds:Array<string>;
}

@InputType()
export class CreateDescriptionWithProductInput{
    @Field({nullable:true})
    title?:string;

    @Field()
    content:string;
}

@InputType()
export class CreatePriceWithProduct{
    @Field()
    label:string;

    @Field()
    amount:number;

    @Field(() => Currency, {nullable:true})
    currency:Currency;

    @Field(() => Boolean, { defaultValue:false })
    isMain:boolean;
}

@InputType()
export class CreatePictureWithProductInput{
    @Field()
    uri:string;

    @Field(() => Boolean, {defaultValue:false})
    isMain:boolean;
}