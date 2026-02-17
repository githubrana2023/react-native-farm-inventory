import Container from '@/components/container'
import { PriceCheckCard } from '@/components/price-check-card'
import { Input } from '@/components/ui/input'
import React from 'react'
import { ScrollView, View } from 'react-native'

const Price = () => {
  return (
    <Container>
      <View className='h-16 justify-center'>

        <Input
          placeholder='Barcode'
          keyboardType='numeric'
        />
      </View>


      {/* <View className='flex-1 pb-0'> */}
      <ScrollView className='flex-1'
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}>
        <PriceCheckCard
          barcode='62846956975'
          itemCode='01020406-2236'
          description='Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, quos magnam asperiores inventore'
          regularPrice={16.99}
          supplierCode='GL-2378'
          supplierName='Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, quos magnam asperiores inventore'
          currency='SAR'
          promoPrice={10.99}
        />
      </ScrollView>
      {/* </View> */}
    </Container>
  )
}

export default Price
