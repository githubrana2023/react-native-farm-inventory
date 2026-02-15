"use client"
import Container from "@/components/container"
import {
    Button
} from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Text } from "@/components/ui/text"
import { items } from "@/constants/item"
import { db } from "@/drizzle/db"
import { itemTable, supplierTable } from "@/drizzle/schema"
import { randomInt } from "@/drizzle/seed/seeding-factory"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { desc, eq } from "drizzle-orm"
import { useTransition } from "react"
import {
    useForm
} from "react-hook-form"
import { FlatList, View } from "react-native"
import {
    z
} from "zod"
import { NavLink } from "."
import { SeedItemDisplayCard, useGetSupplier } from "./suppliers"

const formSchema = z.object({
    supplierId: z.string(),
    seedQuantity: z.string(),
});


const useGetItems = () => {
    return useQuery({
        queryKey: ["get-item"],
        queryFn: async () => {
            return await db.select().from(itemTable)
        }
    })
}


const seedItem = async ({ seedQuantity, supplierId }: { supplierId: string; seedQuantity: string }) => {
    if (!supplierId) return { data: null, msg: "supplier id missing!" }
    const [existSupplier] = await db.select().from(supplierTable).where(eq(supplierTable.id, supplierId))
    if (!existSupplier) return { data: null, msg: "supplier not exist!" }
    const [item] = await db.select({ item_code: itemTable.item_code }).from(itemTable).orderBy(desc(itemTable.item_code))

    const [firstDigit, lastDigit] = item.item_code.split('-')
    const ld = Number(lastDigit)
    const maxLength = ld<10?3:(ld>9&&ld<100)?2:1

    
    for (let i = 0; i < Number(seedQuantity); i++) {
        const itemCode = `${firstDigit}-${(ld+1).toString().padStart(maxLength, "0")}`
        const randomDummyItemIndex = randomInt(0, items.length - 1)
        const randomItem = items[randomDummyItemIndex]
        console.log(`Seeding start`)
        // await db.insert(itemTable).values({ ...randomItem, supplierId: existSupplier.id })
        console.log(itemCode)
    }
}



export default function SeedItemFrom() {
    const [pending, startTransition] = useTransition()
    const { data: suppliers, isSuccess: supIsSuccess } = useGetSupplier()
    const { data: items, isSuccess: itemIsSuccess, refetch } = useGetItems()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

    })

    const onSubmit = form.handleSubmit(values => {
        console.log(values)
        startTransition(
            async () => {
                await seedItem(values)
                console.log(`seeding finish`)
            }
        )
    })


    if (!supIsSuccess || !itemIsSuccess) {
        return (
            <View className="my-3">
                <NavLink />
            </View>
        )
    }


    return (
        <Container>
            <View className="my-3">
                <NavLink />
            </View>
            <Form {...form}>
                <FormField
                    control={form.control}
                    name="seedQuantity"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Seed Quantity"
                                    returnKeyType="next"
                                    onChangeText={field.onChange}
                                    value={field.value}
                                    editable={!pending}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="supplierId"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Select
                                    onValueChange={(option) => field.onChange(option?.value ?? field.value)}
                                    value={{
                                        value: field.value,
                                        label: suppliers.filter(s => s.id === field.value)[0]?.supplierCode ?? field.value
                                    }}
                                    disabled={pending}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a supplier" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            suppliers.map(s => (
                                                <SelectItem value={s.id} label={s.supplierCode} key={s.id} />
                                            ))
                                        }
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button onPress={onSubmit} disabled={pending}>
                    <Text>Seed Item</Text>
                </Button>
            </Form>

            <View>
                <FlatList
                    data={items}
                    renderItem={({ item, index }) => (
                        <SeedItemDisplayCard
                            label={`${item.item_code}  -   #${index}`}
                            onPress={async () => {
                                await db.delete(supplierTable).where(eq(supplierTable.id, item.id))
                                refetch()
                            }}
                            disabled={false}

                        />
                    )}
                />
            </View>
        </Container>
    )
}