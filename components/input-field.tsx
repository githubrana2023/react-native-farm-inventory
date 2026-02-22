import React from "react";
import { FormControl, FormDescription, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

type InputFieldProps = React.ComponentProps<typeof Input> & {
  description?: string;
};

const InputField = ({ description, ...inputProps }: InputFieldProps) => {
  return (
    <FormItem>
      <FormControl>
        <Input {...inputProps} />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};

export default InputField;
