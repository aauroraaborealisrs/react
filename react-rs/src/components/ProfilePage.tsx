import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchProfile } from "../store/profileSlice";

interface ProfilePageProps {
  name: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ name }) => {
  const dispatch: AppDispatch = useDispatch();
  const { person, loading, error } = useSelector(
    (state: RootState) => state.profile,
  );

  useEffect(() => {
    dispatch(fetchProfile(name));
  }, [name, dispatch]);

  if (loading) {
    return (
      <div className="loader-col">
        <div className="loader-text">Loading...</div>
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!person) {
    return <div>No data available</div>;
  }

  return (
    <div className="profile-page">
      <h1>{person.name}</h1>
      <p>Height: {person.height} cm</p>
      <p>Mass: {person.mass} kg</p>
      <p>Hair Color: {person.hair_color}</p>
      <p>Skin Color: {person.skin_color}</p>
      <p>Eye Color: {person.eye_color}</p>
      <p>Birth Year: {person.birth_year}</p>
      <p>Gender: {person.gender}</p>
    </div>
  );
};

export default ProfilePage;
