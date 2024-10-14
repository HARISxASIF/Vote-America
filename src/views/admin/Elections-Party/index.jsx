import React, { useEffect, useState } from 'react';
// import { Box, Button, Flex } from '@chakra-ui/react';
import { fetchElectionsParty } from '../../../action/ElectionsParty-API/getElectionParty';
import  {fetchElectionsCategory} from '../../../action/ElectionsCategory-API/getElectionCategory';
import ElectionPartyTable from './components/ElectionPartyTable';
import ElectionPartyModal from './components/ElectionPartyModal';

const ElectionsPartyData = () => {
  const [electionsParty, setElectionsParty] = useState([]);
  const [parentElections, setParentElections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedElectionParty, setSelectedElectionParty] = useState(null);
  const token = localStorage.getItem('authToken');

  const getElectionsParty = async () => {
    try {
      const data = await fetchElectionsParty();
      // console.log('Fetched Elections Party:', data);
      setElectionsParty(data.electionParties);
    } catch (error) {
      console.error('Failed to fetch elections party:', error);
    }
  };

  const getParentElections = async () => {
    try {
      const data = await fetchElectionsCategory();
      setParentElections(data.electionCategories);
    } catch (error) {
      console.error('Failed to fetch parent elections:', error);
    }
  };

  useEffect(() => {
    getElectionsParty();
    getParentElections();
  }, []);

  const handleEdit = (party) => {
    setSelectedElectionParty(party);
    setIsModalOpen(true);
  };

  return (
    <div>
      <ElectionPartyTable 
        electionsParty={electionsParty} 
        parentElections={parentElections} 
        onEdit={handleEdit} 
        onDelete={getElectionsParty} 
        token={token} 
        openModal={() => setIsModalOpen(true)}
      />
      <ElectionPartyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedElectionParty(null);
        }}
        onSuccess={getElectionsParty}
        selectedElectionParty={selectedElectionParty}
        parentElections={parentElections}
      />
    </div>
  );
};

export default ElectionsPartyData;
