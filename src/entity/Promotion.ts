import {Entity, Column, OneToMany, ManyToOne, PrimaryColumn, BeforeInsert} from "typeorm";
import { Price } from "./Price";
import { Product } from "./Product";
import { ObjectType, Field, ID } from "type-graphql";
import { generateid } from "../common/generateid";

@ObjectType()
@Entity()
export class Promotion {

    @BeforeInsert()
    private beforeInsert(){
        this.id = generateid('promotion')
    }

    @Field(() => ID)
    @PrimaryColumn('varchar', { length:30 })
    id:string;

    @Field({ nullable:true })
    @Column({
        nullable:true,
        type:'text'
    })
    reason:string;

    @Field()
    @Column({
        type:'timestamptz'
    })
    startDate:Date;

    @Field()
    @Column({
        type:'timestamptz'
    })
    endDate:Date;

    @Field(() => Product)
    @ManyToOne(type => Product, product => product.promotions)
    product:Product;

    @Field(() => [Price])
    @OneToMany(type => Price, price => price.promotion)
    prices:Array<Price>

}
