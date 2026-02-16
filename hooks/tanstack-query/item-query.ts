import { getItemByScanBarcode, getStoredScannedItems } from "@/data-access-layer/get-item"
import { useQuery } from "@tanstack/react-query"



export const useGetItemByBarcode = (barcode: string) => {
    return useQuery({
        queryKey: ['get-item-by-barcode', barcode],
        queryFn: () => getItemByScanBarcode(barcode),
        enabled: !!barcode
    })
}

export const useGetStoredScannedItems=()=>{
    return useQuery({
        queryKey: ['get-stored-scanned-items'],
        queryFn: () => getStoredScannedItems(),
    })
}