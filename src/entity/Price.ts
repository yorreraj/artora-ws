import {Entity, Column, ManyToOne, PrimaryColumn, BeforeInsert} from "typeorm";
import { Product } from "./Product";
import { Promotion } from "./Promotion";
import { ObjectType, Field, registerEnumType, ID } from "type-graphql";
import { generateid } from "../common/generateid";

export enum Currency{
    "ARIARY"="AR",
    "EURO"="EUR",
    "DOLLAR"="USD"
}

registerEnumType(Currency, { name:"Currency" })

export interface IPriceConstructor{
    id?:string,
    label?:string,
    amount?:number,
    currency?:Currency,
    product?:Product,
    promotion?:Promotion,
    isMain?:boolean
}

@ObjectType()
@Entity()
export class Price {
    constructor(price?:IPriceConstructor){
        if(price){
            const { id, label, amount, currency, product, promotion, isMain } = price;
            this.id = id;
            this.label = label;
            this.amount = amount;
            this.currency = currency;
            this.product = product;
            this.promotion = promotion;
            this.isMain = isMain;
        }
    }

    @BeforeInsert()
    private beforeInsert(){
        this.id = generateid('price')
    }

    @Field(() => ID)
    @PrimaryColumn('varchar', { length:30 })
    id:string;

    @Field()
    @Column()
    label:string;

    @Field()
    @Column()
    amount:number;

    @Field(() => Currency)
    @Column({
        type:'enum',
        enum:Currency,
        default:Currency.ARIARY
    })
    currency:Currency;

    @Field(() => Boolean)
    @Column({default:false})
    isMain:boolean;

    @Field(() => Product)
    @ManyToOne(type => Product, product => product.prices, {onDelete:'CASCADE'})
    product:Product;

    @Field(() => Promotion)
    @ManyToOne(type => Promotion, promotion => promotion.prices)
    promotion:Promotion;
}
