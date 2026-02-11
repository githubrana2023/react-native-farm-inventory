import { items } from '@/constants'
import { FontAwesome6 } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import { DetailsRow } from './details-row'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Separator } from './ui/separator'


const ScannedItemCard = ({ item, enableActionBtn }: { item: typeof items[number], enableActionBtn?: boolean }) => {

    const [isEditStage, setIsEditState] = React.useState(false)
    const [q, setQ] = React.useState(item.quantity || 0)

    return (
        <Card className='bg-white border-muted my-1 p-3 gap-3'>
            <CardHeader className='flex-1 flex-row items-center justify-between px-0'>
                <View>
                    <CardTitle className='text-black'>
                        BARCODE
                    </CardTitle>
                    <CardDescription className='text-black'>
                        {item.barcode}
                    </CardDescription>
                </View>

                {!enableActionBtn ? (
                    <Badge
                        variant="outline"
                        className="border-muted-foreground rounded-full px-4 py-1 "
                    >
                        <Text className='text-sm font-bold'>{item.quantity} {item.uom}</Text>
                    </Badge>
                ) : (
                    <View className='flex-row items-center gap-1'>
                        <Button variant='outline' size={'sm'} onPress={() => setIsEditState(prev => !prev)}>
                            <FontAwesome6 name={isEditStage ? "save" : 'edit'} color={"#124DA1"} size={20} />
                        </Button>
                        {!isEditStage && (
                            <Button variant='destructive' size={'sm'} className=''>
                                <FontAwesome6 name={'trash-can'} color={"#fff"} size={20} />
                            </Button>
                        )}
                    </View>
                )}


            </CardHeader>
            <Separator className='m-0 p-0' />
            <CardContent className='flex-col gap-2 px-0 py-0'>
                <DetailsRow icon={{ library: 'FontAwesome', name: 'barcode' }} label='item code' value={item.item_code} />
                <DetailsRow icon={{ library: 'FontAwesome', name: 'file-text' }} label='description' value={item.description} />
            </CardContent>
            {enableActionBtn && (
                <>
                    <Separator className='m-0 p-0' />
                    <CardFooter className="flex-row items-center justify-between gap-2 p-0">
                            <View className='flex-row items-center gap-1'>
                                <View className='flex-row items-center justify-center w-8 h-8 bg-[##E8F1FC] rounded-md'>
                                    <FontAwesome6 name={'layer-group'} color={"#124DA1"} size={20} />
                                </View>
                                <Text className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                                    Quantity
                                </Text>
                            </View>

                            {
                                !isEditStage ? (
                                    <Badge
                                        variant="outline"
                                        className="border-muted-foreground rounded-full px-4 py-1 "
                                    >
                                        <Text className='text-sm font-bold'>{item.quantity} {item.uom}</Text>
                                    </Badge>
                                ) : (
                                    <Input
                                        className='flex-1 h-8 max-w-24'
                                        value={q <= 0 ? "" : q.toString()}
                                        keyboardType='numeric'
                                        onChangeText={(text) => setQ(parseInt(text) || 0)}
                                    />

                                )
                            }
                    </CardFooter>
                </>
            )}
        </Card>
    )
}

export default ScannedItemCard

