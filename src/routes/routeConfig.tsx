import Characters from '../components/Characters';
import CharacterDetails from '../components/CharacterDetails';
import Favourites from '../components/Favourites';

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
    element: <Favourites />,
    label: 'Favourites',
  },
];

export default BuildRoutes;
