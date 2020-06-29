import { Resolver, Mutation, Arg } from "type-graphql";
import { PointOfSale } from "../entity/PointOfSale";
import { CreatePointOfSaleInput } from "../inputs/CreatePointOfSaleInput";
import { getCustomRepository } from "typeorm";

@Resolver()
export class PointOfSaleResolver{
    @Mutation(() => PointOfSale)
    async createPointOfSale(@Arg("pointOfSale") data:CreatePointOfSaleInput){
        return await getCustomRepository(PointOfSaleResolver).createPointOfSale(data)
    }
}