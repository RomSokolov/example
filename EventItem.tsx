import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store';
import { changeStatusReg, changeStatusRegReject } from './EventSlice';
import { EventRegistration } from './type/type';

function EventItem({ event }: { event: EventRegistration }): JSX.Element {
  const { events } = useSelector((store: RootState) => store.events);
  const { user } = useSelector((store: RootState) => store.user);
  const thisEvent = events.filter((el) => el.id === event.eventId);


  const dispatch = useAppDispatch();
  const statuses = ['Подтвержден', 'Отклонен', 'подтвержден'];

  return (
    <div>
      <div>
        <a href={`/profile/${event.userId}`}> {event.User.name}</a>{' '}
        {event.status}
      </div>
      {thisEvent[0].createrId === user?.id && (
        <>
          {!statuses.includes(event.status) && (
            <button
              className="decide"
              type="button"
              onClick={() =>
                dispatch(
                  changeStatusReg({
                    userId: event.userId,
                    eventId: event.eventId,
                  })
                )
              }
            >
              Принять
            </button>
          )}
          {!statuses.includes(event.status) && (
            <button
              className="decide"
              type="button"
              onClick={() =>
                dispatch(
                  changeStatusRegReject({
                    userId: event.userId,
                    eventId: event.eventId,
                  })
                )
              }
            >
              Отклонить
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default EventItem;
