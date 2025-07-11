CREATE TABLE "brands_to_stores" (
	"brand_id" uuid,
	"store_id" uuid
);
--> statement-breakpoint
CREATE TABLE "brands" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"deleted_at" timestamp,
	"name" varchar,
	"internal_name" varchar,
	"logo" varchar,
	"colour" varchar,
	"success" varchar,
	"share" varchar,
	"weight" integer,
	"expiry" integer,
	"website" varchar,
	"integration_id" integer,
	"user_id" varchar,
	"email" varchar,
	"vat" integer,
	"faq" text,
	"description" text,
	"redeem" text,
	"location_text" varchar,
	"map_pin_url" varchar,
	"consolidated" integer,
	"default_location_description_markdown" text,
	"logo_url" varchar
);
--> statement-breakpoint
CREATE TABLE "brands_to_products" (
	"brand_id" uuid,
	"product_id" uuid,
	"consolidated" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"brand_id" uuid,
	"description" text,
	"campaign" varchar,
	"label" varchar,
	"internal_name" varchar,
	"integration" varchar,
	"price" varchar,
	"over_18_offer" integer,
	"redemption_instructions" text,
	"image" varchar,
	"subtitle" varchar,
	"weight" integer,
	"recipient_description" text,
	"tag_group_id" varchar,
	"tag_id" varchar,
	"open_graph_image" varchar,
	"active" integer,
	"on_app" integer,
	"on_imessage" integer,
	"handling_fee" integer,
	"sale_price" integer,
	"huggg_tag" varchar,
	"vat_voucher_type" varchar,
	"vat" integer,
	"brand_name" varchar,
	"brand_weight" integer,
	"image_url" varchar,
	"claim_image" varchar,
	"claim_image_url" varchar,
	"imessage_image" varchar,
	"imessage_image_url" varchar,
	"open_graph_image_url" varchar
);
--> statement-breakpoint
CREATE TABLE "stores" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"brand_id" uuid,
	"latitiude" varchar,
	"longitude" varchar,
	"website" varchar,
	"name" varchar,
	"description" text,
	"visible" integer,
	"description_markdown" text,
	"image" varchar,
	"image_url" varchar
);
--> statement-breakpoint
ALTER TABLE "brands_to_stores" ADD CONSTRAINT "brands_to_stores_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brands_to_stores" ADD CONSTRAINT "brands_to_stores_store_id_stores_id_fk" FOREIGN KEY ("store_id") REFERENCES "public"."stores"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brands_to_products" ADD CONSTRAINT "brands_to_products_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "brands_to_products" ADD CONSTRAINT "brands_to_products_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stores" ADD CONSTRAINT "stores_brand_id_brands_id_fk" FOREIGN KEY ("brand_id") REFERENCES "public"."brands"("id") ON DELETE no action ON UPDATE no action;