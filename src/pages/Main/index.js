/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import CustomConfirmAlert from '../../components/CustomConfirmAlert';

import { Container, Title, Header } from './styles';
import eventsHandler from '../../services/events';

const localizer = momentLocalizer(moment);

export default class Main extends Component {
    state = {
        events: [],
    };

    componentDidMount() {
        this.renderEventsOnScreen();

        const cantShowPopup = eventsHandler.alreadyOccurredEvent();

        if (cantShowPopup) {
            return;
        }

        const today = moment(new Date()).format('DD/MM/YY');

        confirmAlert({
            closeOnEscape: false,
            closeOnClickOutside: false,
            customUI: ({ onClose }) => {
                return (
                    <CustomConfirmAlert
                        onClose={onClose}
                        choosedDate={today}
                        fnConfirm={() => {
                            eventsHandler.createAnEvent();
                            this.renderEventsOnScreen();
                        }}
                    />
                );
            },
        });

        /** confirmAlert({
            title: 'Objetivos realizados?',
            closeOnEscape: false,
            closeOnClickOutside: false,
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
        }); */
    }

    handleSelectDate = ({ start }) => {
        const choosedDate = moment(start).format('DD/MM/YY');

        confirmAlert({
            closeOnEscape: false,
            closeOnClickOutside: false,
            customUI: ({ onClose }) => {
                return (
                    <CustomConfirmAlert
                        onClose={onClose}
                        choosedDate={choosedDate}
                        fnConfirm={() => {
                            eventsHandler.createAnEvent(start);
                            this.renderEventsOnScreen();
                        }}
                    />
                );
            },
        });
    };

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
