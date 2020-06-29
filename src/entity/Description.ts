import {Entity, Column, ManyToOne, PrimaryColumn, BeforeInsert} from "typeorm";
import { Product } from "./Product";
import { ObjectType, Field, ID } from "type-graphql";
import { generateid } from "../common/generateid";

export interface IDescriptionConstructor{
    id?:string,
    title?:string,
    content?:string,
    product?:Product
}

@ObjectType()
@Entity()
export class Description {
    constructor(description?:IDescriptionConstructor){
        if(description){
            const { id, title, content, product } = description;
            this.id = id;
            this.title = title;
            this.content = content;
            this.product = product;
        }
    }

    @BeforeInsert()
    private beforeInsert(){
        this.id = generateid('description')
    }

    @Field(() => ID)
    @PrimaryColumn('varchar', { length:30 })
    id:string;

    @Field({nullable:true})
    @Column({
        nullable:true
    })
    title:string;

    @Field()
    @Column({
        type:'text'
    })
    content:string;

    @Field(() => Product)
    @ManyToOne(type => Product, product => product.descriptions, {onDelete: 'CASCADE'})
    product:Product;

}
