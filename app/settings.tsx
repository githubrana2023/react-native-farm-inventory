import Container from '@/components/container'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { db } from '@/drizzle/db'
import { supplierTable } from '@/drizzle/schema'
import main from '@/drizzle/seed'
import React from 'react'
import { FlatList, View } from 'react-native'

type Supplier = typeof supplierTable.$inferSelect

const Settings = () => {

  const [suppliers, setSuppliers] = React.useState<Supplier[]>([])

  React.useEffect(() => {
    const getSuppliers = async () => {
      const suppliers = await db.select().from(supplierTable)
      setSuppliers(suppliers)
    }

    getSuppliers()
  }, [])

  return (
    <Container>
      <View className='flex-1 items-center justify-center'>
        <Button onPress={main}>
          <Text>Seed</Text>
        </Button>

        <View>
          <FlatList
            data={suppliers}
            renderItem={({item})=>(
              <View>
                <Text className='px-3 py-1'>{item.supplierCode}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </Container>
  )
}

export default Settings