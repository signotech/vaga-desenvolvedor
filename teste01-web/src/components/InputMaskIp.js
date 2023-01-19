import { FormControl, Input as ChakraInput, FormErrorMessage, Text, InputProps as ChakraInputProps, useColorModeValue } from '@chakra-ui/react';
import { forwardRef } from 'react';
import InputMask from 'react-input-mask';

function InputIPAddress({ name, label, error = null, ...rest }, props) {
    function checkIpValue(value) {
        const subips = value.split('.');
        if (subips.length > 4) {
            return false;
        }

        const invalidSubips = subips.filter(ip => {
            ip = parseInt(ip);
            return ip < 0 || ip > 255;
        });
        if (invalidSubips.length !== 0) {
            return false;
        }

        let emptyIpCount = 0;
        subips.forEach(ip => {
            if (ip === '') {
                emptyIpCount++;
            }
        });
        if (emptyIpCount > 1) {
            return false;
        }

        return true;
    }

    return (
        <FormControl isInvalid={Boolean(error)}>
            {label && (
                <Text fontSize='14' fontWeight='bold'>{label}</Text>
            )}
            <ChakraInput
                formatChars={{
                    9: '[0-9\.]',
                }}
                as={InputMask}
                mask='999999999999999'
                maskChar={null}
                alwaysShowMask={false}
                focusBorderColor='white'
                variant='filled'
                bg={useColorModeValue('#fff', '#222')}
                color={useColorModeValue('#222', '#fff')}
                _placeholder={{ color: `${useColorModeValue('#222', '#fff')}`, opacity: 0.3 }}
                size='md'
                border='1px solid black'
                borderRadius={6}
                beforeMaskedValueChange={(newState, oldState, userInput) => {
                    let { value } = newState;
                    const oldValue = oldState.value;
                    let { selection } = newState;
                    let cursorPosition = selection ? selection.start : null;
                    const result = checkIpValue(value);
                    if (!result) {
                        value = value.trim();
                        // Try to add . before the last char to see if it is valid ip address
                        const newValue = value.substring(0, value.length - 1) + '.' + value.substring(value.length - 1);
                        if (checkIpValue(newValue)) {
                            cursorPosition++;
                            selection = { start: cursorPosition, end: cursorPosition };
                            value = newValue;
                        } else {
                            value = oldValue;
                        }
                    }

                    return {
                        value,
                        selection,
                    };
                }}
                {...rest}
            />

            {Boolean(error) && (
                <FormErrorMessage fontSize='12' mt='0' mb='4'>
                    {error.message == 'number must be a `number` type, but the final value was: `NaN` (cast from the value `""`).' ? 'Precisa ser um número' : error.message}
                </FormErrorMessage>
            )}
        </FormControl>

    );
}

const InputMkkIp = ({ name, label, error = null, ...rest }, ref) => (
    <FormControl isInvalid={Boolean(error)}>
        {label && (
            <Text fontSize='14' fontWeight='bold'>{label}</Text>
        )}

        <ChakraInput
            name={name}
            as={InputMask}
            fontSize='14'
            border='1px'
            maskChar={null}
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
            <FormErrorMessage fontSize='12' mt='0' mb='4'>
                {error.message == 'number must be a `number` type, but the final value was: `NaN` (cast from the value `""`).' ? 'Precisa ser um número' : error.message}
            </FormErrorMessage>
        )}
    </FormControl>
);

export const InputMkIp = forwardRef(InputIPAddress);
