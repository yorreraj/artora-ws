import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from "typeorm";
import {Quarter} from './Quarter';
import { Province } from "./Province";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class City {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id:number;

    @Field()
    @Column()
    name:string;

    @Field(()=> [Quarter])
    @OneToMany(type => Quarter, quarter => quarter.city)
    quarters:Array<Quarter>;

    @Field(() => Province)
    @ManyToOne(type => Province, province => province.cities)
    province:Province;
}
