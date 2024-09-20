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
import MainDashboard from 'views/admin/default';
import Users from 'views/admin/users';
import StateElections from 'views/admin/stateElection';
import LocalElections from 'views/admin/localElection';


// Auth Imports
import SignInCentered from 'views/auth/signIn';

const routes = [
  // {
  //   name: 'Dashboard',
  //   layout: '/admin',
  //   path: '/default',
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: <MainDashboard />,
  // },
  // {
  //   name: 'NFT Marketplace',
  //   layout: '/admin',
  //   path: '/nft-marketplace',
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width="20px"
  //       height="20px"
  //       color="inherit"
  //     />
  //   ),
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  // {
  //   name: 'Data Tables',
  //   layout: '/admin',
  //   icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
  //   path: '/data-tables',
  //   component: <DataTables />,
  // },
  {
    name: 'Users',
    layout: '/admin',
    path: '/users',
    icon: <Icon as={MdPerson} width="20px" height="20px" color="#082463" />,
    component: <Users />,
  },
  {
    name: 'State Elections',
    layout: '/admin',
    path: '/state-elections',
    icon: <Icon as={MdOutlineLocalPolice} width="20px" height="20px" color="#082463" />,
    component: <StateElections />,
  },
  {
    name: 'Local Elections',
    layout: '/admin',
    path: '/local-elections',
    icon: <Icon as={MdOutlineLocalPolice} width="20px" height="20px" color="#082463" />,
    component: <LocalElections />,
  },
  // {
  //   name: 'Profile',
  //   layout: '/admin',
  //   path: '/profile',
  //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  //   component: <Profile />,
  // },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="#082463" />,
    component: <SignInCentered />,
  },
  // {
  //   name: 'RTL Admin',
  //   layout: '/rtl',
  //   path: '/rtl-default',
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: <RTL />,
  // },
];

export default routes;
