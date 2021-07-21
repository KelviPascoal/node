import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1625247506720 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    create table users (
      id serial,	
      user_id int null,		
      name varchar ( 255 ),
      email varchar ( 255 ),
      password varchar ( 255 ),
      created_at timestamp NOT NULL DEFAULT NOW() ,
      updated_at timestamp NOT NULL DEFAULT NOW() ,
      
      constraint pk_users primary key(id),
      constraint uc_users_email unique(email)
    );`)
  }

  //  public async up(queryRunner: QueryRunner): Promise<void> {
  //     await queryRunner.query(`
  //     create table erick (
  //         name varchar(255)

  //     )
  //     `
  //     )
  // }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
