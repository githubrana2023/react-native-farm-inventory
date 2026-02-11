import { items } from '@/constants'
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import { DetailsRow } from './details-row'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Separator } from './ui/separator'


const ScannedItemCard = ({ item, enableActionBtn }: { item: typeof items[number], enableActionBtn?: boolean }) => {
    const [isEditState, setIsEditState] = React.useState(false)

    return (
        <Card className='bg-white border-muted my-1 p-3 gap-4'>
            <CardHeader className='flex-1 flex-row items-center justify-between px-0'>
                <View>
                    <CardTitle className='text-black'>
                        BARCODE
                    </CardTitle>
                    <CardDescription className='text-black'>
                        {item.barcode}
                    </CardDescription>
                </View>

                <View className="flex-row items-center gap-2 px-0">
                    {enableActionBtn ? (
                        <>
                            <Button className='bg-[#E8F1FC]' size={'sm'} onPress={() => setIsEditState(pre => !pre)}>
                                <FontAwesome6 name={isEditState ? "save" : "edit"} color={'#124DA1'} size={20} />
                            </Button>
                            {
                                !isEditState && (
                                    <Button variant={'destructive'} size={'sm'} onPress={() => alert('hello')}>
                                        <FontAwesome6 name={'trash'} size={20} color={'#fff'} />
                                    </Button>
                                )
                            }
                        </>
                    ) : (
                        <Badge variant="outline" className="border-muted-foreground rounded-full px-4 py-1 ">
                            <Text className='text-sm font-bold'>{item.quantity} {item.uom}</Text>
                        </Badge>
                    )}
                </View>

            </CardHeader>

            <CardContent className='flex-col gap-2 px-0 py-0'>
                <DetailsRow icon={{ library: 'FontAwesome', name: 'barcode' }} label='item code' value={item.item_code} />
                <DetailsRow icon={{ library: 'FontAwesome', name: 'file-text' }} label='description' value={item.description} />
            </CardContent>
            {
                enableActionBtn && (
                    <>
                        <Separator />
                        <CardFooter
                            className="flex items-center justify-between px-0"
                        >
                            <View className="flex-row items-center gap-2">
                                <View className='flex-row items-center justify-center w-8 h-8 bg-[##E8F1FC] rounded-md'>
                                    <MaterialIcons name={'layers'} color={"#124DA1"} size={20} />
                                </View>
                                <Text className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                                    Quantity
                                </Text>
                            </View>
                            {isEditState ? (
                                <Input className='flex-1 h-8 max-w-28' />
                            ) : (
                                <Badge variant="outline" className="border-muted-foreground rounded-full px-4 py-1 ">
                                    <Text className='text-sm font-bold'>{item.quantity} {item.uom}</Text>
                                </Badge>
                            )}
                        </CardFooter>
                    </>
                )
            }
        </Card>
    )
}

export default ScannedItemCard