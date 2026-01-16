'use client'

import { Box, Container, Flex, Text, Link as ChakraLink } from '@chakra-ui/react'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <Box bg="gray.900" color="white" py={4}>
      <Container maxW="container.lg">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" color="gray.400">
            © {currentYear} Next Chakra. All rights reserved.
          </Text>
          <Flex gap={6} fontSize="sm">
            <ChakraLink as={Link} href="/privacy" _hover={{ color: 'blue.400' }}>
              Privacy
            </ChakraLink>
            <ChakraLink as={Link} href="/terms" _hover={{ color: 'blue.400' }}>
              Terms
            </ChakraLink>
            <ChakraLink as={Link} href="/contact" _hover={{ color: 'blue.400' }}>
              Contact
            </ChakraLink>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
