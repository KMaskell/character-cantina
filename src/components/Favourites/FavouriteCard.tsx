import React, { FC } from 'react';
import { Text, Button, Card, CardBody, Heading, Flex } from '@chakra-ui/react';
import Homeworld from '../Homeworld';

interface FavouriteCardProps {
  name: string;
  height: string;
  gender: string;
  homeworld: string;
  onRemove: () => void;
}

const FavouriteCard: FC<FavouriteCardProps> = ({
  name,
  height,
  gender,
  homeworld,
  onRemove,
}) => {
  return (
    <Card
      w="280px"
      h="220px"
      bgColor="gray.800"
      borderRadius="lg"
      boxShadow="0 8px 25px 0px rgba(0, 0, 0, 0.3)"
      border="1px solid"
      borderColor="teal.500"
      mb={4}
      backdropFilter="blur(15px)"
      overflow="hidden"
    >
      <CardBody>
        <Flex direction="column" gap={1} h="100%" justify="space-between">
          <Heading
            size="md"
            color="yellow.300"
            fontWeight="semibold"
            textAlign="center"
          >
            {name}
          </Heading>
          <Text fontSize="md" fontWeight="semibold">
            <Text as="span" color="teal.300" fontWeight="bold">
              Gender:
            </Text>{' '}
            {gender}
          </Text>
          <Text fontSize="md" fontWeight="semibold">
            <Text as="span" color="teal.300" fontWeight="bold">
              Height:
            </Text>{' '}
            {height}
          </Text>
          <Flex fontSize="md" color="gray.100" gap={1}>
            <Text as="span" color="teal.300" fontWeight="bold">
              Homeworld:
            </Text>
            <Homeworld url={homeworld} />
          </Flex>
          <Flex justify="center" mt={4}>
            <Button colorScheme="red" size="sm" onClick={onRemove}>
              Remove from Favourites
            </Button>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default FavouriteCard;
