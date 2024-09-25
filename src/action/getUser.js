import React from 'react';

export async function getUser() {
  const response = await fetch('http://localhost:3000/elections', {
    method: 'GET',
    headers: {
      Authorization:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmUzZjE0ODJmZGU1YmQzMGNiZTYxOTUiLCJpYXQiOjE3MjY0ODYwMDcsImV4cCI6MTcyNjQ4OTYwN30.59wWDABfPL0nB8rfrdygkM58MeawxwKhUnrOXav4-R8',
    },
  });

  if (response.ok) {
    return response.json();
  }
}
