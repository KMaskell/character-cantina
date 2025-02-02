import React, { FC } from 'react';
import { Badge, Spinner, Text, List, ListItem } from '@chakra-ui/react';
import useGetStarships from '../../hooks/useGetStarships';

interface StarshipsProps {
  urls: string[];
}

const Starships: FC<StarshipsProps> = ({ urls }) => {
  const { starships, isError, isLoading } = useGetStarships(urls);

  if (isLoading) return <Spinner size="sm" data-testid="loading-spinner" />;

  if (isError || !starships) {
    return (
      <Badge variant="outline" colorScheme="red">
        Error loading starships
      </Badge>
    );
  }

  return (
    <List spacing={2} styleType="disc" px={4}>
      {starships?.map((starship, index) => (
        <ListItem key={index}>
          <Text fontSize="sm">{starship}</Text>
        </ListItem>
      ))}
    </List>
  );
};

export default Starships;
