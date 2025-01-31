import { Heading } from '@chakra-ui/react';

const BuildRoutes = () => {
  const routes = [
    {
      path: '/characters',
      element: <Heading as="h1">Character List</Heading>,
    },
    {
      path: '/character/:uid',
      element: <Heading as="h1">Character Details</Heading>,
    },
    {
      path: '/favourites',
      element: <Heading as="h1">Favourites</Heading>,
    },
  ];
  return routes;
};
export default BuildRoutes;
