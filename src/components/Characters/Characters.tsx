import React, { ChangeEvent, FC, useState } from 'react';
import { Flex, Heading, Input, Button, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useGetCharacters from '../../hooks/useGetCharacters';
import LoadingSpinner from '../LoadingSpinner';
import CharacterTable from './CharacterTable';
import Toast from '../Toast';
import { extractIdFromUrl } from '../../utils/stringUtils';

const Characters: FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const limit = 10;
  const navigate = useNavigate();

  const { data, isLoading, isError } = useGetCharacters(page, limit);

  const characters = data?.results;

  const filteredCharacters = characters?.filter((character) =>
    character.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) return <LoadingSpinner message="Loading characters..." />;

  if (isError || !data || !data.results) {
    return (
      <Toast
        status="error"
        title="Error"
        description="Failed to load characters. Please refresh and try again."
      />
    );
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleCharacterClick = (url: string) => {
    const id = extractIdFromUrl(url);
    navigate(`/character-details/${id}`);
  };

  const hasCharacters = filteredCharacters && filteredCharacters.length > 0;

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
          Characters
        </Heading>
      </Flex>

      <Flex direction="column" flex="1" overflowY="auto" p={4}>
        {!characters ? (
          <Text textAlign="center">No characters were found</Text>
        ) : (
          <>
            <Input
              placeholder="Search characters..."
              value={search}
              onChange={handleSearchChange}
              mb={4}
              bg="gray.800"
              color="white"
              _placeholder={{ color: 'gray.300' }}
              border="1px solid"
              borderColor="gray.500"
              _focus={{
                borderColor: 'yellow.400',
                boxShadow: '0 0 0 2px yellow.400',
              }}
              style={{ cursor: 'pointer' }}
            />

            <Flex direction="column" flex="1" overflowY="auto">
              <CharacterTable
                characters={filteredCharacters || []}
                onCharacterClick={handleCharacterClick}
              />
            </Flex>
          </>
        )}

        {hasCharacters && (
          <Flex justify="space-between" my={4}>
            <Button
              size="sm"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              isDisabled={!data.previous}
            >
              Previous
            </Button>
            <Button
              size="sm"
              onClick={() => setPage((prev) => prev + 1)}
              isDisabled={!data.next}
            >
              Next
            </Button>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default Characters;
