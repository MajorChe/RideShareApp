import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Field, useField } from "formik";

const TextField = ({ label, ...props }) => {
  const [field, setField] = useField(props);
  return (
    <FormControl isInvalid={setField.touched && setField.error}>
      <FormLabel>{label}</FormLabel>
      <Input as={Field} {...field} {...props} />
      <FormErrorMessage>{setField.error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextField;