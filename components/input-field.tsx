import React from 'react'
import { FormControl, FormItem, FormMessage } from './ui/form'
import { Input } from './ui/input'


type InputFieldProps = React.ComponentProps<typeof Input>

const InputField = (inputProps: InputFieldProps) => {
    return (
        <FormItem>
            <FormControl>
                <Input{...inputProps} />
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}

export default InputField