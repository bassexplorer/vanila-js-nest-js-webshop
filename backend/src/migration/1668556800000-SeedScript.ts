import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { Currency } from '../order/entities/currency.entity';

// This Seed script uses data provided by the lecturers

export class SeedScript1668556800000 implements MigrationInterface {
  name = 'SeedScript1668556800000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO productcategory (id, productCategoryName) VALUES
    (1, 'Video Games'),
    (2, 'Toys & Games'),
    (3, 'Appliances'),
    (4, 'Apps & Games'),
    (5, 'Arts, Crafts, & Sewing'),
    (6, 'Automotive Parts & Accessories'),
    (7, 'Baby'),
    (8, 'Beauty & Personal Care'),
    (9, 'Books'),
    (10, 'CDs & Vinyl'),
    (11, 'Cell Phones & Accessories'),
    (12, 'Clothing, Shoes and Jewelry'),
    (13, 'Collectibles & Fine Art'),
    (14, 'Computers'),
    (15, 'Electronics'),
    (16, 'Garden & Outdoor'),
    (17, 'Grocery & Gourmet Food'),
    (18, 'Handmade'),
    (19, 'Health, Household & Baby Care'),
    (20, 'Home & Kitchen'),
    (21, 'Industrial & Scientific'),
    (22, 'Kindle'),
    (23, 'Luggage & Travel Gear'),
    (24, 'Movies & TV'),
    (25, 'Musical Instruments'),
    (26, 'Office Products'),
    (27, 'Pet Supplies'),
    (28, 'Sports & Outdoors'),
    (29, 'Tools & Home Improvement');`);

    const currency = getRepository(Currency).create([
      {
        id: 'c000eba0-5ea2-11ec-bf63-0242ac130002',
        currencyName: 'Danish krone',
        iso4217Iso: 'DKK',
      },
      {
        id: 'c73acc4c-5ea2-11ec-bf63-0242ac130002',
        currencyName: 'Euro',
        iso4217Iso: 'EUR',
      },
      {
        id: 'cd178452-5ea2-11ec-bf63-0242ac130002',
        currencyName: 'Hungarian Forint',
        iso4217Iso: 'HUF',
      },
    ]);

    await getRepository(Currency).save(currency);

    await queryRunner.query(`INSERT INTO product (id, partNumber, name, price, description, productCategoryId, imageFile, createdAt, updatedAt, deletedAt, currencyId) VALUES
    (1, 'S63122D', 'Studiologic SL88 Studio', '600.66', NULL, 25, 'T6101XD.jpg', '2021-05-24 13:16:03', '2021-11-02 13:16:03', NULL, 'c000eba0-5ea2-11ec-bf63-0242ac130002'),
    (2, 'T381X2', 'Lenovo T480s', '102.69', NULL, 15, 'T22452.jpg', '2021-10-06 13:17:31', '2021-11-01 13:17:31', NULL, 'c000eba0-5ea2-11ec-bf63-0242ac130002'),
    (3, 'G1221', 'Female earrings (brand \"Loquat\")', '428.26', NULL, 18, 'T6383.jpg', NOW(), NOW(), NULL, 'c000eba0-5ea2-11ec-bf63-0242ac130002'),
    (4, 'V487XXA', 'I love you to the Moon and Back', '139.01', 'board book, illustrated', 9, 'M215.jpg', '2021-09-08 13:19:15', '2021-10-13 13:19:15', NULL, 'c000eba0-5ea2-11ec-bf63-0242ac130002'),
    (5, 'S63096A', 'KISSIK Lipstick set', '870.45', '12 colours, Mini matte, waterproof', 8, 'S82156A.jpg', '2020-09-02 13:20:25', '2021-05-04 13:20:25', NULL, 'c000eba0-5ea2-11ec-bf63-0242ac130002'),
    (6, 'V734', 'Kindle Oasis', '715.51', 'Adjustable warm light', 22, 'Y37031S.jpg', '2021-09-14 13:21:56', '2021-10-12 13:21:56', NULL, 'c000eba0-5ea2-11ec-bf63-0242ac130002'),
    (7, 'S1234', 'Topwit Electric Grill', '134.68', 'With Hot Pot, 2 in 1 indoor, non-stick', 3, 'F515.jpg', '2021-05-16 13:22:36', '2021-11-01 13:22:36', NULL, 'c000eba0-5ea2-11ec-bf63-0242ac130002'),
    (8, 'S66510A', 'Gewurztraminer Pierre', '473.62', NULL, 17, 'S50869D.jpg', '2021-04-16 13:26:24', '2021-11-01 13:26:24', NULL, 'c000eba0-5ea2-11ec-bf63-0242ac130002'),
    (9, 'M5134', 'Baby Nasal Aspirator', '59.56', 'Booger sucker, Mucus suction', 19, 'S46391.jpg', '2021-04-09 13:27:07', '2021-08-22 13:27:07', NULL, 'c000eba0-5ea2-11ec-bf63-0242ac130002'),
    (10, 'Z943', 'TimeZone C64 game', '858.53', 'Old school Commodore 64 game. Electronic download', 1, 'T63411D.jpg', '2021-03-24 13:28:05', '2021-11-01 13:28:05', NULL, 'c000eba0-5ea2-11ec-bf63-0242ac130002');`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('TRUNCATE product;');
    await queryRunner.query('TRUNCATE productcategory;');
  }
}
