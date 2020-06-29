import {Entity, Column, ManyToOne, ManyToMany, PrimaryColumn, BeforeInsert} from "typeorm";
import { Shop } from "./Shop";
import { Quarter } from "./Quarter";
import { ObjectType, Field, ID } from "type-graphql";
import { Coordinate } from "../common/Coordinate";
import { Product } from "./Product";
import { generateid } from "../common/generateid";

export interface IPointOfSaleConstructor{
    id?:string,
    name?:string,
    location?:string,
    coordinate?:Coordinate,
    mainPointOfSale?:boolean,
    shop?:Shop,
    quarter?:Quarter,
    products?:Array<Product>
}

@ObjectType()
@Entity()
export class PointOfSale {
    constructor(pointOfSale:IPointOfSaleConstructor){
        if(pointOfSale){
            const { id, name, location, coordinate, mainPointOfSale, shop, quarter, products } = pointOfSale;
            this.id = id;
            this.name = name;
            this.location = location;
            this.coordinate = coordinate;
            this.mainPointOfSale = mainPointOfSale;
            this.shop = shop;
            this.quarter = quarter;
            this.products = products;
        }
    }

    @BeforeInsert()
    private beforeInsert(){
        this.id = generateid('pointofsale')
    }

    @Field(() => ID)
    @PrimaryColumn('varchar', { length:30 })
    id:string;

    @Field({ nullable:true })
    @Column({
        nullable:true
    })
    name:string;

    @Field()
    @Column('text')
    location:string;

    @Field(() => Coordinate, { nullable: true })
    @Column({
        type:'simple-json',
        nullable:true
    })
    coordinate:Coordinate;

    @Field()
    @Column({
        default:false
    })
    mainPointOfSale:boolean;

    @Field(() => Shop)
    @ManyToOne(type => Shop, shop => shop.pointsOfSale)
    shop:Shop;

    @Field(() => Quarter)
    @ManyToOne(type => Quarter, quarter => quarter.pointsOfSale)
    quarter:Quarter;

    @Field(() => [Product])
    @ManyToMany(type => Product, product => product.pointsOfSale)
    products:Array<Product>;
}
