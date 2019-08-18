/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Container, Title, ButtonGroup, CancelButton, ConfirmButton } from './styles';

export default class CustomConfirmAlert extends Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired,
        choosedDate: PropTypes.string.isRequired,
        fnConfirm: PropTypes.func.isRequired,
    };

    handleOnClick = () => {
        const { onClose, fnConfirm } = this.props;
        fnConfirm();
        onClose();
    };

    render() {
        const { onClose, choosedDate } = this.props;
        return (
            <Container>
                <Title>
                    Você completou os objetivos do dia: <u>{choosedDate}</u> ?
                </Title>
                <ButtonGroup>
                    <ConfirmButton type="button" onClick={this.handleOnClick}>
                        Sim, completei meus objetivos.
                    </ConfirmButton>
                    <CancelButton type="button" onClick={onClose}>
                        Não completei meus objetivos
                    </CancelButton>
                </ButtonGroup>
            </Container>
        );
    }
}
