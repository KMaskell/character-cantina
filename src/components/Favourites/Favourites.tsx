import React, { FC } from 'react';
import { Heading, Text, Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import FavouriteCard from './FavouriteCard';
import useFavouriteManager from '../../hooks/useFavouriteManager';

const Favourites: FC = () => {
  const navigate = useNavigate();
  const { favourites, removeFromFavourites } = useFavouriteManager();

  return (
    <Flex direction="column" height="100vh" overflow="hidden">
      <Flex
        w="100%"
        flexShrink={0}
        p={4}
        justify={{ base: 'center', md: 'flex-start' }}
      >
        <Heading
          as="h1"
          textAlign={{ base: 'center', md: 'left' }}
          color="teal.400"
        >
          Favourites
        </Heading>
      </Flex>

      <Flex direction="column" flex="1" overflowY="auto" p={4}>
        {favourites.length === 0 ? (
          <Text color="gray.500">No favourites added yet</Text>
        ) : (
          <Flex wrap="wrap" gap={4} justify="center">
            {favourites.map((fave) => (
              <FavouriteCard
                key={fave.id}
                name={fave.name}
                height={fave.height}
                gender={fave.gender}
                homeworld={fave.homeworld}
                onRemove={() => removeFromFavourites(fave.id)}
              />
            ))}
          </Flex>
        )}

        <Flex justify={{ base: 'center', md: 'flex-start' }} mt={6} w="100%">
          <Button
            colorScheme="teal"
            size="sm"
            w={{ base: '100%', md: 'auto' }}
            onClick={() => navigate('/')}
          >
            Go back home
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Favourites;
