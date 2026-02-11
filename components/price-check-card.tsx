import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn, copyToClipboard } from "@/lib/utils"
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons"
import { Pressable, Text, View } from "react-native"
import { DetailsRow } from "./details-row"

interface PriceCheckCardProps {
    itemCode: string
    barcode: string

    description: string
    regularPrice: number
    promoPrice?: number
    currency?: string
    supplierName: string
    supplierCode: string
}

export function PriceCheckCard({
    itemCode,
    description,
    regularPrice,
    promoPrice,
    currency = "AED",
    supplierName,
    supplierCode,
    barcode
}: PriceCheckCardProps) {
    const isOnPromo = promoPrice !== undefined && promoPrice < regularPrice
    const discount = isOnPromo
        ? Math.round(((regularPrice - promoPrice) / regularPrice) * 100)
        : 0

    function formatPrice(value: number) {
        return value.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }

    return (
        <Card className="gap-0">
            {/* PRICE HEADER */}
            <View className="relative items-center border-b border-border bg-secondary/50 px-6 py-5">
                {isOnPromo && (
                    <Badge className="absolute right-3 top-3 flex-row items-center rounded-full bg-green-600 px-2 py-0.5">
                        <MaterialCommunityIcons
                            name="percent-circle-outline"
                            size={12}
                            color="#fff"
                        />
                        <Text className="ml-0 text-[11px] font-bold text-white">
                            {discount}% OFF
                        </Text>
                    </Badge>
                )}

                <View className="flex-row items-center">
                    <FontAwesome6 name="dollar" size={20} color="##6A7181" />

                    <Text className="ml-2 text-xs font-medium uppercase text-muted-foreground">
                        {isOnPromo ? "Promo Price" : "Unit Price"}
                    </Text>
                </View>


                <Text className={cn("mt-2 text-5xl font-extrabold", isOnPromo ? "text-green-600" : "text-foreground")}>
                    {currency} {formatPrice(isOnPromo ? promoPrice! : regularPrice)}
                </Text>

                {isOnPromo && (
                    <Text className="mt-1 text-xl text-muted-foreground line-through">
                        {currency} {formatPrice(regularPrice)}
                    </Text>
                )}
            </View>

            {/* DETAILS */}
            <CardContent className="p-0">
                <View className="gap-3 p-5">
                    {/* BARCODE */}
                    <DetailsRow
                        icon={{ library: 'FontAwesome', name: "barcode" }}
                        label="barcode"
                        value={barcode}
                    />

                    {/* ITEM CODE */}
                    <DetailsRow
                        icon={{ library: 'FontAwesome', name: "code" }}
                        label="item code"
                        value={itemCode}
                    />

                    {/* DESCRIPTION */}
                    <DetailsRow
                        icon={{ library: 'FontAwesome', name: "file-text" }}
                        label="Description"
                        value={description}
                    />

                </View>

                {/* SUPPLIER FOOTER */}
                <View className="flex-row items-center justify-between border-t border-border bg-secondary/30 px-5 py-3">
                    {/* LEFT SIDE */}
                    <View className="flex-1 flex-row items-start">
                        <FontAwesome6 name="truck" size={16} color="#6b7280" />

                        <View className="ml-2 flex-1">
                            <Text className="text-xs font-medium uppercase text-muted-foreground">
                                Supplier
                            </Text>

                            <Text
                                className="text-sm font-medium text-foreground"
                                numberOfLines={0}   // allow unlimited lines
                            >
                                {supplierName}
                            </Text>
                        </View>
                    </View>

                    {/* RIGHT BADGE */}

                    <Badge
                        variant="outline"
                        className="ml-2 flex-row items-center rounded-md px-2.5 py-1"
                    >
                        <Pressable
                            onPress={async () => {
                                await copyToClipboard(supplierCode)
                            }}
                            className="flex-row items-center"
                        >
                            <FontAwesome6 name="tag" size={12} color="#6b7280" />
                            <Text className="ml-1 font-mono text-xs font-semibold">
                                {supplierCode}
                            </Text>
                        </Pressable>
                    </Badge>


                </View>

            </CardContent>
        </Card>
    )
}
