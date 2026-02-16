import { insertScannedItem } from "@/data-access-layer/insert-scanned-item"
import { ScanItemFormData } from "@/schema/scan-item-form-schema"
import { useMutation } from "@tanstack/react-query"


export const useScanBarcode = () => {
    return useMutation({
        mutationKey: ['insert-scanned-item'],
        mutationFn: (payload:ScanItemFormData) => insertScannedItem(payload),
        networkMode:"offlineFirst"
    })
}