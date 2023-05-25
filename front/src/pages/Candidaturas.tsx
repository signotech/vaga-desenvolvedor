import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardList, { CardData } from '../components/CardList';
import Pagination from '../components/Pagination';
import '../components/scss/vagas.scss';

const CandidaturasPage: React.FC = () => {
  const [cardData, setCardData] = useState<CardData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(20);
  const [userData, setUserData] = useState<any>({});
  const [userAppliedJobs, setUserAppliedJobs] = useState<any>([]);

  const fetchCardData = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const options = {
      method: 'GET',
      url: `http://localhost:3001/users/${userId}/jobs`,
      headers: { authorization: `Bearer ${token}` },
    };
    try {
      const response = await axios(options);
      const responseData = response.data;
      setUserAppliedJobs(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCardData();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (value: number) => {
    setLimit(value);
    setTotalPages(Math.ceil(cardData.length / value));
  };

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    return cardData.slice(startIndex, endIndex);
  };

  const paginatedData = getPaginatedData();

  return (
    <div>
      <h2>Candidaturas</h2>
      <CardList data={userAppliedJobs} showApplyButton={false} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        limitOptions={[10, 20, 30, 40, 50]}
        limit={limit}
        onChangeLimit={handleLimitChange}
        onChangePage={handlePageChange}
      />
    </div>
  );
};

export default CandidaturasPage;
