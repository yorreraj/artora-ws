import "reflect-metadata";
import {createConnection} from "typeorm";
import { ApolloServer } from 'apollo-server';
import {buildSchema} from 'type-graphql';
import { UserResolver } from "./resolvers/UserResolver";
import { ShopResolver } from "./resolvers/ShopResolver";
import { PointOfSaleResolver } from "./resolvers/PointOfSaleResolver";
import { ProductResolver } from "./resolvers/ProductResolver";
import { MockDataResolver } from "./resolvers/MockDataResolver";
import { FamilyProductResolver } from "./resolvers/FamilyProductResolver";
import { UserPreferenceResolver } from "./resolvers/UserPreferenceResolver";

createConnection().then(async connection => {
    const schema = await buildSchema({
        resolvers:[
            UserResolver, ShopResolver, PointOfSaleResolver, 
            ProductResolver, MockDataResolver, FamilyProductResolver, UserPreferenceResolver
        ]
    })
    const server = new ApolloServer({schema})
    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`);
    });
}).catch(error => console.log(error));
