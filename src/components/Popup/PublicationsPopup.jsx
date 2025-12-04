import { useState, useEffect } from "react";
import styled from "styled-components";
import CardPablish from "@/components/CardPablish";
import { publications } from "../../data/publications";

const itemsPerPageDefault = 9;
const itemsPerPageSmall = 6;

const PublicationsPopup = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageDefault);
    
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1600) {
                setItemsPerPage(itemsPerPageSmall);
            } else {
                setItemsPerPage(itemsPerPageDefault);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const totalPages = Math.ceil(publications.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentItems = publications.slice(indexOfFirst, indexOfLast);

    return (
        <>
            <PublicationsHead>
                <PublicationsFilter>Все <span>{publications.length}</span></PublicationsFilter>
                <PublicationsFilter>Архив <span>0</span></PublicationsFilter>
                <PublicationsFilter>По дате <span></span></PublicationsFilter>
            </PublicationsHead>
            <PublicationsList>
                {currentItems.map((item, index) => (
                    <CardPablish key={index} item={item} bg={true} />
                ))}
            </PublicationsList>

            <PaginationWrapper>
                {[...Array(totalPages)].map((_, i) => (
                    <PageBtn
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        active={currentPage === i + 1}
                    >
                        {i + 1}
                    </PageBtn>
                ))}
            </PaginationWrapper>
        </>
    );
};

const PublicationsHead = styled.div`
    display: flex;
    gap: 64px;
`;

const PublicationsFilter = styled.p`
    display: flex;
    align-items: center;
    gap: 16px;
    padding-bottom: 32px;
    border-bottom: 2px solid #2e3954;
    font-size: 24px;
    font-weight: 700;
    color: #6a7080;

    span {
        color: #6a7080;
    }
`;

const PublicationsList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, min-content));
    grid-template-rows: max-content;
    margin-top: 50px;
    gap: 16px 24px;
`;

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 37px;
    height: 100%;
    padding-top: 40px;
`;

const PageBtn = styled.button`
    font-size: 12px;
    color: ${(props) => (props.active ? "#D6DCEC" : "#6A7080")};

    &:hover {
        color: #D6DCEC;
    }
`;

export default PublicationsPopup;
