import React, { FC } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { Character } from '../../types/Characters';
import Homeworld from '../Homeworld/Homeworld';
import { capitalise } from '../../utils/stringUtils';

interface CharacterTableProps {
  characters: Character[];
  onCharacterClick: (url: string) => void;
}

const CharacterTable: FC<CharacterTableProps> = ({
  characters,
  onCharacterClick,
}) => {
  if (characters.length === 0) {
    return null;
  }

  return (
    <Table variant="simple" size="sm">
      <Thead>
        <Tr>
          <Th fontSize={{ base: '12', md: '14' }} p={{ base: 2, md: 4 }}>
            Name
          </Th>
          <Th fontSize={{ base: '12', md: '14' }} p={{ base: 2, md: 4 }}>
            Gender
          </Th>
          <Th fontSize={{ base: '12', md: '14' }} p={{ base: 2, md: 4 }}>
            Homeworld
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {characters.map((character) => (
          <Tr
            key={character.name}
            onClick={() => onCharacterClick(character.url)}
            cursor="pointer"
            _hover={{
              bg: 'blackAlpha.600',
            }}
            data-testid={character.name}
          >
            <Td p={{ base: 2, md: 4 }}>{character.name}</Td>
            <Td p={{ base: 2, md: 4 }}>{capitalise(character.gender)}</Td>
            <Td p={{ base: 2, md: 4 }}>
              <Homeworld url={character.homeworld} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default CharacterTable;
