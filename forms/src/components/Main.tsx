import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Main: React.FC = () => {
  const uncontrolledData = useSelector(
    (state: RootState) => state.form.uncontrolled,
  );
  const controlledData = useSelector(
    (state: RootState) => state.form.controlled,
  );

  return (
    <div>
      <div>
        <h2>Data from Uncontrolled Form</h2>
        {uncontrolledData.length > 0 ? (
          uncontrolledData.map((data, index) => (
            <div key={index}>
              <p>
                <strong>Name:</strong> {data.name}
              </p>
              <p>
                <strong>Age:</strong> {data.age}
              </p>
              <p>
                <strong>Email:</strong> {data.email}
              </p>
              <p>
                <strong>Gender:</strong> {data.gender}
              </p>
              <p>
                <strong>Country:</strong> {data.country}
              </p>
              <p>
                <strong>Password (idk for what but):</strong> {data.password}
              </p>
              <img
                src={data.picture}
                alt="Uploaded"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          ))
        ) : (
          <p>No data submitted yet from uncontrolled form.</p>
        )}
      </div>

      <div>
        <h2>Data from Controlled Form</h2>
        {controlledData.length > 0 ? (
          controlledData.map((data, index) => (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                padding: "10px",
                border: "1px solid #ccc",
              }}
            >
              <p>
                <strong>Name:</strong> {data.name}
              </p>
              <p>
                <strong>Age:</strong> {data.age}
              </p>
              <p>
                <strong>Email:</strong> {data.email}
              </p>
              <p>
                <strong>Gender:</strong> {data.gender}
              </p>
              <p>
                <strong>Country:</strong> {data.country}
              </p>
              <p>
                <strong>Password (idk for what but):</strong> {data.password}
              </p>
              <img
                src={data.picture}
                alt="Uploaded"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          ))
        ) : (
          <p>No data submitted yet from controlled form.</p>
        )}
      </div>
    </div>
  );
};

export default Main;
