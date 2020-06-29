import { Resolver, Mutation, Arg } from "type-graphql";
import { UserPreference } from "../entity/UserPreference";
import { UserPreferenceInput } from "../inputs/UserPreferenceInput";
import { getCustomRepository } from "typeorm";
import { UserPreferenceRepository } from "../custom-repository/UserPreferenceRepository";

@Resolver()
export class UserPreferenceResolver{
    @Mutation(() => UserPreference)
    async saveUserPreference(@Arg("preference") data: UserPreferenceInput){
        return await getCustomRepository(UserPreferenceRepository).savePreference(data)
    }
}