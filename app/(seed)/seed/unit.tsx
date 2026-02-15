"use client"
import Container from "@/components/container"
import {
    Button
} from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Text } from "@/components/ui/text"
import { db } from "@/drizzle/db"
import { supplierTable } from "@/drizzle/schema"
import {
    zodResolver
} from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { eq } from "drizzle-orm"
import { useTransition } from "react"
import {
    useForm
} from "react-hook-form"
import { View } from "react-native"
import {
    z
} from "zod"
import { NavLink } from "."

const formSchema = z.object({
    supplierId: z.string(),
    seedQuantity: z.string(),
});


const useSeedItem = (supplierId: string) => {
    return useQuery({
        queryKey: ["seed-item"],
        queryFn: async () => {
            if (!supplierId) return { data: null, msg: "supplier id missing!" }
            const [existSupplier] = await db.select().from(supplierTable).where(eq(supplierTable.id, supplierId))
            if (!existSupplier) return { data: null, msg: "supplier not exist!" }
        }
    })
}


const seedItem = async ({ seedQuantity, supplierId }: { supplierId: string; seedQuantity: string }) => {
    if (!supplierId) return { data: null, msg: "supplier id missing!" }
    const [existSupplier] = await db.select().from(supplierTable).where(eq(supplierTable.id, supplierId))
    if (!existSupplier) return { data: null, msg: "supplier not exist!" }

    Array.from({ length: Number(seedQuantity) }, (_, k) => {
        console.log(k)
    })
}



export default function SeedItemFrom() {
    const [pending, startTransition] = useTransition()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),

    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        startTransition(
            async () => {
                await seedItem(values)
            }
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
                    name="supplierId"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="option1" label="option" />
                                        <SelectItem value="option2" label="option" />
                                        <SelectItem value="option3" label="option" />
                                    </SelectContent>
                                </Select>
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button >
                    <Text>Seed Item</Text>
                </Button>
            </Form>
        </Container>
    )
}