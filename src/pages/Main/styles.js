import styled from 'styled-components';

export const Container = styled.div`
    max-width: 700px;
    height: 30px;
    margin: 50px auto;

    div.rbc-calendar {
        height: 70vh;
        div.rbc-month-view {
            background: #eee;
        }
    }
`;

export const Header = styled.div`
    display: flex;
    padding-top: 10px;
    padding-bottom: 40px;
    flex-direction: column;
    align-items: center;
`;

export const Title = styled.h1`
    font-size: 25px;
    color: #eee;
`;
