import React, { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Heading, Text, Button, Flex } from '@chakra-ui/react';
import CharacterNotFound from './CharacterNotFound';
import useGetCharacterDetails from '../../hooks/useGetCharacterDetails';
import LoadingSpinner from '../LoadingSpinner';
import Homeworld from '../Homeworld';
import { capitalise } from '../../utils/stringUtils';
import Films from '../Films';
import Starships from '../Starships';
import useFavouriteManager from '../../hooks/useFavouriteManager';

const CharacterDetails: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: character,
    isLoading,
    isError,
  } = useGetCharacterDetails(id ?? '');

  const { addToFavourites, removeFromFavourites, isFavourite } =
    useFavouriteManager();

  if (isLoading)
    return <LoadingSpinner message="Loading character details..." />;

  if (isError || !character) {
    return <CharacterNotFound />;
  }

  const {
    name,
    height,
    hair_color,
    eye_color,
    gender,
    homeworld,
    films,
    starships,
  } = character;

  const handleFavouriteClick = () => {
    if (isFavourite(id)) {
      removeFromFavourites(id);
    } else {
      addToFavourites({
        id,
        name,
        height,
        gender,
        homeworld,
      });
    }
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleGoToFavesClick = () => {
    navigate('/favourites');
  };

  return (
    <Flex direction="column" align="center" p={4} color="white">
      <Box
        maxW="lg"
        bgColor="gray.800"
        opacity={0.8}
        borderRadius="md"
        p={6}
        w="100%"
      >
        <Heading as="h1" size="lg" textAlign="center" color="teal.400" mb={2}>
          {name}
        </Heading>
        <Text fontSize="md" fontWeight="semibold">
          <Text as="span" color="teal.300" fontWeight="bold">
            Hair Colour:
          </Text>{' '}
          {capitalise(hair_color)}
        </Text>
        <Text fontSize="md" fontWeight="semibold">
          <Text as="span" color="teal.300" fontWeight="bold">
            Eye Colour:
          </Text>{' '}
          {capitalise(eye_color)}
        </Text>
        <Text fontSize="md" fontWeight="semibold">
          <Text as="span" color="teal.300" fontWeight="bold">
            Gender:
          </Text>{' '}
          {capitalise(gender)}
        </Text>
        <Text as="span" color="teal.300" fontWeight="bold">
          Homeworld:
        </Text>{' '}
        <Homeworld url={homeworld} />
        <Heading size="md" mt={4} color="teal.300">
          Films
        </Heading>
        <Films urls={films} />
        <Heading size="md" mt={4} color="teal.300">
          Starships
        </Heading>
        {starships && starships.length === 0 ? (
          <Text fontSize="sm" color="gray.500">
            Didn't pilot any starships
          </Text>
        ) : (
          <Starships urls={starships} />
        )}
        <Flex
          gap={4}
          justify="center"
          direction={{ base: 'column', md: 'row' }}
          mt={4}
        >
          <Button
            colorScheme={isFavourite(id) ? 'red' : 'teal'}
            size="sm"
            onClick={handleFavouriteClick}
          >
            {isFavourite(id) ? 'Remove from Favourites' : 'Add to Favourites'}
          </Button>
          <Button size="sm" onClick={handleHomeClick}>
            Go back home
          </Button>
          <Button size="sm" onClick={handleGoToFavesClick} colorScheme="teal">
            Go to Favourites
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CharacterDetails;
