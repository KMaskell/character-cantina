import { Text, Button, Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

const CharacterNotFound: FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <Flex direction="column" align="center" justify="center" p={4}>
      <Text textAlign="center" fontSize="sm" color="red.500">
        Character not found
      </Text>
      <Button mt={2} size="sm" onClick={handleGoBack}>
        Go Back Home
      </Button>
    </Flex>
  );
};

export default CharacterNotFound;
