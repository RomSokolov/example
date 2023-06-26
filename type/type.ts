import { User, UserId, UserRating } from '../../Users/type/type';

export type Event = {
  id: number;
  name: string;
  description: string;
  category: string;
  tag: string;
  people: number;
  Photos: Photos[];
  location: string;
  status?: boolean;
  createrId?: number;
  date: string;
  data: Event;
  coordinate: string;
  EventRegistration: EventRegistration[];
  EventRegistrations: EventRegistration[];
  User: User;
};

export type EventId = Event['id'];
export type EventRegistration = {
  id: number;
  userId: UserId;
  eventId: EventId;
  status: string;
  User: User;
  Event: Event;
  error: string | undefined;
};
export type State = {
  events: Event[];
  error: string | undefined;
  originEvents: Event[];
  eventReg: EventRegistration[];
  photo: Photos[];
  regevents: EventRegistration[];
  userProfile: UserRating[];
};

export type Photos = {
  url: string;
};
export type ChangeStatus = {
  userId: UserId;
  eventId: EventId;
};
