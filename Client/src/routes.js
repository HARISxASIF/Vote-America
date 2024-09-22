import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdOutlineLocalPolice ,
} from 'react-icons/md';

// Admin Imports
import Users from 'views/admin/users';
import Elections from 'views/admin/Elections';


// Auth Imports
import SignInCentered from 'views/auth/signIn';

const routes = [
  {
    name: 'Users',
    layout: '/admin',
    path: '/users',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="#082463" />,
    component: <Users />,
  },
  {
    name: 'Elections',
    layout: '/admin',
    path: '/elections',
    icon: <Icon as={MdOutlineLocalPolice} width="20px" height="20px" color="#082463" />,
    component: <Elections />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="#082463" />,
    component: <SignInCentered />,
  },
];

export default routes;
