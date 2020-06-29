import {Entity, PrimaryGeneratedColumn, Column, OneToOne} from "typeorm";
import { City } from "./City";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity()
export class Province {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id:number;

    @Field()
    @Column()
    name:string;

    @Field(() => [City])
    @OneToOne(type => City, city => city.province)
    cities:Array<City>;

}
