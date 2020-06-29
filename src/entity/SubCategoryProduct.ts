import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Product } from "./Product";
import { CategoryProduct } from "./CategoryProduct";

export interface ISubCategoryProductConstructor{
    id?:number,
    name?:string,
    products?:Array<Product>,
    category?:CategoryProduct
}

@ObjectType()
@Entity()
export class SubCategoryProduct {
    constructor(subCategory?:ISubCategoryProductConstructor){
        if(subCategory){
            const { id, name, products, category } = subCategory;
            this.id = id;
            this.name = name;
            this.products = products;
            this.category = category;
        }
    }

    @Field(()=> Int)
    @PrimaryGeneratedColumn()
    id:number;

    @Field()
    @Column()
    name:string;

    @Field(()=> [Product])
    @ManyToMany(type => Product, product => product.subCategories)
    products:Array<Product>;

    @Field(() => CategoryProduct)
    @ManyToOne(type => CategoryProduct, category => category.subCategories)
    category:CategoryProduct;    

}
