'use client'

import { VStack, Box, Link as ChakraLink, Icon, Text } from '@chakra-ui/react'
import { HomeIcon, InfoIcon, SettingsIcon, PhoneIcon } from '@chakra-ui/icons'
import Link from 'next/link'

export default function Sidebar() {
  const sidebarItems = [
    { label: 'Home', href: '/', icon: HomeIcon },
    { label: 'About', href: '/about', icon: InfoIcon },
    { label: 'Services', href: '/services', icon: SettingsIcon },
    { label: 'Contact', href: '/contact', icon: PhoneIcon },
  ]

  return (
    <Box bg="gray.50" color="gray.800" h="100vh" p={6} shadow="lg">
      <Text fontSize="xl" fontWeight="bold" mb={8}>
        Menu
      </Text>
      <VStack spacing={4} align="stretch">
        {sidebarItems.map((item) => (
          <ChakraLink
            key={item.href}
            as={Link}
            href={item.href}
            display="flex"
            alignItems="center"
            px={4}
            py={3}
            borderRadius="md"
            _hover={{ bg: 'gray.200', textDecoration: 'none' }}
            transition="all 0.2s"
            fontWeight="500"
          >
            <Icon as={item.icon} mr={3} />
            {item.label}
          </ChakraLink>
        ))}
      </VStack>
    </Box>
  )
}
