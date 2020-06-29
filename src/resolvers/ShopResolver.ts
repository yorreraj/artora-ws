import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Shop } from "../entity/Shop";
import { CreateShopInput } from "../inputs/ShopInput";
import { getCustomRepository } from "typeorm";
import { FamilyProduct } from "../entity/FamilyProduct";
import { FamilyProductRepository } from "../custom-repository/FamilyProductRepository";
import { ShopRepository } from "../custom-repository/ShopRepository";
import { Product } from "../entity/Product";
import { ProductRepository } from "../custom-repository/ProductRepository";

@Resolver()
export class ShopResolver{
    @Mutation(() => Shop)
    async createShop(@Arg("shop") data: CreateShopInput){
        return await getCustomRepository(ShopRepository).createShop(data) 
    }

    @Query(() => [Shop])
    async shops(){
        return await getCustomRepository(ShopRepository).getAllShops()
    }

    @Query(() => [FamilyProduct])
    async familiesOfProductsInShop(@Arg("shopId") shopId:string){
        return await getCustomRepository(FamilyProductRepository).getFamiliesProductInShop(shopId)
    }

    @Query(() => [Product])
    async newProductsFromShop(@Arg("shopId") shopId:string){
        return await getCustomRepository(ProductRepository).getNewProductsFromShop(shopId)
    }
}