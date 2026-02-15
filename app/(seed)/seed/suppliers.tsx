"use client"
import Container from "@/components/container"
import {
    Button
} from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { suppliers } from "@/constants/supplier"
import { db } from "@/drizzle/db"
import { supplierTable } from "@/drizzle/schema"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { eq } from "drizzle-orm"
import { useEffect, useState, useTransition } from "react"
import {
    useForm
} from "react-hook-form"
import { FlatList, View } from "react-native"
import {
    z
} from "zod"
import { NavLink } from "."

const formSchema = z.object({
    supplierId: z.string(),
    seedQuantity: z.string(),
});


export const useGetSupplier = () => {
    return useQuery({
        queryKey: ["seed-supplier"],
        queryFn: async () => {
            return await db.select().from(supplierTable)
        }
    })
}


const seedSupplier = async () => {
    console.log('Start database seeding!');

    const suppliersSeed = suppliers.map(({ id, ...res }) => (res))
    await db.insert(supplierTable).values(suppliersSeed)
}



export default function SeedItemFrom() {
    const [pending, startTransition] = useTransition()
    const [items, setItems] = useState<any[]>([])
    const { data, isError } = useGetSupplier()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

    })

    function onSubmit() {
        startTransition(
            async () => {
                await seedSupplier()
                console.log('Finish database seeding!');

            }
        )
    }

    useEffect(() => {
        const seed = async () => {
            const data = await db.select().from(supplierTable)
            setItems(data)
        }

        seed()
    }, [])



    if (isError) return (
        <View className="my-3">
            <NavLink />
        </View>
    )

    return (
        <Container>
            <View className="my-3">
                <NavLink />
            </View>



            <Button onPress={onSubmit}>
                <Text>Seed Supplier</Text>
            </Button>

            <View>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <SeedItemDisplayCard
                            label={item.supplierCode}
                            onPress={async () => {
                                await db.delete(supplierTable).where(eq(supplierTable.id, item.id))
                            }}
                            disabled={data?.length === 5}

                        />
                    )}
                />
            </View>
        </Container>
    )
}



export const SeedItemDisplayCard = ({ label, disabled, onPress }: { label: string; disabled: boolean, onPress: () => void }) => {
    return (
        <View className="flex-row items-center justify-between gap-2 px-3 py-2">
            <Text>{label}</Text>
            <View className="flex-row items-center gap-1">
                <Button disabled={disabled} onPress={onPress}>
                    <Text>Delete</Text>
                </Button>
            </View>
        </View>
    )
}