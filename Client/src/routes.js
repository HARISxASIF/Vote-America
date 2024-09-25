import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdPerson,
  MdLock,
  MdOutlineLocalPolice ,
} from 'react-icons/md';
import { BiCategory } from "react-icons/bi";
import { IoRibbon } from "react-icons/io5";

// Admin Imports
// import Users from 'views/admin/users';
import Elections from 'views/admin/Elections';
import ElectionsCategory from 'views/admin/Elections Category';
import ElectionsParty from 'views/admin/Elections-Party';


// Auth Imports
import SignInCentered from 'views/auth/signIn';

const routes = [
  // {
  //   name: 'Users',
  //   layout: '/admin',
  //   path: '/users',
  //   icon: <Icon as={MdPerson} width="20px" height="20px" color="#082463" />,
  //   component: <Users />,
  // },
  {
    name: 'Elections',
    layout: '/admin',
    path: '/elections',
    icon: <Icon as={MdOutlineLocalPolice} width="20px" height="20px" color="#082463" />,
    component: <Elections />,
  },
  {
    name: 'Election Categories',
    layout: '/admin',
    path: '/election-categories',
    icon: <Icon as={BiCategory} width="20px" height="20px" color="#082463" />,
    component: <ElectionsCategory />,
  },
  {
    name: 'Elections Party',
    layout: '/admin',
    path: '/elections-party',
    icon: <Icon as={IoRibbon} width="20px" height="20px" color="#082463" />,
    component: <ElectionsParty />,
  },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="#082463" />,
    component: <SignInCentered />,
    isHidden: true,
  },
];

export default routes;
