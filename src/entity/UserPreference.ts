import {Entity, PrimaryColumn, BeforeInsert, OneToOne, ManyToMany, JoinTable, JoinColumn} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { generateid } from "../common/generateid";
import { User } from "./User";
import { CategoryPerson } from "./CategoryPerson";
import { CategoryProduct } from "./CategoryProduct";
import { Shop } from "./Shop";

@ObjectType()
@Entity()
export class UserPreference {
    @Field(() => ID)
    @PrimaryColumn('varchar', { length:30 })
    id:string;

    @Field(() => User)
    @OneToOne(type => User, user => user.preference)
    @JoinColumn()
    owner:User;

    @Field(() => [CategoryPerson])
    @ManyToMany(type => CategoryPerson, categoryPerson => categoryPerson.usersPreference)
    @JoinTable()
    categoriesPerson:Array<CategoryPerson>;

    @Field(() => [CategoryProduct])
    @ManyToMany(type => CategoryProduct, categoryProduct => categoryProduct.usersPreference)
    @JoinTable()
    categoriesProduct:Array<CategoryProduct>;

    @Field(() => [Shop])
    @ManyToMany(type => Shop, shop => shop.usersPreference)
    @JoinTable()
    shops:Array<Shop>;

    @BeforeInsert()
    private beforeInsert(){
        this.id = generateid('user-prefence')
    }
}
