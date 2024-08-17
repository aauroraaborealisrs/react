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
  const lastSubmittedForm = useSelector(
    (state: RootState) => state.form.lastSubmittedForm,
  );

  return (
    <div className="cont">
      <h2>Data from Uncontrolled Form</h2>
      <div className="form-cont">
        {uncontrolledData.length > 0 ? (
          uncontrolledData.map((data, index) => (
            <div
              key={index}
              className={
                lastSubmittedForm === "uncontrolled" &&
                index === uncontrolledData.length - 1
                  ? "last-form"
                  : "form"
              }
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
              <p>
                <strong>Terms accepted:</strong> {data.terms ? "Yes" : "No"}
              </p>
              <img
                src={data.picture}
                alt="Uploaded"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          ))
        ) : (
          <p className="no-data">
            No data submitted yet from uncontrolled form.
          </p>
        )}
      </div>
      <h2>Data from Controlled Form</h2>
      <div className="form-cont">
        {controlledData.length > 0 ? (
          controlledData.map((data, index) => (
            <div
              key={index}
              className={
                lastSubmittedForm === "controlled" &&
                index === controlledData.length - 1
                  ? "last-form"
                  : "form"
              }
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
              <p>
                <strong>Terms accepted:</strong> {data.terms ? "Yes" : "No"}
              </p>
              <img
                src={data.picture}
                alt="Uploaded"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          ))
        ) : (
          <p className="no-data">No data submitted yet from controlled form.</p>
        )}
      </div>
    </div>
  );
};

export default Main;
