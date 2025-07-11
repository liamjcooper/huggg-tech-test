import { relations } from 'drizzle-orm'
import { pgTable, integer, varchar, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core'

export const brandsTable = pgTable('brands', {
  id: uuid().primaryKey().defaultRandom(),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow(),
  deleted_at: timestamp(),
  name: varchar(),
  internal_name: varchar(),
  logo: varchar(),
  colour: varchar(),
  success: varchar(),
  share: varchar(),
  weight: integer(),
  expiry: integer(),
  website: varchar(),
  integration_id: integer(),
  user_id: varchar(),
  email: varchar(),
  vat: integer(),
  faq: text(),
  description: text(),
  redeem: text(),
  location_text: varchar(),
  map_pin_url: varchar(),
  consolidated: integer(),
  default_location_description_markdown: text(),
  logo_url: varchar()
})

export const productsTable = pgTable('products', {
  id: uuid().primaryKey().defaultRandom(),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp().defaultNow(),
  brand_id: uuid().references(() => brandsTable.id),
  description: text(),
  campaign: varchar(),
  label: varchar(),
  internal_name: varchar(),
  integration: varchar(),
  price: varchar(),
  over_18_offer: integer(),
  redemption_instructions: text(),
  image: varchar(),
  subtitle: varchar(),
  weight: integer(),
  recipient_description: text(),
  tag_group_id: varchar(),
  tag_id: varchar(),
  open_graph_image: varchar(),
  active: integer(),
  on_app: integer(),
  on_imessage: integer(),
  handling_fee: integer(),
  sale_price: integer(),
  huggg_tag: varchar(),
  vat_voucher_type: varchar(),
  vat: integer(),
  brand_name: varchar(),
  brand_weight: integer(),
  image_url: varchar(),
  claim_image: varchar(),
  claim_image_url: varchar(),
  imessage_image: varchar(),
  imessage_image_url: varchar(),
  open_graph_image_url: varchar()
})

export const storesTable = pgTable('stores', {
  id: uuid().primaryKey().defaultRandom(),
  brand_id: uuid().references(() => brandsTable.id),
  latitiude: varchar(),
  longitude: varchar(),
  website: varchar(),
  name: varchar(),
  description: text(),
  visible: integer(),
  description_markdown: text(),
  image: varchar(),
  image_url: varchar()
})

export const brandsToProductsTable = pgTable('brands_to_products', {
  brand_id: uuid().references(() => brandsTable.id),
  product_id: uuid().references(() => productsTable.id),
  consolidated: boolean().default(false),
})

export const brandsStoresTable = pgTable('brands_to_stores', {
  brand_id: uuid().references(() => brandsTable.id),
  store_id: uuid().references(() => storesTable.id),
})

export const brandsRelations = relations(brandsTable, ({ many }) => ({
  brandsToProducts: many(brandsToProductsTable),
  brandsToStores: many(brandsStoresTable),
}))

export const storesRelations = relations(storesTable, ({ one }) => ({
  brand: one(brandsTable, {
    fields: [storesTable.brand_id],
    references: [brandsTable.id],
  }),
}))

export const productsRelations = relations(productsTable, ({ one }) => ({
  brand: one(brandsTable, {
    fields: [productsTable.brand_id],
    references: [brandsTable.id],
  }),
}))
