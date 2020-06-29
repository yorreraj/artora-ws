import {MigrationInterface, QueryRunner} from "typeorm";

const CATEGORIES_PERSON = ["Fille", "Garçon", "Adolescant", "Adolescante", "Femme", "Homme", "Vieux", "Vieille"]

export class CategoryPerson1593327731739 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await Promise.all(CATEGORIES_PERSON.map( category =>
            queryRunner.query(`INSERT INTO category_person ("name") VALUES('${category}')`)
        ))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
