import moment from 'moment';

class EventsHandler {
    constructor() {
        this.today = new Date();
    }

    createAnEvent() {
        // create event
        const event = {
            start: this.today,
            end: this.today,
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

    getAllEvents() {
        return this.getEventsFromStorage() ? this.getEventsFromStorage() : [];
    }

    alreadyOccurredEvent() {
        const events = this.getEventsFromStorage();

        if (!events) {
            return false;
        }

        const lastEvent = events[events.length - 1];
        return moment(this.today).isSame(moment(lastEvent.start), 'day');
    }

    getEventsFromStorage() {
        return JSON.parse(localStorage.getItem('events'));
    }
}

export default new EventsHandler();
