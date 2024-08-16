import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { saveUncontrolledForm } from "../store/formSlice";
import { useNavigate } from "react-router-dom";

const UncontrolledForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!pictureRef.current?.files?.[0]) {
      alert("Please upload a picture.");
      return;
    }

    const file = pictureRef.current.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result as string;

      const formData = {
        name: nameRef.current!.value,
        age: parseInt(ageRef.current!.value),
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
        confirmPassword: confirmPasswordRef.current!.value,
        gender: genderRef.current!.value,
        picture: base64String,
        country: countryRef.current!.value,
        terms: termsRef.current!.checked,
      };

      dispatch(saveUncontrolledForm(formData));
      navigate("/");
    };

    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input id="name" type="text" ref={nameRef} required />

      <label htmlFor="age">Age:</label>
      <input id="age" type="number" ref={ageRef} required />

      <label htmlFor="email">Email:</label>
      <input id="email" type="email" ref={emailRef} required />

      <label htmlFor="password">Password:</label>
      <input id="password" type="password" ref={passwordRef} required />

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        id="confirmPassword"
        type="password"
        ref={confirmPasswordRef}
        required
      />

      <label htmlFor="gender">Gender:</label>
      <select id="gender" ref={genderRef} required>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <label htmlFor="picture">Picture:</label>
      <input
        id="picture"
        type="file"
        ref={pictureRef}
        accept=".png, .jpg, .jpeg"
        required
      />

      <label htmlFor="country">Country:</label>
      <input id="country" type="text" ref={countryRef} required />

      <label htmlFor="terms">
        <input id="terms" type="checkbox" ref={termsRef} required />
        Accept Terms and Conditions
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
