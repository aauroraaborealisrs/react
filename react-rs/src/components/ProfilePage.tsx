import React from "react";
import { useGetPersonQuery } from "../services/api";

interface ProfilePageProps {
  name: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ name }) => {
  const { data, isLoading, isError, error } = useGetPersonQuery(name);
  const person = data?.results[0];

  if (isLoading) {
    return (
      <div className="loader-col">
        <div className="loader-text">Loading...</div>
        <div className="loader"></div>
      </div>
    );
  }

  if (isError) {
    return <div>Error: {error.toString()}</div>;
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
