import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState, useAppDispatch } from '../../store';

import '../../bootstrap-5.3.0-dist/css/bootstrap.min.css';
import '../Users/user.css';

import { profileParams } from './EventSlice';

function UserProfileParams(): JSX.Element {
  const { id } = useParams();

  const {
    userProfile: { 0: userProfile },
  } = useSelector((store: RootState) => store.userProfile);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(profileParams(Number(id)));
  }, []);

  return (
    <div className="ProfileMainDiv">
      <div className="profileDiv card">
        <img
          src={userProfile?.avatar}
          alt=" "
          className="card-img-top profileImg"
        />
        <div className="card-body">
          <div className="profileUsername card-text">
            @{userProfile?.username}
          </div>
          <div className="profileName card-title">{userProfile?.name}</div>
          <div className="profileAbout card-text">
            About:{userProfile?.about}
          </div>
          <div className="profileRating">
            {Number(userProfile?.avgRating) >= 0.5 &&
              Number(userProfile?.avgRating) < 1.5 && (
                <>
                  <img className="star" src="/icons/star.png" alt="star" />

                  <img className="star" src="/icons/starEmpty.png" alt="star" />
                  <img className="star" src="/icons/starEmpty.png" alt="star" />
                  <img className="star" src="/icons/starEmpty.png" alt="star" />
                  <img className="star" src="/icons/starEmpty.png" alt="star" />
                </>
              )}

            {Number(userProfile?.avgRating) >= 1.5 &&
              Number(userProfile?.avgRating) < 2.5 && (
                <>
                  <img className="star" src="/icons/star.png" alt="star" />
                  <img className="star" src="/icons/star.png" alt="star" />
                  <img className="star" src="/icons/starEmpty.png" alt="star" />
                  <img className="star" src="/icons/starEmpty.png" alt="star" />
                  <img className="star" src="/icons/starEmpty.png" alt="star" />
                </>
              )}

            {Number(userProfile?.avgRating) >= 2.5 &&
              Number(userProfile?.avgRating) < 3.5 && (
                <>
                  <img className="star" src="/icons/star.png" alt="star" />
                  <img className="star" src="/icons/star.png" alt="star" />
                  <img className="star" src="/icons/star.png" alt="star" />
                  <img className="star" src="/icons/starEmpty.png" alt="star" />
                  <img className="star" src="/icons/starEmpty.png" alt="star" />
                </>
              )}

            {Number(userProfile?.avgRating) >= 3.5 &&
              Number(userProfile?.avgRating) < 4.5 && (
                <>
                  <img className="star" src="/icons/star.png" alt="star" />
                  <img className="star" src="/icons/star.png" alt="star" />
                  <img className="star" src="/icons/star.png" alt="star" />
                  <img className="star" src="/icons/star.png" alt="star" />
                  <img className="star" src="/icons/starEmpty.png" alt="star" />
                </>
              )}

            {Number(userProfile?.avgRating) >= 4.5 &&
              Number(userProfile?.avgRating) <= 5 && (
                <>
                  <img className="star" src="/icons/star.png" alt="star" />
                  <img className="star" src="/icons/star.png" alt="star" />
                  <img className="star" src="/icons/star.png" alt="star" />
                  <img className="star" src="/icons/star.png" alt="star" />
                  <img className="star" src="/icons/star.png" alt="star" />
                </>
              )}

            <p>{userProfile?.avgRating}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileParams;
