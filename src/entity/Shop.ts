import {Entity, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, PrimaryColumn, BeforeInsert} from "typeorm";
import { User } from "./User";
import { PointOfSale } from "./PointOfSale";
import { FamilyProduct } from "./FamilyProduct";
import { ObjectType, Field, ID } from "type-graphql";
import { generateid } from "../common/generateid";
import { UserPreference } from "./UserPreference";

export interface IShopConstructor{
    id?:string,
    name?:string,
    logoUri?:string,
    photoUri?:string,
    createdOn?:Date,
    owner?:User,
    pointsOfSale?:Array<PointOfSale>,
    familyProductsForSale?:Array<FamilyProduct>
}

@ObjectType()
@Entity()
export class Shop {
    constructor(shop?:IShopConstructor){
        if(shop){
            const { id, name, logoUri, photoUri, createdOn, owner, pointsOfSale, familyProductsForSale } = shop
            this.id = id;
            this.name = name;
            this.logoUri = logoUri;
            this.photoUri = photoUri;
            this.createdOn = createdOn;
            this.owner = owner;
            this.pointsOfSale = pointsOfSale;
            this.familyProductsForSale = familyProductsForSale;
        }
    }

    @BeforeInsert()
    private beforeInsert(){
        this.id = generateid('shop')
    }

    @Field(() => ID)
    @PrimaryColumn('varchar', { length:30 })
    id:string;

    @Field()
    @Column()
    name:string;

    @Field({nullable:true})
    @Column({
        nullable:true
    })
    logoUri:string;
    
    @Field({nullable:true})
    @Column({
        nullable:true
    })
    photoUri:string;

    @Field()
    @Column({
        type:'timestamptz'
    })
    createdOn:Date;

    @Field(() => User)
    @ManyToOne(type => User, user => user.myShops)
    owner:User;

    @Field(() => [PointOfSale])
    @OneToMany(type => PointOfSale, pointOfSale => pointOfSale.shop)
    pointsOfSale:Array<PointOfSale>;

    @Field(() => [FamilyProduct])
    @ManyToMany(type => FamilyProduct, family => family.shopsThatSells)
    @JoinTable()
    familyProductsForSale:Array<FamilyProduct>;

    @Field(() => [UserPreference])
    @ManyToMany(type => UserPreference, userPreference => userPreference.shops)
    usersPreference:Array<UserPreference>;
}
