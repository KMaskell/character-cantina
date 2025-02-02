import { Heading } from '@chakra-ui/react';
import Characters from '../components/Characters';

const BuildRoutes = () => [
  {
    path: '/',
    element: <Characters />,
    label: 'Characters',
  },
  {
    path: '/character/:uid',
    element: <Heading as="h1">Character Details</Heading>,
  },
  {
    path: '/favourites',
    element: <Heading as="h1">Favourites</Heading>,
    label: 'Favourites',
  },
];

export default BuildRoutes;
