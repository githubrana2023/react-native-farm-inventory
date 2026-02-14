import { items } from "@/constants/item";
import { db } from "../db";
import { itemTable, supplierTable } from "../schema";

export const randomBetweenZeroAndN = (n: number): number => {
    if (n < 0) {
        throw new Error("n must be a non-negative number");
    }

    return Math.floor(Math.random() * (n + 1));
};


const seedDatabase = async () => {
    console.log('Start database seeding!');

    const suppliers = await db.select().from(supplierTable)

    let suffix = 0
    for (let i = 0; i <= suppliers.length; i++) {
        suffix++
        const numberOfItems = Array.from({ length: 10 })

        numberOfItems.forEach(() => {
            const index = randomBetweenZeroAndN(items.length)
            const maxLength = suffix < 10 ? 3 : suffix > 10 ? 2 : 1
            const insertItem = async () => {
                await db.insert(itemTable).values({
                    item_code: `01060106-${"".padStart(maxLength, "0")}${suffix}`,
                    supplierId: suppliers[i].id,
                    item_description: items[index].item_description
                })
            }

            insertItem()
        })

    }



    await db.insert(supplierTable).values(
        suppliers.map(({ id, ...s }) => (s))
    ).returning()
}

export default async function main() {
    try {
        await seedDatabase();
        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}
