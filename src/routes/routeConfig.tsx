import { Heading } from '@chakra-ui/react';
import Characters from '../components/Characters';
import CharacterDetails from '../components/CharacterDetails';

const BuildRoutes = () => [
  {
    path: '/',
    element: <Characters />,
    label: 'Characters',
  },
  {
    path: '/character-details/:id',
    element: <CharacterDetails />,
  },
  {
    path: '/favourites',
    element: <Heading as="h1">Favourites</Heading>,
    label: 'Favourites',
  },
];

export default BuildRoutes;
