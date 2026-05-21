import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_button_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_button_variant" AS ENUM('default', 'secondary', 'outline', 'destructive', 'ghost', 'link');
  CREATE TYPE "public"."enum_pages_blocks_button_size" AS ENUM('sm', 'default', 'lg');
  CREATE TYPE "public"."enum_pages_blocks_button_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_button_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_button_variant" AS ENUM('default', 'secondary', 'outline', 'destructive', 'ghost', 'link');
  CREATE TYPE "public"."enum__pages_v_blocks_button_size" AS ENUM('sm', 'default', 'lg');
  CREATE TYPE "public"."enum__pages_v_blocks_button_link_type" AS ENUM('reference', 'custom');
  CREATE TABLE "pages_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"alignment" "enum_pages_blocks_button_alignment" DEFAULT 'left',
  	"variant" "enum_pages_blocks_button_variant" DEFAULT 'default',
  	"size" "enum_pages_blocks_button_size" DEFAULT 'default',
  	"link_type" "enum_pages_blocks_button_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"anchor_id" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_button" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"alignment" "enum__pages_v_blocks_button_alignment" DEFAULT 'left',
  	"variant" "enum__pages_v_blocks_button_variant" DEFAULT 'default',
  	"size" "enum__pages_v_blocks_button_size" DEFAULT 'default',
  	"link_type" "enum__pages_v_blocks_button_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"anchor_id" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_button" ADD CONSTRAINT "pages_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_button" ADD CONSTRAINT "_pages_v_blocks_button_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_button_order_idx" ON "pages_blocks_button" USING btree ("_order");
  CREATE INDEX "pages_blocks_button_parent_id_idx" ON "pages_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_button_path_idx" ON "pages_blocks_button" USING btree ("_path");
  CREATE INDEX "pages_blocks_button_locale_idx" ON "pages_blocks_button" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_button_order_idx" ON "_pages_v_blocks_button" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_button_parent_id_idx" ON "_pages_v_blocks_button" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_button_path_idx" ON "_pages_v_blocks_button" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_button_locale_idx" ON "_pages_v_blocks_button" USING btree ("_locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_button" CASCADE;
  DROP TABLE "_pages_v_blocks_button" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_button_alignment";
  DROP TYPE "public"."enum_pages_blocks_button_variant";
  DROP TYPE "public"."enum_pages_blocks_button_size";
  DROP TYPE "public"."enum_pages_blocks_button_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_button_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_button_variant";
  DROP TYPE "public"."enum__pages_v_blocks_button_size";
  DROP TYPE "public"."enum__pages_v_blocks_button_link_type";`)
}
