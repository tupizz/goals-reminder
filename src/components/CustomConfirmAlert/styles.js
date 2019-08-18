import styled from 'styled-components';

export const Container = styled.div`
    max-width: 350px;
    display: flex;
    flex-direction: column;
`;

export const Title = styled.h1`
    font-size: 20px;
    text-align: center;
    color: rgba(32, 45, 58, 1);
`;

export const ButtonGroup = styled.div`
    display: flex;
    margin-top: 20px;
    flex-direction: column;
`;

export const CancelButton = styled.button`
    background: rgba(1, 1, 1, 0.05);
    border: 1px solid #5a5a5a;
    color: #5a5a5a;
    border-radius: 5px;
    padding: 10px 5px;
    margin: 10px;
`;

export const ConfirmButton = styled.button`
    background: rgba(1, 1, 1, 0.05);
    border: 1px solid rgba(32, 45, 58, 1);
    background: rgba(32, 45, 58, 1);
    color: #fff;
    padding: 10px 5px;
    border-radius: 5px;
    margin: 10px;
    font-weight: bold;

    &:hover {
        background: rgba(32, 45, 58, 0.9);
    }
`;
