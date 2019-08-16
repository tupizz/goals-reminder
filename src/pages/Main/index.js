/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { Container, Title, Header } from './styles';
import eventsHandler from '../../services/events';

const localizer = momentLocalizer(moment);

export default class Main extends Component {
    state = {
        events: [],
    };

    componentDidMount() {
        const cantShowPopup = eventsHandler.alreadyOccurredEvent();

        if (cantShowPopup) {
            this.renderEventsOnScreen();
            return;
        }

        confirmAlert({
            title: 'Objetivos realizados?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => {
                        eventsHandler.createAnEvent();
                        this.renderEventsOnScreen();
                    },
                },
                {
                    label: 'Não',
                    onClick: () => {
                        this.renderEventsOnScreen();
                    },
                },
            ],
        });
    }

    handleSelectDate({ start }) {
        const choosedDate = moment(start).format('DD/MM/YY');

        confirmAlert({
            title: `Deseja adicionar o dia ${choosedDate} como um dia com os objetivos finalizados?`,
            buttons: [
                {
                    label: 'Sim',
                    onClick: () => {
                        eventsHandler.createAnEvent(start);
                    },
                },
                {
                    label: 'Não',
                    onClick: () => {},
                },
            ],
        });
    }

    // @TODO refatorar essa logica, utilizando o estado... Estudo de como fazer
    renderEventsOnScreen() {
        this.setState({
            events: eventsHandler.getAllEvents(),
        });
    }

    render() {
        const { events } = this.state;
        return (
            <Container>
                <Header>
                    <Title>Objetivos 📝</Title>
                </Header>

                <Calendar
                    selectable
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView="month"
                    onSelectSlot={this.handleSelectDate}
                    toolbar={false}
                    views={{ month: true }}
                    events={events}
                />
            </Container>
        );
    }
}
