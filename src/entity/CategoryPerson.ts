import {Entity, Column, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Product } from "./Product";
import { UserPreference } from "./UserPreference";

@ObjectType()
@Entity()
export class CategoryPerson {
    constructor(id?:number){
        if(id){
            this.id = id;
        }
    }

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id:number;

    @Field()
    @Column()
    name:string;

    @Field(() => [Product])
    @ManyToMany(type => Product, product => product.categoriesPerson)
    products:Array<Product>;

    @Field(() => [UserPreference])
    @ManyToMany(type => UserPreference, userPreference => userPreference.categoriesPerson)
    usersPreference:Array<UserPreference>;
}
