import React, { FC } from 'react';
import useGetHomeworld from '../../hooks/useGetHomeworld';
import { Flex, Icon, Spinner, Text } from '@chakra-ui/react';
import { WarningIcon } from '@chakra-ui/icons';

interface HomeworldProps {
  url: string;
}

const Homeworld: FC<HomeworldProps> = ({ url }) => {
  const { homeworld, isError, isLoading } = useGetHomeworld(url);

  if (isLoading) return <Spinner size="sm" />;

  if (isError || !homeworld) {
    return (
      <Flex align="center" gap={1} color="red.500">
        <Icon as={WarningIcon} w={4} h={4} mr={1} />
        <Text>Error loading homeworld</Text>
      </Flex>
    );
  }

  return <Text>{homeworld?.name || 'Unknown'}</Text>;
};

export default Homeworld;
