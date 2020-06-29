import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, PrimaryColumn, BeforeInsert} from "typeorm";
import { Description } from "./Description";
import { Price } from "./Price";
import { Promotion } from "./Promotion";
import { SubCategoryProduct } from "./SubCategoryProduct";
import { ObjectType, Field, ID } from "type-graphql";
import { PointOfSale } from "./PointOfSale";
import { PictureProduct } from "./PictureProduct";
import { generateid } from "../common/generateid";
import { CategoryPerson } from "./CategoryPerson";

export interface IProductConstructor{
    id?:string,
    name?:string,
    available?:boolean,
    youtubeVideoId?:string,
    newArrival?:boolean,
    inTheNew?:boolean,
    inTheNewSince?:Date,
    createdOn?:Date,
    updatedOn?:Date,
    colors?:Array<string>,
    tags?:Array<string>,
    pictures?:Array<PictureProduct>,
    descriptions?:Array<Description>,
    prices?:Array<Price>,
    subCategories?:Array<SubCategoryProduct>,
    pointsOfSale?:Array<PointOfSale>,
    promotions?:Array<Promotion>
}

@ObjectType()
@Entity()
export class Product {
    constructor(product?:IProductConstructor){
        if(product){
            const { 
                id, name, available, youtubeVideoId, newArrival, inTheNew, inTheNewSince, 
                createdOn, updatedOn, colors, tags, pictures, descriptions, prices, 
                subCategories, pointsOfSale, promotions 
            } = product;

            this.id = id;
            this.name = name;
            this.available = available;
            this.youtubeVideoId = youtubeVideoId;
            this.newArrival = newArrival;
            this.inTheNew = inTheNew;
            this.inTheNewSince = inTheNewSince;
            this.createdOn = createdOn;
            this.updatedOn = updatedOn;
            this.colors = colors;
            this.tags = tags;
            this.pictures = pictures;
            this.descriptions = descriptions;
            this.prices = prices;
            this.subCategories = subCategories;
            this.pointsOfSale = pointsOfSale;
            this.promotions = promotions;
            
        }
    }

    @BeforeInsert()
    private beforeInsert(){
        this.id = generateid('product')
    }

    @Field(() => ID)
    @PrimaryColumn('varchar', { length:30 })
    id:string;

    @Field()
    @Column()
    name:string;

    @Field()
    @Column({
        default:true
    })
    available:boolean;

    @Field({ nullable:true })
    @Column({
        nullable:true
    })
    youtubeVideoId:string;

    @Field()
    @Column({
        default:false
    })
    newArrival:boolean;

    @Field()
    @Column({
        default:false
    })
    inTheNew:boolean;

    @Field({ nullable:true })
    @Column({
        nullable:true,
        type:'timestamptz'
    })
    inTheNewSince:Date;

    @Field()
    @Column({
        type:'timestamptz'
    })
    createdOn:Date;

    @Field({ nullable:true })
    @Column({
        nullable:true,
        type:'timestamptz'
    })
    updatedOn:Date;

    @Field(() => [String], {nullable:true})
    @Column({
        nullable:true,
        type:'simple-array'
    })
    colors:Array<string>;

    @Field(() => [String], {nullable:true})
    @Column({
        nullable:true,
        type:'simple-array'
    })
    tags:Array<string>;

    @Field(() => [CategoryPerson])
    @ManyToMany(type => CategoryPerson, categoryPerson => categoryPerson.products)
    @JoinTable()
    categoriesPerson:Array<CategoryPerson>;

    @Field(() => [PictureProduct], {nullable:true})
    @OneToMany( type => PictureProduct, picture => picture.product)
    pictures:Array<PictureProduct>;

    @Field(() => [Description])
    @OneToMany(type => Description, description => description.product)
    descriptions:Array<Description>;

    @Field(() => [Price])
    @OneToMany(type => Price, price => price.product)
    prices:Array<Price>;

    @Field(() => [SubCategoryProduct])
    @ManyToMany(type => SubCategoryProduct, subCategory => subCategory.products)
    @JoinTable()
    subCategories:Array<SubCategoryProduct>;

    @Field(() => [PointOfSale])
    @ManyToMany(type => PointOfSale, pointOfSale => pointOfSale.products)
    @JoinTable()
    pointsOfSale:Array<PointOfSale>;

    @Field(() => [Promotion])
    @OneToMany(type => Promotion, promotion => promotion.product)
    promotions:Array<Promotion>;

}
