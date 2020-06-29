import { ObjectType, Field } from "type-graphql"

@ObjectType()
export class Coordinate{
    constructor(coordinate?:{longitude:number, latitude:number}){
        if(coordinate){
            this.longitude = coordinate.longitude
            this.latitude = coordinate.latitude
        }
    }

    @Field()
    longitude:number

    @Field()
    latitude:number
}