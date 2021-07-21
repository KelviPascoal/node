import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreatePhothos1626810188022 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    create table photos (
      id serial,	
      user_id int null,		
      description varchar ( 255 ),
      created_at timestamp NOT NULL DEFAULT NOW() ,
      updated_at timestamp NOT NULL DEFAULT NOW() ,
      
      constraint pk_photos primary key(id),
      constraint fk_photos_users foreign key(user_id) references users(id) on delete cascade
    );
    `)
  
  
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("photos");
  }
}
