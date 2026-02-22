import { db } from "@/drizzle/db";
import { storedScannedItemTable } from "@/drizzle/schema";
import { failureResponse, successResponse } from "@/lib/action-response";
import { consoleLog } from "@/lib/log";
import { eq } from "drizzle-orm";

export const updateScannedItemQuantity = async (payload: {
  storedScannedItemId: string;
  quantity: string;
}) => {
  try {
    //Quantity must be more than 0
    if (Number(payload.quantity) < 0)
      return failureResponse("Quantity must be grater than 0!");

    // if stored scanned item exist then continue
    const [existStoredScannedItem] = await db
      .select()
      .from(storedScannedItemTable)
      .where(eq(storedScannedItemTable.id, payload.storedScannedItemId));

    if (!existStoredScannedItem)
      return failureResponse("Scanned item not found!");

    const [updated] = await db
      .update(storedScannedItemTable)
      .set({
        quantity: Number(payload.quantity),
      })
      .where(eq(storedScannedItemTable.id, payload.storedScannedItemId))
      .returning();

    return successResponse(
      updated,
      `Quantity updated! Previous ${existStoredScannedItem.quantity} & Current ${updated.quantity}`,
    );
  } catch (error) {
    console.error(error);
    return failureResponse("Unexpected error during update the stored item");
  }
};
