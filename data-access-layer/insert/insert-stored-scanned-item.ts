import { db } from "@/drizzle/db";
import {
  barcodeTable,
  itemTable,
  storedScannedItemTable,
} from "@/drizzle/schema";
import {
  ScanItemFormData,
  scanItemFormSchema,
} from "@/schema/scan-item-form-schema";
import { and, eq } from "drizzle-orm";
import { getUnitById } from "../get-item";
import { failureResponse, successResponse } from "@/lib/action-response";
import { consoleLog } from "@/lib/log";

export const insertScannedItem = async (payload: ScanItemFormData) => {
  try {
    const validation = scanItemFormSchema.safeParse(payload);
    if (!validation.success)
      return failureResponse(validation.error.message, "VALIDATION_ERROR");

    const { barcode, scanFor, isAdvanceModeEnable } = validation.data;

    const [existBarcode] = await db
      .select()
      .from(barcodeTable)
      .innerJoin(itemTable, eq(itemTable.id, barcodeTable.itemId))
      .where(eq(barcodeTable.barcode, barcode));

    if (!existBarcode) return failureResponse("Item not found!", "NOT_FOUND");

    // is the unitid exist or not
    const existUnit = await getUnitById(payload.unitId);
    if (!existUnit) return failureResponse("Unit not found!", "NOT_FOUND");

    /**
     * advance feature implement
     *
     * 1. is advance mode on
     * 2. is scan for order
     * 3. is there are any storedItems that already scanned for order
     * 4. if exist return the stored data
     *
     */
    const isScanForOrder = isAdvanceModeEnable && scanFor === "Order";

    if (isScanForOrder) {
      const storedItemsByItemCode = await db
        .select()
        .from(storedScannedItemTable)
        .innerJoin(
          barcodeTable,
          eq(barcodeTable.id, storedScannedItemTable.barcodeId),
        )
        .innerJoin(itemTable, eq(itemTable.id, barcodeTable.itemId))
        .where(
          and(
            eq(itemTable.item_code, existBarcode.item.item_code),
            eq(storedScannedItemTable.scanFor, "Order"),
          ),
        );

      const hasStoredItems = storedItemsByItemCode.length > 0;

      consoleLog({ storedItemsByItemCode });

      if (hasStoredItems)
        return failureResponse(
          "Duplicate Item not allow for ordering!",
          "DUPLICATE",
        );
    }

    const [addedItem] = await db
      .insert(storedScannedItemTable)
      .values({
        barcodeId: existBarcode.barcode.id,
        quantity: payload.quantity,
        unitId: existUnit.id,
        scanFor: scanFor,
      })
      .returning();

    return successResponse(addedItem, "Item added successfully!");
  } catch (error) {
    console.error(error);
    return failureResponse(
      "unexpected database error during insert stored item!",
      "DB_ERROR",
    );
  }
};

export const deleteScannedItem = async (id: string) => {
  try {
    const [existStored] = await db
      .select()
      .from(storedScannedItemTable)
      .where(eq(storedScannedItemTable.id, id));
    if (!existStored)
      return failureResponse("Scanned item not found!", "NOT_FOUND");
    const [deletedItem] = await db
      .delete(storedScannedItemTable)
      .where(eq(storedScannedItemTable.id, id))
      .returning();

    return successResponse(deletedItem, "Scanned item successfully deleted!");
  } catch (error) {
    return failureResponse(
      "unexpected database error during delete stored item!",
      "DB_ERROR",
    );
  }
};
