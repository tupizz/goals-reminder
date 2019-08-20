import moment from 'moment';
import _ from 'underscore';

class EventsHandler {
    constructor() {
        this.today = new Date();
    }

    createAnEvent(day) {
        // create event
        const event = {
            start: day || this.today,
            end: day || this.today,
            title: 'DONE ⭐',
        };

        // store event
        const events = this.getEventsFromStorage();
        if (events) {
            const newEvents = [...events, event];
            localStorage.setItem('events', JSON.stringify(newEvents));
        } else {
            localStorage.setItem('events', JSON.stringify([event]));
        }
    }

    // @TODO refatorar essa logica, utilizando o estado... Estudo de como fazer
    getAllEvents() {
        return this.getEventsFromStorage() ? this.getEventsFromStorage() : [];
    }

    alreadyOccurredEvent() {
        const events = this.getEventsFromStorage();

        if (!events) {
            return false;
        }

        const isOccurredEventToday = _.find(events, event => {
            moment(this.today).isSame(moment(event.start), 'day');
        });

        return isOccurredEventToday && isOccurredEventToday !== null;
    }

    getEventsFromStorage() {
        return JSON.parse(localStorage.getItem('events'));
    }
}

export default new EventsHandler();
