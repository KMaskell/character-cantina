import { Flex, Link, Text, Box } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavigationMenuProps {
  links: { name: string; path: string }[];
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ links }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Flex
      as="nav"
      aria-label="Main navigation"
      bg="blackAlpha.700"
      backdropFilter="blur(8px)"
      px={6}
      py={3}
      borderRadius="md"
      align="center"
      gap={6}
      mx="auto"
      boxShadow="lg"
    >
      {links.map((link) => {
        const isActive = location.pathname === link.path;

        return (
          <Link
            key={link.path}
            aria-label={link.name}
            onClick={() => navigate(link.path)}
            fontSize="lg"
            fontWeight="bold"
            color="yellow.400"
            textTransform="capitalize"
            position="relative"
            px={3}
            py={2}
            cursor="pointer"
            transition="all 0.3s ease-in-out"
            _hover={{
              textDecoration: 'none',
              color: 'yellow.300',
              transform: 'scale(1.05)',
              textShadow: '0px 0px 8px yellow.500',
            }}
            _focus={{
              outline: 'none',
              color: 'yellow.300',
              boxShadow: '0px 0px 15px yellow.500',
              transform: 'scale(1.07)',
            }}
          >
            <Text>{link.name}</Text>

            {isActive && (
              <Box
                position="absolute"
                insetX="0"
                bottom="-3px"
                height="2px"
                bg="yellow.400"
                boxShadow="0px 0px 6px yellow.500"
                borderRadius="full"
              />
            )}
          </Link>
        );
      })}
    </Flex>
  );
};

export default NavigationMenu;
