'use client'

import { Flex, Heading, Button, HStack, Link as ChakraLink, Menu, MenuButton, MenuList, MenuItem, Avatar } from '@chakra-ui/react'
import { UnlockIcon, ChevronDownIcon } from "@chakra-ui/icons"
import Link from 'next/link'

export default function Navbar() {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <Flex justifyContent="space-between" alignItems="center" px={6} py={4} bg="white" shadow="sm">
      <Heading size="lg">Next Chakra</Heading>
      
      <HStack spacing={8}>
        {navItems.map((item) => (
          <ChakraLink
            key={item.href}
            as={Link}
            href={item.href}
            _hover={{ color: 'blue.500', textDecoration: 'none' }}
            fontWeight="500"
            color="gray.700"
          >
            {item.label}
          </ChakraLink>
        ))}
      </HStack>

      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="ghost">
          <HStack spacing={2}>
            <Avatar size="sm" name="John Doe" />
          </HStack>
        </MenuButton>
        <MenuList>
          <MenuItem isDisabled>
            John Doe
          </MenuItem>
          <MenuItem>
            Profile
          </MenuItem>
          <MenuItem>
            Settings
          </MenuItem>
          <MenuItem>
            Logout
          </MenuItem>
        </MenuList>
      </Menu>

      <Button leftIcon={<UnlockIcon />} colorScheme="blue" size="sm">
        Login
      </Button>
    </Flex>
  )
}
