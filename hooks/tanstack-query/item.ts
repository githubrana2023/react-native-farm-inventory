import { db } from '@/drizzle/db'
import { barcodeTable, itemTable, supplierTable, unitTable } from '@/drizzle/schema'
import { useQuery } from '@tanstack/react-query'
import { eq } from 'drizzle-orm'

type Item = typeof itemTable.$inferSelect
type Supplier = typeof supplierTable.$inferSelect

export function useItemsByScan(code: string) {

    return useQuery({
        queryKey: ['items', code],
        queryFn: () => fetchItemsByBarcode(code),
        enabled: !!code
    })
}

export function transformItemWithBarcodes<
    T extends {
        item: Item
        supplier: Supplier | null
        barcode: any | null
        unit: any | null
    }
>(rows: T[]) {
    if (!rows.length) return null

    const result = {
        item: rows[0].item,
        supplier: rows[0].supplier,
        barcodes: [] as Array<
            NonNullable<T["barcode"]> & {
                unit: T["unit"] | null
            }
        >
    }

    const seen = new Set<string>()

    for (const row of rows) {
        if (!row.barcode) continue
        if (seen.has(row.barcode.id)) continue

        seen.add(row.barcode.id)

        result.barcodes.push({
            ...row.barcode,
            unit: row.unit ?? null
        })
    }

    return result
}


export const fetchItemsByItemCode = async (itemCode: string) => {
    const data = await db.select().from(itemTable)
        .leftJoin(supplierTable, eq(itemTable.supplierId, supplierTable.id))
        .leftJoin(barcodeTable, eq(itemTable.id, barcodeTable.itemId))
        .leftJoin(unitTable, eq(barcodeTable.unitId, unitTable.id))
        .groupBy(itemTable.id)
        .where(eq(itemTable.item_code, itemCode))

    const res = transformItemWithBarcodes(data.map(item => ({
        item: item.users_table,
        supplier: item.supplier,
        barcode: item.barcode,
        unit: item.unit
    })))


    return res
}



export const fetchItemsByBarcode = async (barcode: string) => {
    const [{ users_table, ...data }] = await db.select().from(barcodeTable)
        .leftJoin(unitTable, eq(barcodeTable.unitId, unitTable.id))
        .leftJoin(itemTable, eq(itemTable.id, barcodeTable.itemId))
        .leftJoin(supplierTable, eq(itemTable.supplierId, supplierTable.id))
        .where(eq(barcodeTable.barcode, barcode))

    const { barcode: { createdAt, updatedAt, ...itemBarcode }, supplier, unit } = data

    if (!supplier || !unit || !users_table) return null
    const { createdAt: sCreated, updatedAt: sUpdated, ...restSupplier } = supplier
    const { createdAt: uCreated, updatedAt: uUpdated, ...restUnit } = unit
    const { createdAt: iCreated, updatedAt: iUpdated, ...restItem } = users_table

    const barcodesByItemCode = users_table ? await fetchItemsByItemCode(users_table?.item_code) : null


    if (!barcodesByItemCode) return null
    const { barcodes } = barcodesByItemCode

    const units = barcodes.map(barcode => {
        if (!barcode.unit) return null
        const { createdAt, updatedAt, ...rest } = barcode.unit
        return rest
    })

    return {
        barcode: { ...itemBarcode },
        supplier: { ...restSupplier },
        item: { ...restItem },
        unit: { ...restUnit },
        units
    }
}

