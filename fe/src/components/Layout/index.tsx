import { Box, BoxProps } from '@chakra-ui/react'

interface LayoutProps extends BoxProps {}

export const Layout = (props: LayoutProps) => (
  <Box
    px={[4, 8, 12, 14]}
    {...props}
    minHeight="100vh"
    height="100%"
    overflow="clip"
    {...props}
  >
    {props.children}
  </Box>
)
