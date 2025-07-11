import { drizzle } from 'drizzle-orm/node-postgres'

import config from '../config/config'

import loadJsonData from '../src/data/load'

import {
  brandsTable,
  productsTable,
  storesTable,
  brandsToProductsTable,
  brandsStoresTable,
} from '../src/database/schema'
import type { BrandsData } from '../src/types/Brand'

// Database connection
const db = drizzle(config.db.url)

// Load brands data
const brandsData = await loadJsonData<BrandsData>('brands.json')

async function seed () {
  console.log('🌱 Starting database seeding...')

  const brandIds = new Set(brandsData.data.map((brand) => brand.id))
  const validStores = brandsData.embedded.stores.filter((store) =>
    brandIds.has(store.brand_id)
  )

  try {
    await db.transaction(async (tx) => {
      // Clear existing data
      console.log('🗑️  Clearing existing data...')
      await tx.delete(brandsStoresTable)
      await tx.delete(brandsToProductsTable)
      await tx.delete(storesTable)
      await tx.delete(productsTable)
      await tx.delete(brandsTable)

      // Seed brands
      console.log('🏢 Seeding brands...')
      const brandsToInsert = brandsData.data.map((brand) => ({
        id: brand.id,
        created_at: new Date(brand.created_at),
        updated_at: new Date(brand.updated_at),
        deleted_at: brand.deleted_at ? new Date(brand.deleted_at) : null,
        name: brand.name,
        internal_name: brand.internal_name,
        logo: brand.logo,
        colour: brand.colour,
        success: brand.success,
        share: brand.share,
        weight: brand.weight,
        expiry: brand.expiry,
        website: brand.website,
        integration_id: brand.integration_id,
        user_id: brand.user_id,
        email: brand.email,
        vat: brand.vat,
        faq: brand.faq,
        description: brand.description,
        redeem: brand.redeem,
        location_text: brand.location_text,
        map_pin_url: brand.map_pin_url,
        consolidated: brand.consolidated,
        default_location_description_markdown:
          brand.default_location_description_markdown,
        logo_url: brand.logo_url,
      }))

      await tx.insert(brandsTable).values(brandsToInsert)
      console.log(`✅ Inserted ${brandsToInsert.length} brands`)

      // Seed products
      console.log('🛍️  Seeding products...')
      const productsToInsert = brandsData.embedded.products.map(
        (product: any) => ({
          id: product.id,
          created_at: new Date(product.created_at),
          updated_at: new Date(product.updated_at),
          brand_id: product.brand_id,
          description: product.description,
          campaign: product.campaign,
          label: product.label,
          internal_name: product.internal_name,
          integration: product.integration,
          price: product.price,
          over_18_offer: product.over_18_offer,
          redemption_instructions: product.redemption_instructions,
          image: product.image,
          subtitle: product.subtitle,
          weight: product.weight,
          recipient_description: product.recipient_description,
          tag_group_id: product.tag_group_id,
          tag_id: product.tag_id,
          open_graph_image: product.open_graph_image,
          active: product.active,
          on_app: product.on_app,
          on_imessage: product.on_imessage,
          handling_fee: product.handling_fee,
          sale_price: product.sale_price,
          huggg_tag: product.huggg_tag,
          vat_voucher_type: product.vat_voucher_type,
          vat: product.vat,
          brand_name: product.brand_name,
          brand_weight: product.brand_weight,
          image_url: product.image_url,
          claim_image: product.claim_image,
          claim_image_url: product.claim_image_url,
          imessage_image: product.imessage_image,
          imessage_image_url: product.imessage_image_url,
          open_graph_image_url: product.open_graph_image_url,
        })
      )

      await tx.insert(productsTable).values(productsToInsert)
      console.log(`✅ Inserted ${productsToInsert.length} products`)

      // Seed stores (only valid ones)
      console.log('🏪 Seeding stores...')
      const storesToInsert = validStores.map((store: any) => ({
        id: store.id,
        brand_id: store.brand_id,
        latitiude: store.latitiude,
        longitude: store.longitude,
        website: store.website,
        name: store.name,
        description: store.description,
        visible: store.visible,
        description_markdown: store.description_markdown,
        image: store.image,
        image_url: store.image_url,
      }))

      await tx.insert(storesTable).values(storesToInsert)
      console.log(`✅ Inserted ${storesToInsert.length} stores`)

      // Seed brand-product relationships
      console.log('🔗 Seeding brand-product relationships...')
      const brandProductRelations: any[] = []

      brandsData.data.forEach((brand: any) => {
        // Add regular products
        brand.products.forEach((productId: string) => {
          brandProductRelations.push({
            brand_id: brand.id,
            product_id: productId,
            consolidated: false,
          })
        })

        // Add consolidated products
        brand.consolidated_products.forEach((productId: string) => {
          brandProductRelations.push({
            brand_id: brand.id,
            product_id: productId,
            consolidated: true,
          })
        })
      })

      if (brandProductRelations.length > 0) {
        await tx.insert(brandsToProductsTable).values(brandProductRelations)
        console.log(
          `✅ Inserted ${brandProductRelations.length} brand-product relationships`
        )
      }

      // Seed brand-store relationships (only for valid stores)
      console.log('🔗 Seeding brand-store relationships...')
      const brandStoreRelations: any[] = []

      brandsData.data.forEach((brand: any) => {
        brand.stores.forEach((storeId: string) => {
          // Only add relationship if the store exists in validStores
          const storeExists = validStores.some((store) => store.id === storeId)
          if (storeExists) {
            brandStoreRelations.push({
              brand_id: brand.id,
              store_id: storeId,
            })
          } else {
            console.log(
              `⚠️  Skipping brand-store relationship for store ${storeId} - store not found in valid stores`
            )
          }
        })
      })

      if (brandStoreRelations.length > 0) {
        await tx.insert(brandsStoresTable).values(brandStoreRelations)
        console.log(
          `✅ Inserted ${brandStoreRelations.length} brand-store relationships`
        )
      }

      console.log('🎉 Database seeding completed successfully!')

      // Print summary
      console.log('\n📊 Summary:')
      console.log(`   Brands: ${brandsToInsert.length}`)
      console.log(`   Products: ${productsToInsert.length}`)
      console.log(`   Stores: ${storesToInsert.length}`)
      console.log(
        `   Brand-Product relationships: ${brandProductRelations.length}`
      )
      console.log(
        `   Brand-Store relationships: ${brandStoreRelations.length}`
      )
    })
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  }
}

seed()
