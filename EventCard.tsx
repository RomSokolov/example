import React from 'react';
import { useSelector } from 'react-redux';
import { Event } from './type/type';
import './events.css';
import { RootState, useAppDispatch } from '../../store';
import { joinEvent } from './EventSlice';
import '../../bootstrap-5.3.0-dist/css/bootstrap.min.css';

function EventCard({ event }: { event: Event }): JSX.Element {
  const dispatch = useAppDispatch();
  const { user } = useSelector((store: RootState) => store.user);

  const eventRegArray = event.EventRegistrations.filter(
    (el) => el.status !== 'Ожидание' && el.status !== 'Отклонен'
  );
  const peopleRes = eventRegArray.length + 1;

  return (
    <div className="innerDivDiv">
      <div className="eventCard">
        <div className="eventcardDivX">
          <div className="eventsPhoto">
            {' '}
            {event.Photos?.length ? (
              <img src={event.Photos[0].url} alt="event" />
            ) : (
              <> </>
            )}{' '}
          </div>
        </div>
        <div className="eventCardDesLoc">
          <div className="eventsName">{event.name}</div>
          <div className="eventsDes">
            <p className="MainTextCardEvent">Описание:</p>
            {'     '}
            {event.description}
          </div>

          <div className="eventsLocation">
            {' '}
            <p className="MainTextCardEvent">Адрес:</p> {event.location}
          </div>
        </div>
        <div className="joinbtnDiv">
          <div>
            {peopleRes !== event.people ? (
              <div className="eventCardJoinBTNDiv">
                <button
                  type="button"
                  className="btn eventCardJoinBTN"
                  onClick={() => dispatch(joinEvent(event.id))}
                >
                  <div className="eventsPeople">
                    {peopleRes}/{event.people}
                  </div>
                  <img src="/icons/plus4.png" alt="" />
                </button>
              </div>
            ) : (
              <div>СОБЫТИЕ ЗАПОЛНЕНО</div>
            )}
          </div>
          {(user?.id === event.createrId ||
            eventRegArray?.filter((el) => el.userId === user?.id).length >
              0) && (
            <div className="prodrobneeDiv">
              <a href={`/events/${event.id}`} className="prodrobneeDiv">
                Подробнее
              </a>
            </div>
          )}
        </div>
        {/*  */}
        <div className="eventsCreater">
          <p>Создатель: {event.User.name}</p>
          <a href={`/profile/${event.createrId}`}>@{event.User.username}</a>
        </div>
        {/*  */}
      </div>
    </div>
  );
}
export default EventCard;
