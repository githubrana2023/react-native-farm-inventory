import Container from '@/components/container'
import { Input } from '@/components/ui/input'
import React from 'react'
import { View } from 'react-native'

const Price = () => {
  return (
    <Container>
      <View className='flex-1 h-16'>
        <Input
        placeholder='Barcode'
        keyboardType='numeric'
        />
      </View>
    </Container>
  )
}

export default Price