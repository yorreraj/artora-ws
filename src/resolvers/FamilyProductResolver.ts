import { Resolver, Query } from "type-graphql";
import { FamilyProduct } from "../entity/FamilyProduct";
import { getCustomRepository } from "typeorm";
import { FamilyProductRepository } from "../custom-repository/FamilyProductRepository";

@Resolver()
export class FamilyProductResolver{
    @Query(() => [FamilyProduct])
    async familiesProduct(){
        return await getCustomRepository(FamilyProductRepository).getAllFamilies()
    }
}