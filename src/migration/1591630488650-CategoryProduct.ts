import {MigrationInterface, QueryRunner} from "typeorm";

const FAMILIES_PRODUCT = [
    {
        name:"Agriculture & Produits alimentaires",
        coverPictureUri:"https://fredericgabriel.be/wp-content/uploads/2017/05/intro_cream_of_crop.jpg",
        categories:[
            {
                name:"Agriculture",
                subCategories:[
                    "Agriculture", "Produits d'origine animale", "Les haricots",
                    "Grains de café", "Alimentation d'élévage", "Fruit", "Champignons",
                    "Noix et grains", "Plantes ornementales", "Autres produits agricoles",
                    "Huile végétale", "Graines & bulbes des plantes", "Gousse de vanille",
                    "Légumes"
                ]
            },
            {
                name:"Produits alimentaires",
                subCategories:[
                    "Boissons alcolisées", "Alimentation pour bébé", "Pâtisserie",
                    "Café", "Sucrerie", "Produits laitiers", "Eau potable", "Oeufs & ovoproduits",
                    "Additifs alimentaires", "Fruits", "Céréales", "Produits de miel", "Viandes et volailles",
                    "Autres nourritures et boissons", "Fruits de mer", "Assaisonnement", "Snacks"
                ]
            }
        ]
    },
    {
        name:"Vêtements, Textiles et Accessoires",
        coverPictureUri:"https://www.centrecommercial-lomme.com/files/2015/03/dsc0245055142caebad80.jpg",
        categories:[
            {
                name:"Vêtements",
                subCategories:[
                    "Vêtements de garçon", "Costumes folkloriques", "Accessoires vêtements", 
                    "Vêtements de fille", "Vêtements bébé & enfants", "Vêtements de maternité",
                    "Vêtements d'hommes", "Matériels de couture", "Vêtements de sport",
                    "Robe de soirée", "Vêtements d'occasion", "Robe de mariée et accessoires",
                    "Vêtements de femmes"
                ]
            },
            {
                name:"Textile et Cuir",
                subCategories:[
                    "Tissu", "Fourrure", "Cuir", "Textiles", "100% coton",
                    "100% polyester", "Literie", "Serviette", "Housse chaise"
                ]
            },
            {
                name:"Bijoux fantaisie",
                subCategories:[
                    "Montres", "Colliers et accessoires", "Bracelet", "Boucle d'oreilles",
                    "Lots de bijoux", "Perles en vrac", "Collier", "Pendentif et breloques",
                    "Anneaux"
                ]
            },
            {
                name:"Montres, lunettes, gants",
                subCategories:[
                    "Lunettes", "Ceinture & Accessoires", "Monture", "Lunettes de soleil",
                    "Lunettes de sport", "Gants", "Boutons de manchette & pinces à cravate",
                    "bonnet & gants", "Echarpes et châles", "Accessoires de coiffure"
                ]
            }
        ]
    },
    {
        name:"Auto",
        coverPictureUri:"https://images.midilibre.fr/api/v1/images/view/5dca90418fe56f7f27318865/large/image.jpg",
        categories:[
            {
                name:"Véhicules et Accessoires",
                subCategories:[
                    "Automobile", "Camion Pièces & Accessoires", "Motos et Scooters",
                    "Auto Pièces & Accessoires", "Vtt et Utv", "Autre Véhicule Pièces & Accessoires"
                ]
            }
        ]
    },
    {
        name:"Sacs & Chaussures",
        coverPictureUri:"https://www.mangoandsalt.com/wp-content/uploads/2016/04/accessoires-vegan-rose-beige.jpg",
        categories:[
            {
                name:"Sacs et valises",
                subCategories:[
                    "Valises", "Sacs pour équipements numériques & appareils photo",
                    "Sacs à main & sac en bandoulière", "Sacs de sports & ville",
                    "Porte-feuilles & autres", "Sac à chariot", "Sacs & trousses pour cosmétiques",
                    "Sac à main", "Sac à dos"
                ]
            },
            {
                name:"Chaussures et Accessoires",
                subCategories:[
                    "Chaussures de bébé", "Chaussures d'enfant", "Chaussures de danse",
                    "Chaussures d'hommes", "Equipement de réparation de chaussures",
                    "Chaussures de sport", "Chaussures d'occasion", "Chaussures de femmes"
                ]
            }
        ]
    },
    {
        name:"Électronique",
        coverPictureUri:"https://p4.storage.canalblog.com/43/80/1598705/119439288.jpg",
        categories:[
            {
                name:"Grand public",
                subCategories:[
                    "Ordinateur et accessoires", "Cigarettes électroniques", "Appareil-photo, photo et accessoires",
                    "Téléphone portable et accessoires", "Autres appareils électroniques", "Jeu vidéo et accessoires",
                    "Casque & écouteur", "Appareils photo numériques", "Accessoires Radio & TV",
                    "Haut-parleur", "Téléviseur", "Câbles", "Chargeur", "Batterie digitale"
                ]
            },
            {
                name:"Appareil Ménager",
                subCategories:[
                    "Climatisation", "Dispositifs de nettoyage", "Sèche-cheveux",
                    "Pièces d'appareils d'utilité domestique", "Appareils de cuisine",
                    "Dispositif de lessive", "Autres appareils électroménagers", 
                    "Réfrigérateurs et congélateurs", "Chauffe-eau", "Distributeur de lingettes",
                    "Ventilateur", "Aspirateur", "Machine à café", "Mixeur"
                ]
            },
            {
                name:"Sécurité et protection",
                subCategories:[
                    "Serrures et Clés", "Équipement De Protection", "Système de contrôle d'accès",
                    "Sirène", "Produits de lutte contre l'incendie", "Fournitures de serrurier",
                    "Autres produits de sécurité & protection", "La sécurité routière",
                    "Coffre-fort", "Produits pour défense personnelle", "Caméra CCTV",
                    "Alarmes d'incendie"
                ]
            }
        ]
    },
    {
        name:"Équipements électrique",
        coverPictureUri:"https://www.bricolex.fr/wp-content/uploads/2015/03/electricite.jpg",
        categories:[
            {
                name:"Equipement électriques",
                subCategories:[
                    "Batterie", "Instruments électriques", "Disjoncteur", "Connecteurs et terminaux",
                    "Moteur", "Fournitures électriques", "Générateur", "Accessoires d'alimentation de courant",
                    "Equipements de distribution d'énergie", "Alimentation de courant", "Audio, vidéo et éclairage professionnels",
                    "Interrupteurs", "Transformateur", "Fils, câbles & composants de câbles", "Accessoires de câblage",
                    "Panneaux solaires"
                ]
            }
        ]
    },
    {
        name:"Cadeaux, Sports & Jouets",
        coverPictureUri:"https://pasadena.augusoft.net/customers/PAS/Images/subcategory/Sports1.jpg",
        categories:[
            {
                name:"Sports et Loisirs",
                subCategories:[
                    "Gazon artificiels & sol de locaux de sports", "Fitness & musculation",
                    "Golf", "Instruments de musique", "Instruments de musique",
                    "Autres produits de sports & loisirs", "Gants de sport", "Tennis",
                    "Sports nautiques", "Camping & randonnée", "Equipement de gymnastique"
                ]
            },
            {
                name:"Cadeaux & Article de fête",
                subCategories:[
                    "Arts & collection", "Artisanat", "Articles pour fêtes et soirées",
                    "Cadeaux de fête", "Décoration intérieure", "Porte-clés", "Tricot & crochet",
                    "Boîte à musique", "Poterie", "Sculpture", "Auto-collants", "Décoraion de mariage"
                ]
            },
            {
                name:"Jouets",
                subCategories:[
                    "Jouets pour bébé", "Poupées", "Jouets éducatifs",
                    "Autres jouets & loisirs", "Accessoires jouets"
                ]
            }
        ]
    },
    {
        name:"Santé & Beauté",
        coverPictureUri:"https://cap.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcap.2F2017.2F05.2F12.2Feeeb4a2a-224d-4cf7-92dd-d2686710e058.2Ejpeg/750x375/background-color/ffffff/quality/70/medecine-esthetique-le-materiel-dernier-cri-exige-d-enormes-investissements-882170.jpg",
        categories:[
            {
                name:"Santé et médecine",
                subCategories:[
                    "Médecine brute", "Médecines brevetées traditionnelles",
                    "Equipements de traitement et de circulation des fluides corporels",
                    "Equipement dentaire", "Equipements de désinfection"
                ]
            },
            {
                name:"Beauté & bien-être",
                subCategories:[
                    "Produits pour bébés", "Fourniture de toilette", "Equipement de beauté",
                    "Hygiène féminine", "Parfums & déodorants", "Soins des cheveux",
                    "Extensions et perruques de cheveux", "Equipements de salon de coiffure",
                    "Produits cosmétiques", "Outils de maquillage", "Hygiène bucco-dentaire",
                    "Autres produits de beauté & bien-être", "Rasage & épilation", "Outils de soins de la peau"
                ]
            }
        ]
    },
    {
        name:"Outils de Construction,maison, Lumières",
        coverPictureUri:"https://monsitemada.com/wp-content/uploads/2016/10/quincaillerie-tamatave-brico-est-madagascar-1.jpg",
        categories:[
            {
                name:"Ouils de Construction et immobilier",
                subCategories:[
                    "Planches", "Verre de construction", "Plafond", "Mur-rideaux & accessoires",
                    "Accessoires porte & fenêtres", "Portes & fenêtres", "Escalier roulant & composants",
                    "Robinet", "Matériaux ininflammables", "Systèmes de chauffage au sol & pièces",
                    "Revêtement de sol & accessoires", "Portails", "Échelles et les échafaudages",
                    "Matériaux de maçonnerie", "Matériaux métalliques de construction", 
                    "Moulures", "Matériaux d'insonorisation", "Escaliers & pièces d'escalier",
                    "Véranda et Glass House", "Tuiles & accessoires", "Bois", "Papiers peints/enduit de mur"
                ]
            },
            {
                name:"Maison & Jardin",
                subCategories:[
                    "Ustensiles de cuisson au four", "Vaisselle de bars", "Outils de cuisson",
                    "Ustensiles de cuisine", "Fourniture de jardinage", "Décoration maison",
                    "Produits chimiques ménagers", "Outils et accessoires de nettoyage pour ménage",
                    "Produits pour animaux domestiques", "Vaisselle pour les Grandes Occasions"
                ]
            },
            {
                name:"Lumière et éclairage",
                subCategories:[
                    "Éclairage", "Accessoires d'éclairage", "Ampoules & tubes d'éclairage",
                    "Lustre", "Plafonnier", "Lumières en cristal", "Lumières d'étape",
                    "Lampadaires de rue", "Ampoules écologiques & fluorescent", "LED"
                ]
            },
            {
                name:"Meubles",
                subCategories:[
                    "Mobilier antique", "Meubles bébé", "Meubles", "Meubles pour enfants",
                    "Mobilier de bureau", "Accessoires meubles", "Pièces de meubles",
                    "Autres meubles", "Meubles de salon", "Mobilier de chambre à coucher"
                ]
            }
        ]
    },
    {
        name:" Emballage, Fournitures de bureau & scolaires",
        coverPictureUri:"https://cap.img.pmdstatic.net/fit/http.3A.2F.2Fprd2-bone-image.2Es3-website-eu-west-1.2Eamazonaws.2Ecom.2Fcap.2F2019.2F09.2F03.2Fdc176c5e-8e8c-4998-b7b3-a9ed209d124d.2Ejpeg/750x375/background-color/ffffff/quality/70/fournitures-scolaires-qui-est-le-moins-cher-entre-leclerc-carrefour-auchan-et-les-autres-1349045.jpg",
        categories:[
            {
                name:"Emballage & Impression",
                subCategories:[
                    "Ruban adhésif", "Feuille d'aluminium", "Emballage vêtements",
                    "Emballage des produits chimiques", "Emballage cadeau", "Couvercle, bouchon, fermetures",
                    "Autres matériels d'emballage", "Sacs d'emballage", "Etiquettes d'emballage",
                    "Barquettes d'emballage", "Papier& carton", "Matériels d'imprimerie"
                ]
            },
            {
                name:"Fournitures de bureau & scolaires",
                subCategories:[
                    "Gomme à effacer", "Chemises de livre", "Livres", "Calendrier",
                    "Presse-papiers", "Outils de correction", "Trieur de bureau",
                    "Fournitures de dessin", "Fournitures scolaires", "Produits de classement",
                    "Bloc de lettres / papier", "Revues", "Carte", "Cahiers et blocs-notes",
                    "Adhésifs et ruban adhésif pour bureau", "Fourniture de bureau pour reliure",
                    "Fournitures de bureau pour la coupe", "Équipement de bureau", "Papier de fourniture bureau",
                    "Autres fournitures bureau & scolaires", "Enveloppe papier", "Trousse et boîte à crayons",
                    "Taille-crayon", "Fournitures pour imprimante", "Timbres", "Ensemble de papeterie",
                    "Pochoirs", "Outils d’écriture"
                ]
            }
        ]
    }
]

export class CategoryProduct1591630488650 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        let categoryCounter = 0
        await Promise.all(
            FAMILIES_PRODUCT.map((family, familyId)=>Promise.all([
                queryRunner.query(`INSERT INTO family_product ("name", "coverPictureUri") VALUES('${family.name.replace(/'/g,"''")}', '${family.coverPictureUri}')`),
                Promise.all(family.categories.map((category)=>{
                    categoryCounter++
                    Promise.all([
                        queryRunner.query(`INSERT INTO category_product ("name", "familyId") VALUES('${category.name.replace(/'/g,"''")}', '${familyId+1}')`),
                        Promise.all(category.subCategories.map(subCategory=>
                            queryRunner.query(`INSERT INTO sub_category_product ("name", "categoryId") VALUES('${subCategory.replace(/'/g,"''")}', '${categoryCounter}')`)
                        ))
                    ])
                }))
            ]))
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
