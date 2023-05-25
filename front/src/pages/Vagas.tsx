import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardList, { CardData } from '../components/CardList';
import Input from '../components/Input';
import Pagination from '../components/Pagination';
import Modal from '../components/Modal';
import ModalCandidaturas from '../components/ModalCandidaturas';

//scss
import '../components/scss/vagas.scss';
import '../components/scss/modal.scss'

//img
import closeImg from '../img/Close.svg';
import greenSuccess from '../img/checkmark-303752_1920.png';

const VagasPage: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [cardData, setCardData] = useState<CardData[]>([]);
    const [filteredCardData, setFilteredCardData] = useState<CardData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(20);
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false); 

    const fetchCardData = async () => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const optionsUser = {
            method: 'GET',
            url: `http://localhost:3001/users/${userId}`,
            headers: { authorization: `Bearer ${token}` },
        };
        const options = {
            method: 'GET',
            url: 'http://localhost:3001/jobs/',
            headers: { authorization: `Bearer ${token}` },
        };
        try {
            const responseUser = await axios(optionsUser);
            const responseUserData = responseUser.data;
            const response = await axios(options);
            const listJobsDisponivel = response.data.data.filter((item: any) => {
                return !responseUserData.appliedJobs.includes(item._id)
            })
            setCardData(listJobsDisponivel);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCardData();
    }, []);

    useEffect(() => {
        const filterCards = () => {
            const filteredData = cardData.filter((item: CardData) =>
                item.titulo.toLowerCase().includes(inputValue.toLowerCase())
            );
            setFilteredCardData(filteredData);
            setTotalPages(Math.ceil(filteredData.length / limit));
            setCurrentPage(1);
        };

        filterCards();
    }, [inputValue, cardData, limit]);

    const handleApply = async (cardId: string) => {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        const options = {
            method: 'POST',
            url: `http://localhost:3001/users/${userId}/apply/${cardId}`,
            headers: { authorization: `Bearer ${token}` },
        };
        try {
            const response = await axios(options);
            if (response.status === 409) {
                setShowErrorModal(true);
            }
            if (response.status === 201) {
                setShowModal(true);
            }

        } catch (error) {
            setShowErrorModal(true);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleLimitChange = (value: number) => {
        setLimit(value);
    };

    const getPaginatedData = () => {
        const startIndex = (currentPage - 1) * limit;
        const endIndex = startIndex + limit;
        return filteredCardData.slice(startIndex, endIndex);
    };

    const paginatedData = getPaginatedData();

    const closeModal = () => {
        setShowModal(false);
    };

    const closeErrorModal = () => {
        setShowErrorModal(false); 
    };

    return (
        <div>
            <div className="container-titulo-vaga">
                <h4>Escolha a vaga que combina com você</h4>
            </div>

            <Input
                placeholder="Buscar vagas"
                value={inputValue}
                onChange={setInputValue}
                visibleOnVagasPage={true}
            />
            <CardList data={paginatedData} showApplyButton={true} onApply={handleApply} />

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                limitOptions={[10, 20, 30, 40, 50]}
                limit={limit}
                onChangeLimit={handleLimitChange}
                onChangePage={handlePageChange}
            />
            <Modal isOpen={showModal} onRequestClose={closeModal}>
                <img src={closeImg} alt="Candidatura bem-sucedida" onClick={closeModal} />
                <h2>Candidatura bem-sucedida!</h2>
                <img className="greenSuccess" src={greenSuccess} />
            </Modal>

            <ModalCandidaturas isOpen={showErrorModal} onRequestClose={closeErrorModal}>
                <h2>Você já se candidatou a esta vaga!</h2>
            </ModalCandidaturas>
        </div>
    );
};

export default VagasPage;
