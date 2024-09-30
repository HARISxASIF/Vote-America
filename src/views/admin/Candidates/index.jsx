import React, { useEffect, useState } from 'react';
// import { Box, Button, Flex } from '@chakra-ui/react';
import { fetchCandidates } from '../../../action/Candidate-API/getCandidate'; // Replace API fetch function
import CandidateTable from './components/CandidateTable';
import CandidateModal from './components/CandidateModal';

const CandidateData = () => {
  const [candidates, setCandidates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const token = localStorage.getItem('authToken');

  const getCandidates = async () => {
    try {
      const data = await fetchCandidates(); // Replace API call with users API
      setCandidates(data.candidates); // Update to use `users` array from API data
    } catch (error) {
      console.error('Failed to fetch candidates:', error);
    }
  };

  useEffect(() => {
    getCandidates();
  }, []);

  const handleEdit = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  return (
    <div>
      <CandidateTable 
        candidates={candidates}  // Pass users to the table component
        onEdit={handleEdit} 
        onDelete={getCandidates} 
        token={token} 
        openModal={() => setIsModalOpen(true)}
      />
      <CandidateModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedCandidate(null);
        }}
        onSuccess={getCandidates}
        selectedCandidate={selectedCandidate}  // Update to use selectedUser
      />
    </div>
  );
};

export default CandidateData;