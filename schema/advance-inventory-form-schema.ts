import { multitaskVariantValues } from '@/constants'
import * as z from 'zod'

export const advanceInventoryFormSchema = z.object({
    scannedFor: z.enum(multitaskVariantValues, 'Inventory or Order must be selected!').nonoptional(),
    barcode: z.string(),
    unitId: z.string(),
    quantity: z.coerce.number<number>().nonnegative().gt(0, 'Quantity must be grater than 0!')
})

export type AdvanceInventoryFormValue = z.infer<typeof advanceInventoryFormSchema>