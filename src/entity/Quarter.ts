import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { City } from "./City";
import { PointOfSale } from "./PointOfSale";
import { ObjectType, Field, Int } from "type-graphql";

export interface IQuarterConstructor{
    id?:number,
    name?:string,
    pointsOfSale?:Array<PointOfSale>,
    city?:City;
}

@ObjectType()
@Entity()
export class Quarter {
    constructor(quarter:IQuarterConstructor){
        if(quarter){
            const { id, name, pointsOfSale, city } = quarter
            this.id = id;
            this.name = name;
            this.pointsOfSale = pointsOfSale;
            this.city = city;
        }
    }

    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id:number;

    @Field()
    @Column()
    name:string;

    @Field(() => [PointOfSale])
    @OneToMany(type => PointOfSale, pointOfSale => pointOfSale.quarter)
    pointsOfSale:Array<PointOfSale>;

    @Field(() => City)
    @ManyToOne(type => City, city => city.quarters)
    city:City;
}
