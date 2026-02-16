import * as z from "zod"

export const scanItemFormSchema = z.object({
  barcode: z.string().min(1, "Barcode is required"),
  unitId: z.string().min(1, "UOM is required"),
  quantity: z.coerce.number<number>().positive().min(1, "Quantity must be at least 1").gt(0, "Quantity must be greater than 0"),
})

export type ScanItemFormData = z.infer<typeof scanItemFormSchema>