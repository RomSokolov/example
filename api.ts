import { User, UserId, UserRating } from '../Users/type/type';
import {
  ChangeStatus,
  Event,
  EventId,
  EventRegistration,
  Photos,
} from './type/type';

// eslint-disable-next-line import/prefer-default-export
export const getEvents = async (): Promise<Event[]> => {
  const res = await fetch('/api/events');
  const data = await res.json();
  return data;
};

export const getEventsSortByCount = async (obj: number): Promise<Event[]> => {
  const res = await fetch('/api/events/sortcount', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(obj),
  });
  const data = await res.json();
  return data;
};

export const addEvents = async (obj: FormData): Promise<Event> => {
  const res = await fetch('/api/events', {
    method: 'POST',

    body: obj,
  });

  const data = await res.json();
  return data;
};

export const findCoordinates = async (): Promise<any> => {
  const res = await fetch('/api/events/map');
  const data = await res.json();
  return data;
};

export const joinEvent = async (obj: EventId): Promise<void> => {
  await fetch(`/api/events/join/${obj}`);
};

export const getEventInfo = async (
  obj: EventId
): Promise<EventRegistration[]> => {
  const res = await fetch(`/api/events/${obj}`);
  const data = await res.json();
  return data;
};

export const changeStatApi = async (
  obj: ChangeStatus
): Promise<ChangeStatus> => {
  const res = await fetch('/api/events/status', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      obj,
    }),
  });
  const data = await res.json();
  return data;
};
export const changeStatRejectApi = async (
  obj: ChangeStatus
): Promise<ChangeStatus> => {
  const res = await fetch('/api/events/statusRej', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      obj,
    }),
  });
  const data = await res.json();
  return data;
};

export const getEventsProfile = async (
  obj: UserId
): Promise<EventRegistration[]> => {
  const res = await fetch('/api/events/profile', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      obj,
    }),
  });
  const data = await res.json();
  return data;
};
export const getProfileParams = async (obj: UserId): Promise<UserRating[]> => {
  const res = await fetch(`/api/data/rating/${obj}`);
  const data = await res.json();
  return data;
};

export const changeEventStatus = async (obj: EventId): Promise<Event> => {
  const res = await fetch(`/api/events/delete/${obj}`);
  const data = await res.json();
  return data;
};
