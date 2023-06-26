import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import EventCard from './EventCard';
import Map from '../Map/Map';

import { RootState, useAppDispatch } from '../../store';
import '../../bootstrap-5.3.0-dist/css/bootstrap.min.css';
import './events.css';
import {
  filterByCategory,
  filterBytag,
  sortBycount,
  sortByDate,
} from './EventSlice';

function EventsList(): JSX.Element {
  const { events } = useSelector((store: RootState) => store.events);
  const events2 = events.filter((el) => el.status !== false);
  const dispatch = useAppDispatch();
  const [tag, setTag] = useState('');
  const tagFilter = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(filterBytag(tag));
  };

  return (
    <>
      <div className="mainPageFilterDiv">
        <div className="marginTop100px">Фильтр:</div>
        {/* */}
        <div className="mainPageFilterSelect font27">
          По категории:
          <br />
          <select
            name="category"
            className="form-select font27 inputX"
            onChange={(e) => dispatch(filterByCategory(e.target.value))}
          >
            <option value="all">Все</option>
            <option value="Спорт">Спорт</option>
            <option value="Исскуство">Исскуство</option>
            <option value="Еда">Еда</option>
            <option value="Природа">Природа</option>
            <option value="Концерты">Концерты</option>
            <option value="Языки">Языки</option>
            <option value="Другое">Другое</option>
          </select>
        </div>

        <div>
          <div className="font27">По ключевому слову:</div>
          <form onSubmit={tagFilter}>
            <input
              onChange={(e) => setTag(e.target.value)}
              type="text"
              name="tag"
              value={tag}
              className="inputX"
            />
            <div>
              <button type="submit" className="btn btnBTN">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/*  */}
      <div className="mainPageMainDiv">
        <div className="mainPageMapSection">
          <Map />
        </div>

        <div className="mainPageSortSection">
          <div>Сортировка:</div>
          <div className="mainPageFilterSelect">
            По числу участников:
            <br />
            <select
              name="sortcount"
              className="form-select"
              onChange={(e) => dispatch(sortBycount(e.target.value))}
            >
              <option value="start">Все</option>
              <option value="sortESC">По возрастанию</option>
              <option value="sortDESC">По уменьшению</option>
            </select>
          </div>
          {/*  */}
          <div className="mainPageFilterSelect">
            По дате:
            <br />
            <select
              name="sortDate"
              className="form-select"
              onChange={(e) => dispatch(sortByDate(e.target.value))}
            >
              <option value="start">Все</option>
              <option value="sortDateAB">Скоро</option>
              <option value="sortDateBA">Позже</option>
            </select>
          </div>
        </div>

        <div className="mainPageEventCards">
          {events2.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default EventsList;
