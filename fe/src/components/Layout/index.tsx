import { Box } from '@chakra-ui/react'

export const Layout = (props: any) => (
  <Box
    px={[4, 8, 12, 14]}
    {...props}
    minHeight="100vh"
    height="100%"
    overflow="clip"
    // mb={[24, 16]}
  >
    {props.children}
  </Box>
)
