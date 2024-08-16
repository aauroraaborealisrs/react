import React, { useRef, useState, useEffect } from "react";
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

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    validateForm();
  }, []);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (nameRef.current && nameRef.current.value && !/^[A-Z]/.test(nameRef.current.value)) {
      errors.name = "First letter must be uppercase";
    }

    if (ageRef.current && ageRef.current.value && (isNaN(Number(ageRef.current.value)) || Number(ageRef.current!.value) <= 0)) {
      errors.age = "Age must be a positive number";
    }

    if (emailRef.current && emailRef.current.value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(emailRef.current.value)) {
      errors.email = "Invalid email format";
    }

    if (passwordRef.current && confirmPasswordRef.current) {
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        errors.confirmPassword = "Passwords do not match";
      }
    }

    setFormErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0 && nameRef.current?.value !== "" && ageRef.current?.value !== "" && emailRef.current?.value !== "");
  };

  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[@$!%*?&#]/.test(password)) score += 1;
    setPasswordStrength(score);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    validateForm();

    if (!isFormValid) return;

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

  const getPasswordStrengthInfo = (strength: number) => {
    switch (strength) {
      case 1:
        return { color: "red", text: "Very Weak" };
      case 2:
        return { color: "orange", text: "Weak" };
      case 3:
        return { color: "yellow", text: "Moderate" };
      case 4:
        return { color: "lightgreen", text: "Strong" };
      case 5:
        return { color: "green", text: "Very Strong" };
      default:
        return { color: "gray", text: "Too Short" };
    }
  };

  const { color, text } = getPasswordStrengthInfo(passwordStrength);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        ref={nameRef}
        onChange={validateForm}
        required
      />
      {formErrors.name && <p>{formErrors.name}</p>}

      <label htmlFor="age">Age:</label>
      <input
        id="age"
        type="number"
        ref={ageRef}
        onChange={validateForm}
        required
      />
      {formErrors.age && <p>{formErrors.age}</p>}

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="email"
        ref={emailRef}
        onChange={validateForm}
        required
      />
      {formErrors.email && <p>{formErrors.email}</p>}

      <label htmlFor="password">Password:</label>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            id="password"
            type={passwordVisible ? "text" : "password"}
            ref={passwordRef}
            onChange={(e) => {
              validateForm();
              calculatePasswordStrength(e.target.value);
            }}
            required
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {passwordVisible ? "Hide" : "Show"}
          </button>
        </div>
        <div
          style={{
            height: "5px",
            backgroundColor: color,
            width: "100%",
            marginTop: "5px",
          }}
        />
        <p style={{ color }}>{text}</p>
      </div>

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          id="confirmPassword"
          type={passwordVisible ? "text" : "password"}
          ref={confirmPasswordRef}
          onChange={validateForm}
          required
        />
        <button type="button" onClick={togglePasswordVisibility}>
          {passwordVisible ? "Hide" : "Show"}
        </button>
      </div>
      {formErrors.confirmPassword && <p>{formErrors.confirmPassword}</p>}

      <label htmlFor="gender">Gender:</label>
      <select id="gender" ref={genderRef} onChange={validateForm} required>
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
        onChange={validateForm}
        required
      />

      <label htmlFor="country">Country:</label>
      <input
        id="country"
        type="text"
        ref={countryRef}
        onChange={validateForm}
        required
      />

      <label htmlFor="terms">
        <input
          id="terms"
          type="checkbox"
          ref={termsRef}
          onChange={validateForm}
          required
        />
        Accept Terms and Conditions
      </label>

      <button type="submit" disabled={!isFormValid}>
        Submit
      </button>
    </form>
  );
};

export default UncontrolledForm;
