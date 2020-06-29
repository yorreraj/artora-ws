import {Entity, Column, ManyToOne, PrimaryColumn, BeforeInsert} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Product } from "./Product";
import { generateid } from "../common/generateid";

export interface IPictureProduct{
    id?:string, 
    uri?:string,
    isMain?:boolean,
    product?:Product
}

@ObjectType()
@Entity()
export class PictureProduct {
    constructor(picture?:IPictureProduct){
        if(picture){
            const { id, uri, isMain, product } = picture;
            this.id = id;
            this.uri = uri;
            this.isMain = isMain;
            this.product = product;
        }
    }

    @BeforeInsert()
    private beforeInsert(){
        this.id = generateid('picture')
    }

    @Field(() => ID)
    @PrimaryColumn('varchar', { length:30 })
    id:string;

    @Field()
    @Column()
    uri:string;

    @Field(() => Boolean, {defaultValue:false})
    @Column({default:false})
    isMain:boolean;

    @Field(() => Product)
    @ManyToOne(type => Product, product => product.pictures)
    product:Product;
}
