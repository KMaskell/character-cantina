import React, { FC } from 'react';
import { Badge, Spinner, Text, List, ListItem } from '@chakra-ui/react';
import useGetFilms from '../../hooks/useGetFilms';

interface FilmsProps {
  urls: string[];
}

const Films: FC<FilmsProps> = ({ urls }) => {
  const { films, isError, isLoading } = useGetFilms(urls);

  if (isLoading) return <Spinner size="sm" data-testid="loading-spinner" />;

  if (isError || !films) {
    return (
      <Badge variant="outline" colorScheme="red">
        Error loading films
      </Badge>
    );
  }

  return (
    <List spacing={2} styleType="disc" px={4}>
      {films?.map((film, index) => (
        <ListItem key={index}>
          <Text fontSize="sm">{film}</Text>
        </ListItem>
      ))}
    </List>
  );
};

export default Films;
