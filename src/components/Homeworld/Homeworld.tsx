import React, { FC } from 'react';
import useGetHomeworld from '../../hooks/useGetHomeworld';
import { Badge, Spinner, Text } from '@chakra-ui/react';

interface HomeworldProps {
  url: string;
}

const Homeworld: FC<HomeworldProps> = ({ url }) => {
  const { homeworld, isError, isLoading } = useGetHomeworld(url);

  if (isLoading) return <Spinner size="sm" />;

  if (isError || !homeworld) {
    return (
      <Badge variant="outline" colorScheme="red">
        Error loading homeworld
      </Badge>
    );
  }

  return <Text as="span">{homeworld?.name || 'Unknown'}</Text>;
};

export default Homeworld;
