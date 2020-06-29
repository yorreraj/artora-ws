import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany} from "typeorm";
import { CategoryProduct } from "./CategoryProduct";
import { Shop } from "./Shop";
import { ObjectType, Field, Int } from "type-graphql";

export interface IFamilyProductConstructor{
    id?:number,
    name?:string,
    coverPictureUri?:string,
    categories?:Array<CategoryProduct>,
    shopsThatSells?:Array<Shop>
}


@ObjectType()
@Entity()
export class FamilyProduct {
    constructor(family?:IFamilyProductConstructor){
        if(family){
            const { id, name, coverPictureUri, categories, shopsThatSells } = family
            this.id = id;
            this.name = name;
            this.coverPictureUri = coverPictureUri;
            this.categories = categories;
            this.shopsThatSells = shopsThatSells;
        }
    }

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id:number;

    @Field()
    @Column()
    name:string;

    @Field({nullable:true})
    @Column({
        nullable:true
    })
    coverPictureUri:string;

    @Field(()=> [CategoryProduct])
    @OneToMany(type => CategoryProduct, category => category.family)
    categories:Array<CategoryProduct>;

    @Field(()=> [Shop])
    @ManyToMany(type => Shop, shop => shop.familyProductsForSale)
    shopsThatSells:Array<Shop>;
}
