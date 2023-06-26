import React from 'react';
import '../../bootstrap-5.3.0-dist/css/bootstrap.min.css';
import './events.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { eventRegUser } from './EventSlice';
import EventItem from './EventItem';

function EventInfo(): JSX.Element {
  const dispatch = useAppDispatch();
  const { idEvent } = useParams();
  const { events } = useSelector((store: RootState) => store.events);
  const { eventReg } = useSelector((store: RootState) => store.eventReg);

  const event = events.filter((el) => el.id === Number(idEvent));
  return (
    <>
      {event && event.length > 0 && (
        <div className="eventCard">
          <div className="eventsName">{event[0].name}</div>
          <div className="eventsDes">{event[0].description}</div>
          <div className="eventsTag">{event[0].location}</div>
          <button
            type="button"
            onClick={() => dispatch(eventRegUser(Number(idEvent)))}
          >
            Показать участников
          </button>
          {eventReg &&
            eventReg.map((el) => <EventItem event={el} key={el.id} />)}
        </div>
      )}
      <a href="#">Подробнее</a>
    </>
  );
}
export default EventInfo;
