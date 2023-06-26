/* eslint-disable prefer-arrow-callback */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ChangeStatus, EventId, State } from './type/type';
import * as api from './api';
import { UserId } from '../Users/type/type';

// начальный state

const initialState: State = {
  events: [],
  error: '',
  originEvents: [],
  photo: [],
  eventReg: [],
  regevents: [],
  userProfile: [],
  maps: [],
};

export const eventsInit = createAsyncThunk('events/init', () =>
  api.getEvents()
);
export const eventsAdd = createAsyncThunk('events/Add', (obj: FormData) =>
  api.addEvents(obj)
);

export const findCoordinates = createAsyncThunk('map/init', () =>
  api.findCoordinates()
);

export const joinEvent = createAsyncThunk('events/join', (obj: EventId) => {
  api.joinEvent(obj);
});
export const eventRegUser = createAsyncThunk(
  'events/regUsers',
  (obj: EventId) => api.getEventInfo(obj)
);
export const changeStatusReg = createAsyncThunk(
  'events/changeStatus',
  (obj: ChangeStatus) => api.changeStatApi(obj)
);
export const changeStatusRegReject = createAsyncThunk(
  'events/changeStatusReject',
  (obj: ChangeStatus) => api.changeStatRejectApi(obj)
);
export const profileEvents = createAsyncThunk('events/profile', (obj: UserId) =>
  api.getEventsProfile(obj)
);
export const profileParams = createAsyncThunk(
  'events/profileParams',
  (obj: UserId) => api.getProfileParams(obj)
);
export const deleteEvent = createAsyncThunk('event/delete', (obj: EventId) =>
  api.changeEventStatus(obj)
);
const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    sortBycount: (state, action) => {
      if (action.payload === 'sortDESC') {
        state.events = state.events.sort((a, b) => b.people - a.people);
      }
      if (action.payload === 'sortESC') {
        state.events = state.events.sort((a, b) => a.people - b.people);
      }
      if (action.payload === 'start') {
        state.events = state.originEvents;
      }
    },
    sortByDate: (state, action) => {
      if (action.payload === 'sortDateAB') {
        state.events = state.events.sort(function (a, b) {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();

          return dateA - dateB;
        });
      }
      if (action.payload === 'sortDateBA') {
        state.events = state.events.sort(function (a, b) {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });
      }
      if (action.payload === 'start') {
        state.events = state.originEvents;
      }
    },
    filterByCategory: (state, action) => {
      const element = action.payload;
      if (element !== 'all') {
        state.events = state.originEvents.filter(
          (el) => el.category === element
        );
      } else {
        state.events = state.originEvents;
      }
    },
    filterBytag: (state, action) => {
      const element = action.payload;
      if (element !== '') {
        state.events = state.originEvents.filter((el) =>
          el.tag.includes(element)
        );
      } else {
        state.events = state.originEvents;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(findCoordinates.fulfilled, (state, action) => {
        state.maps = action.payload;
        state.originEvents = action.payload;
        state.error = '';
      })
      .addCase(findCoordinates.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(eventsInit.fulfilled, (state, action) => {
        state.events = action.payload;
        state.originEvents = action.payload;
        state.error = '';
      })
      .addCase(eventsInit.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(eventsAdd.fulfilled, (state, action) => {
        state.events = [...state.events, action.payload];
      })
      .addCase(eventsAdd.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(eventRegUser.fulfilled, (state, action) => {
        state.eventReg = action.payload;
      })
      .addCase(eventRegUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(changeStatusReg.fulfilled, (state, action) => {
        state.eventReg = state.eventReg.map((el) => {
          if (
            el.eventId === action.payload.eventId &&
            el.userId === action.payload.userId
          ) {
            el.status = 'Подтвержден';
          }
          return el;
        });
      })
      .addCase(changeStatusReg.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(changeStatusRegReject.fulfilled, (state, action) => {
        state.eventReg = state.eventReg.map((el) => {
          if (
            el.eventId === action.payload.eventId &&
            el.userId === action.payload.userId
          ) {
            el.status = 'Отклонен';
          }
          return el;
        });
      })
      .addCase(changeStatusRegReject.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(profileEvents.fulfilled, (state, action) => {
        state.regevents = action.payload;
        state.error = '';
      })
      .addCase(profileEvents.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(profileParams.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.error = '';
      })
      .addCase(profileParams.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.map((el) => {
          if (el.id === action.payload.id) {
            el.status = false;
          }
          return el;
        });
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { sortBycount, filterByCategory, filterBytag, sortByDate } =
  eventsSlice.actions;

export default eventsSlice.reducer;
