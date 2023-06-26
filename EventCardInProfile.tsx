import React from 'react';
import { Event, EventRegistration } from './type/type';
import '../../bootstrap-5.3.0-dist/css/bootstrap.min.css';
import './events.css';

function EventCardInProfile({
  event,
  eventreg,
}: {
  event: Event;
  eventreg: EventRegistration;
}): JSX.Element {
  return (
    <div className="eventCard">
      <div className="eventsPhoto">
        {' '}
        {event.Photos?.length ? (
          <img src={event.Photos[0].url} alt="event" />
        ) : (
          <> </>
        )}{' '}
      </div>

      <div className="eventsName">{event.name}</div>
      <div className="eventsDes">{event.description}</div>
      <div className="eventsCategory">{event.category}</div>
      <div className="eventsTag">{event.tag}</div>

      <div className="eventsLocation">{event.location}</div>
      <div className="eventsStatus">{event.status}</div>
      <div>
        <h2>СТАТУС:{eventreg.status}</h2>
      </div>
    </div>
  );
}
export default EventCardInProfile;
