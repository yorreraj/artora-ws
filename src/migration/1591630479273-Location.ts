import {MigrationInterface, QueryRunner} from "typeorm";

const PROVINCES = [
    {
        name:"Antananarivo",
        cities:[
            {
                name:"Anatananarivo",
                quarters:["Analakely", "Behoririka", "Antanimena", "Ankorondrano", "67 Ha", "Andravoahangy", "Betongolo", "Alasora"]
            }
        ]
    }
]

export class Location1591630479273 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await Promise.all(
            PROVINCES.map((province, provinceId) => Promise.all([
                queryRunner.query(`INSERT INTO province ("name") VALUES('${province.name}')`),
                Promise.all(
                    province.cities.map((city, cityId) => Promise.all([
                        queryRunner.query(`INSERT INTO city ("name", "provinceId") VALUES('${city.name}', '${provinceId+1}')`),
                        Promise.all(
                            city.quarters.map(quarter => 
                                queryRunner.query(`INSERT INTO quarter ("name", "cityId") VALUES('${quarter}', '${cityId+1}')`)
                            )
                        )
                    ]))
                )
            ]))
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
