import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1654710243696 implements MigrationInterface {
    name = 'initial1654710243696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment_prepares" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "seller_id" uuid NOT NULL, "buyer_id" uuid NOT NULL, "merchant_uid" character varying, "product_id" integer NOT NULL, "amount" integer NOT NULL, "payment_id" character varying, "sellerId" uuid, "buyerId" uuid, "userId" uuid, CONSTRAINT "REL_c6dc17e2ae42eb84f91e3caf6f" UNIQUE ("userId"), CONSTRAINT "PK_2a2953071a8f7fbbf849512d72f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment_cancels" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "payment_id" uuid NOT NULL DEFAULT '7e5f0280-db53-11ec-9d64-0242ac120002', "amount" integer, "sellerId" uuid, CONSTRAINT "PK_e69cada5657941d36a1c18d55d8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "seller_id" uuid NOT NULL, "buyer_id" uuid NOT NULL, "card_id" uuid, "payment_prepare_id" character varying NOT NULL, "imp_uid" character varying, "merchant_uid" character varying, "pay_method" character varying, "channel" character varying, "pg_provider" character varying, "emb_pg_provider" character varying, "pg_tid" character varying, "pg_id" character varying, "escrow" boolean, "apply_num" character varying, "bank_code" character varying, "bank_name" character varying, "card_code" character varying, "card_name" character varying, "card_quota" integer, "card_number" character varying, "card_type" character varying, "vbank_code" character varying, "vbank_name" character varying, "vbank_num" character varying, "vbank_holder" character varying, "vbank_date" integer, "vbank_issued_at" integer, "name" character varying, "amount" integer, "cancel_amount" integer, "currency" character varying, "buyer_name" character varying, "buyer_email" character varying, "buyer_tel" character varying, "buyer_addr" character varying, "buyer_postcode" character varying, "custom_data" character varying, "user_agent" character varying, "status" character varying, "started_at" integer, "paid_at" integer, "failed_at" integer, "cancelled_at" integer, "fail_reason" character varying, "cancel_reason" character varying, "receipt_url" character varying, "cash_receipt_issued" boolean, "customer_uid" character varying, "customer_uid_usage" character varying, "sellerId" uuid, "buyerId" uuid, "cardId" uuid, "userId" uuid, CONSTRAINT "REL_d35cb3c13a18e1ea1705b2817b" UNIQUE ("userId"), CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('USER', 'ADMIN')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "role" "public"."users_role_enum" NOT NULL DEFAULT 'USER', "key" character varying NOT NULL, "name" character varying, "phone" character varying, "email" character varying, "address" character varying, "postcode" character varying, CONSTRAINT "UQ_93f18065a2dd9f6b26c138b37ce" UNIQUE ("key"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" character varying NOT NULL, "title" character varying, "customer_uid" character varying, "card_number" character varying NOT NULL, "expiry_year" integer NOT NULL, "expiry_month" integer NOT NULL, "expiry" character varying, "birth" character varying NOT NULL, "pwd2digit" character varying NOT NULL, "cvc" character varying NOT NULL, "last_card_number" character varying, "card_name" character varying, "pg_id" character varying, "pg_provider" character varying, "userId" uuid, CONSTRAINT "REL_7b7230897ecdeb7d6b0576d907" UNIQUE ("userId"), CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment_prepares" ADD CONSTRAINT "FK_f36672d6c8fc532a60d91cd4cb3" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_prepares" ADD CONSTRAINT "FK_8c3bfe747855bed904aa2d7e86d" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_prepares" ADD CONSTRAINT "FK_c6dc17e2ae42eb84f91e3caf6f5" FOREIGN KEY ("userId") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_cancels" ADD CONSTRAINT "FK_e19df40c898427c230446ee6b7f" FOREIGN KEY ("sellerId") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_6c7400b18d7d9a09f8d3ef153df" FOREIGN KEY ("sellerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_123f88f31437a6eec5f78d39b2a" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_ffa0049cf3c2abff5d4aee33a9e" FOREIGN KEY ("cardId") REFERENCES "cards"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_d35cb3c13a18e1ea1705b2817b1" FOREIGN KEY ("userId") REFERENCES "payment_prepares"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_7b7230897ecdeb7d6b0576d907b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_7b7230897ecdeb7d6b0576d907b"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_d35cb3c13a18e1ea1705b2817b1"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_ffa0049cf3c2abff5d4aee33a9e"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_123f88f31437a6eec5f78d39b2a"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_6c7400b18d7d9a09f8d3ef153df"`);
        await queryRunner.query(`ALTER TABLE "payment_cancels" DROP CONSTRAINT "FK_e19df40c898427c230446ee6b7f"`);
        await queryRunner.query(`ALTER TABLE "payment_prepares" DROP CONSTRAINT "FK_c6dc17e2ae42eb84f91e3caf6f5"`);
        await queryRunner.query(`ALTER TABLE "payment_prepares" DROP CONSTRAINT "FK_8c3bfe747855bed904aa2d7e86d"`);
        await queryRunner.query(`ALTER TABLE "payment_prepares" DROP CONSTRAINT "FK_f36672d6c8fc532a60d91cd4cb3"`);
        await queryRunner.query(`DROP TABLE "cards"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TABLE "payment_cancels"`);
        await queryRunner.query(`DROP TABLE "payment_prepares"`);
    }

}
