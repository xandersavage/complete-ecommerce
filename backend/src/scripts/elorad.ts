import {
  createProductsWorkflow,
  createInventoryLevelsWorkflow,
} from "@medusajs/medusa/core-flows";
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import { CreateInventoryLevelInput } from "@medusajs/framework/types";
import { faker } from "@faker-js/faker";

export default async function seedDemoData({ container }) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const regionModuleService = container.resolve(Modules.REGION);
  const stockLocationModuleService = container.resolve(Modules.STOCK_LOCATION);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  logger.info("Seeding product data...");

  // Get the default sales channel
  const defaultSalesChannel = await salesChannelModuleService.listSalesChannels(
    { name: "Default Sales Channel" }
  );
  if (!defaultSalesChannel.length) {
    throw new Error("Default Sales Channel not found. Please create it first.");
  }

  // Get the default region (Nigeria, as set in the original seed)
  const regions = await regionModuleService.listRegions({ name: "Nigeria" });
  if (!regions.length) {
    throw new Error("Region 'Nigeria' not found. Please create it first.");
  }
  const region = regions[0];

  // Get the stock location using the correct method name
  const stockLocations = await stockLocationModuleService.listStockLocations({
    name: "Nigerian Warehouse",
  });
  if (!stockLocations.length) {
    throw new Error(
      "Stock Location 'Nigerian Warehouse' not found. Please create it first."
    );
  }
  const stockLocation = stockLocations[0];

  // Define collection IDs
  const collections = {
    clothes: "pcol_01JSPP3HZF23D9V25Z80WBNNZZ",
    books: "pcol_01JSPP406KQGFNNFR9D8Q54GFQ",
    decorations: "pcol_01JSPP4BMZ0R39D4J0FTYXRRDR",
    others: "pcol_01JSPP4S4GNRJY4H7FYQD255KH",
  };

  // Generate 100 dummy products
  const products = Array.from({ length: 100 }, () => {
    const category = faker.helpers.arrayElement([
      "clothes",
      "books",
      "decorations",
      "others",
    ]);
    const productName = faker.commerce.productName();
    const uniqueId = faker.string.uuid().slice(0, 8);
    return {
      title: `${faker.commerce.productAdjective()} ${productName}`,
      subtitle: faker.commerce.productMaterial(),
      description: faker.commerce.productDescription(),
      handle: `${faker.helpers.slugify(productName).toLowerCase()}-${uniqueId}`,
      is_giftcard: false,
      status: ProductStatus.PUBLISHED,
      images: [
        {
          url: faker.image.urlLoremFlickr({
            width: 640,
            height: 480,
            category,
          }),
        },
      ],
      collection_id: collections[category],
      options: [
        {
          title: "Type",
          values:
            category === "clothes"
              ? ["S", "M", "L"]
              : category === "books"
              ? ["Hardcover", "Paperback"]
              : category === "decorations"
              ? ["Small", "Large"]
              : ["Standard"],
        },
      ],
      variants: [
        {
          title: "Default Variant",
          sku: `SKU-${faker.string.uuid().slice(0, 8)}`,
          options: {
            Type:
              category === "clothes"
                ? "M"
                : category === "books"
                ? "Paperback"
                : category === "decorations"
                ? "Small"
                : "Standard",
          },
          prices: [
            {
              amount:
                parseInt(faker.commerce.price({ min: 5, max: 200, dec: 0 })) *
                100, // Convert to kobo (NGN)
              currency_code: "ngn",
              region_id: region.id, // Link to the Nigeria region
            },
            {
              amount: parseInt(
                faker.commerce.price({ min: 5, max: 200, dec: 0 })
              ),
              currency_code: "usd",
            },
          ],
          inventory_quantity: faker.number.int({ min: 10, max: 100 }),
        },
      ],
      weight: faker.number.int({ min: 50, max: 500 }),
      sales_channels: [{ id: defaultSalesChannel[0].id }],
    };
  });

  // Create products
  const { result: createdProducts } = await createProductsWorkflow(
    container
  ).run({
    input: { products },
  });

  logger.info("Seeding inventory levels...");

  // Get all inventory items - similar to how it's done in the original seed file
  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  });

  // Create inventory levels for each inventory item
  const inventoryLevels: CreateInventoryLevelInput[] = [];
  for (const inventoryItem of inventoryItems) {
    const inventoryLevel = {
      location_id: stockLocation.id,
      stocked_quantity: faker.number.int({ min: 10, max: 100 }),
      inventory_item_id: inventoryItem.id,
    };
    inventoryLevels.push(inventoryLevel);
  }

  // Create inventory levels using the same workflow as in the original seed
  await createInventoryLevelsWorkflow(container).run({
    input: { inventory_levels: inventoryLevels },
  });

  logger.info("Finished seeding inventory levels data.");
  logger.info("Finished seeding product data.");
}
