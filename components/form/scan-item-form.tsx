import { ScanItemFormData } from "@/schema/scan-item-form-schema"
import { Controller, useForm } from "react-hook-form"
import { Button, Text, TextInput, View } from "react-native"
import { Input } from "../ui/input"


export default function ScanItemForm() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ScanItemFormData>({
        defaultValues: {
            barcode: "",
            uom: "",
            quantity: 1,
        },
    })
    const onSubmit = handleSubmit(value => {
        alert(JSON.stringify(value))
    })


    return (
        <View>
            <Controller
                control={control}
                name="barcode"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Barcode"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.barcode && <Text>This is required.</Text>}

            <Controller
                control={control}
                name="uom"
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="UOM"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                )}
            />
            {errors.uom && <Text>This is required.</Text>}


            <Controller
                control={control}
                name="quantity"
                render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                        placeholder="Quantity"
                        keyboardType="numeric"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value.toString()}
                    />
                )}
            />
            {errors.quantity && <Text>This is required.</Text>}

            <Button title="Submit" onPress={onSubmit} />
        </View>
    )
}