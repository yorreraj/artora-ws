import {Entity, Column, OneToMany, PrimaryColumn, BeforeInsert, OneToOne, JoinColumn} from "typeorm";
import { Shop } from "./Shop";
import { ObjectType, Field, registerEnumType, ID } from "type-graphql";
import { generateid } from "../common/generateid";
import { UserPreference } from "./UserPreference";

export enum Sex{
    FEMALE='F',
    MALE='M',
    NEUTRAL='N'
}

registerEnumType(Sex, {name:"Sex"})

export interface IUserConstructor{
    id?:string,
    name?:string,
    phone?:string,
    mail?:string,
    password?:string,
    createdOn?:Date,
    myShops?:Array<Shop>,
    activationKey?:string,
    activate?:boolean,
    thirdPartyUserId?:string,
    thirdPartyService?:string
}

@ObjectType()
@Entity()
export class User {
    constructor(shop?:IUserConstructor){
        if(shop){
            const { id, name, phone, mail, password, createdOn, myShops,activate, activationKey, thirdPartyUserId, thirdPartyService } = shop;
            this.id = id;
            this.name = name;
            this.phone = phone;
            this.mail = mail;
            this.password = password;
            this.createdOn = createdOn;
            this.myShops = myShops;
            this.activate = activate;
            this.activationKey = activationKey;
            this.thirdPartyUserId = thirdPartyUserId;
            this.thirdPartyService = thirdPartyService;
        }
    }

    @BeforeInsert()
    private beforeInsert(){
        this.id = generateid('user')
        this.createdOn = new Date()
    }

    @Field(() => ID)
    @PrimaryColumn('varchar', { length:30 })
    id:string;

    @Field()
    @Column()
    name:string;

    @Field({ nullable:true })
    @Column({
        nullable:true
    })
    phone:string;

    @Field({ nullable:true })
    @Column({
        nullable:true
    })
    mail:string;

    @Field({ nullable: true })
    @Column({ nullable:true })
    password:string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    thirdPartyUserId:string;

    @Field({ nullable: true })
    @Column({ nullable:true })
    thirdPartyService:string;

    @Field({ defaultValue:false })
    @Column({
        default:false
    })
    activate:boolean;

    @Column({
        nullable:true
    })
    activationKey:string;

    @Field(() => UserPreference)
    @OneToOne(type => UserPreference, userPreference => userPreference.owner)
    preference:UserPreference;

    @Field()
    @Column({
        type:'timestamptz'
    })
    createdOn:Date;

    @Field()
    @Column({
        type:'timestamptz',
        nullable:true
    })
    updatedOn:Date;

    @Field(() => [Shop])
    @OneToMany(type => Shop, shop => shop.owner)
    myShops:Array<Shop>;


}
