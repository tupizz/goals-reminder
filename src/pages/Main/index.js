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
                    <Title>
                        Objetivos{' '}
                        <span role="img" aria-labelledby="notes">
                            📝
                        </span>
                    </Title>
                </Header>

                <Calendar
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView="month"
                    toolbar={false}
                    views={{ month: true }}
                    events={events}
                />
            </Container>
        );
    }
}
