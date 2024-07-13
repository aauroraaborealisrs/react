import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Character } from "../interfaces";

export default function Detailed() {
  const { contactId } = useParams<{ contactId: string }>();
  const [person, setPerson] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const response = await fetch(
          `https://swapi.dev/api/people/?search=${contactId}`,
        );
        if (!response.ok) {
          throw new Error("Not Found");
        }
        const data = await response.json();
        if (data.results.length > 0) {
          setPerson(data.results[0]);
        } else {
          setError("Person not found");
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [contactId]);

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
    return <div>Никого не нашлось</div>;
  }

  return (
    <div id="contact">
      <div>
        <h1>{person.name}</h1>
        <p>Height: {person.height} cm</p>
        <p>Mass: {person.mass} kg</p>
        <p>Hair Color: {person.hair_color}</p>
        <p>Skin Color: {person.skin_color}</p>
        <p>Eye Color: {person.eye_color}</p>
        <p>Birth Year: {person.birth_year}</p>
        <p>Gender: {person.gender}</p>
      </div>
      <div></div>
    </div>
  );
}