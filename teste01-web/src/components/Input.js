import { FormControl, Input as ChakraInput, FormErrorMessage, Text, InputProps as ChakraInputProps, useColorModeValue } from '@chakra-ui/react';
import { forwardRef } from 'react';

const InputBase = ({ name, label, error = null, ...rest }, ref) => (
    <FormControl isInvalid={Boolean(error)}>
        {label && (
            <Text fontSize='14' fontWeight='bold'>{label}</Text>
        )}

        <ChakraInput
            name={name}
            fontSize='14'
            border='1px'
            focusBorderColor='white'
            variant='filled'
            bg={useColorModeValue('#fff', '#222')}
            color={useColorModeValue('#222', '#fff')}
            _placeholder={{ color: `${useColorModeValue('#222', '#fff')}`, opacity: 0.3 }}
            size='md'
            ref={ref}
            {...rest}
        />

        {Boolean(error) && (
            <FormErrorMessage color='red' fontSize='12' mt='0' mb='4'>
                {error.message == 'unity must be a `number` type, but the final value was: `NaN` (cast from the value `""`).' ? 'Precisa ser um número.' : error.message}
            </FormErrorMessage>
        )}
    </FormControl>
);

export const Input = forwardRef(InputBase);
