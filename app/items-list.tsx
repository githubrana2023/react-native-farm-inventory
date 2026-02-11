import Container from '@/components/container'
import ScannedItemCard from '@/components/scanned-item-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { items } from '@/constants'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import React from 'react'
import { FlatList, Text, View } from 'react-native'

const ItemsList = () => {
  const tabBarHeight = useBottomTabBarHeight()

  return (
    <Container>
      <View className='flex-1 flex-col items-between justify-center gap-1'>

        {/* Inventory Save Form */}
        <View className='h-24 gap-2'>
          <Input
            className='flex-1'
            placeholder='Item Title'
          />
          <Input
            className='flex-1'
            placeholder='Search'
          />
        </View>



        {/* scanned items */}
        <FlatList
          className="pb-0 flex-1"
          showsVerticalScrollIndicator={false}
          data={items}
          renderItem={({ item }) => (
            <ScannedItemCard
              key={item.barcode}
              item={item}
              enableActionBtn
            />
          )}
        />


        {/* Buttons */}
        <View className='flex-1 flex-row items-center gap-1 max-h-10 justify-between p-0'>
          <Button variant='outline' size={'sm'}>
            <Text>Inventory</Text>
          </Button>
          <Button variant='outline' size={'sm'}>
            <Text>Tags</Text>
          </Button>
          <Button variant='outline' size={'sm'}>
            <Text>Order</Text>
          </Button>
          <Button variant='outline' size={'sm'}>
            <Text>Print</Text>
          </Button>
        </View>
      </View>
    </Container>
  )
}

export default ItemsList