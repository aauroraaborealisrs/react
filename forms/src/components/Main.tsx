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
      <h1>Main Page</h1>
      <div>
        <h2>Data from Uncontrolled Form</h2>
        {uncontrolledData ? (
          <div>
            <p>
              <strong>Name:</strong> {uncontrolledData.name}
            </p>
            <p>
              <strong>Age:</strong> {uncontrolledData.age}
            </p>
            <p>
              <strong>Email:</strong> {uncontrolledData.email}
            </p>
            <p>
              <strong>Gender:</strong> {uncontrolledData.gender}
            </p>
            <p>
              <strong>Country:</strong> {uncontrolledData.country}
            </p>
            <img
              src={uncontrolledData.picture}
              alt="Uploaded"
              style={{ width: "100px", height: "100px" }}
            />
          </div>
        ) : (
          <p>No data submitted yet.</p>
        )}
      </div>

      <div>
        <h2>Data from Controlled Form</h2>
        {controlledData ? (
          <div>
            <p>
              <strong>Name:</strong> {controlledData.name}
            </p>
            <p>
              <strong>Age:</strong> {controlledData.age}
            </p>
            <p>
              <strong>Email:</strong> {controlledData.email}
            </p>
            <p>
              <strong>Gender:</strong> {controlledData.gender}
            </p>
            <p>
              <strong>Country:</strong> {controlledData.country}
            </p>
            <img
              src={controlledData.picture}
              alt="Uploaded"
              style={{ width: "100px", height: "100px" }}
            />
          </div>
        ) : (
          <p>No data submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default Main;
