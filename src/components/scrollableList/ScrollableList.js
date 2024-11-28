import React from 'react';
import { Box, Text } from '@chakra-ui/react';

const ElectionCategoryList = ({ categoryIds, parentElections }) => {
  const getParentElectionName = (election_category_id) => {
    if (!Array.isArray(election_category_id)) {
      election_category_id = [election_category_id]; // Normalize to array
    }

    return election_category_id.map((id) => {
      const parentElection = parentElections.find((e) => e._id === id);
      return parentElection ? parentElection.name : 'N/A';
    });
  };

  const categoryNames = getParentElectionName(categoryIds);

  return (
    <Box
      maxHeight="80px" // Limit height to 4 lines (adjust as needed)
      overflowY="auto"
      overflowX="hidden"
      border="1px solid #e2e8f0"
      borderRadius="md"
      padding="4px"
      pr="10px"
      borderWidth ="0px"
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#082463',
          borderRadius: '2px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1',
        },
      }}
    >
      {categoryNames.map((name, index) => (
        <Text key={index} fontSize="sm">
          {name}
        </Text>
      ))}
    </Box>
  );
};

export default ElectionCategoryList;
