import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, ManyToMany} from "typeorm";
import { SubCategoryProduct } from "./SubCategoryProduct";
import { FamilyProduct } from "./FamilyProduct";
import { ObjectType, Field, Int } from "type-graphql";
import { UserPreference } from "./UserPreference";

@ObjectType()
@Entity()
export class CategoryProduct {
    constructor(id?:number){
        if(id)
            this.id = id
    }

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id:number;

    @Field()
    @Column()
    name:string;

    @Field(()=>[SubCategoryProduct])
    @OneToMany(type => SubCategoryProduct, subCategory => subCategory.category)
    subCategories:Array<SubCategoryProduct>;

    @Field(() => FamilyProduct)
    @ManyToOne(type => FamilyProduct, family => family.categories)
    family:FamilyProduct;

    @Field(() => [UserPreference])
    @ManyToMany(type => UserPreference, userPreference => userPreference.categoriesProduct)
    usersPreference:Array<UserPreference>;
}
