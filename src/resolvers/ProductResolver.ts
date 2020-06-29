import { Resolver, Mutation, Arg, Query, Args } from "type-graphql";
import { Product } from "../entity/Product";
import { CreateProductInput } from "../inputs/CreateProductInput";
import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../custom-repository/ProductRepository";

@Resolver()
export class ProductResolver{
    @Mutation(() => Product)
    async createProduct(@Arg("product") data:CreateProductInput){
        return await getCustomRepository(ProductRepository).createProduct(data)
    }

    @Query(() => [Product])
    async products(@Arg('offset') offset:number, @Arg('limit') limit:number){
        return await getCustomRepository(ProductRepository).getAllProducts(offset, limit)
    }

    @Mutation(() => String)
    async deleteProduct(@Arg("productId") productId:string){
        return await getCustomRepository(ProductRepository).deleteProduct(productId)
    }

    @Query(() => [Product])
    async newProductsFromShop(@Arg("shopId") shopId:string){
        return await getCustomRepository(ProductRepository).getNewProductsFromShop(shopId)
    }

    @Query(() => Product, {nullable:true})
    async product(@Arg("productId") productId:string){
        return await getCustomRepository(ProductRepository).getProductById(productId)
    }
}