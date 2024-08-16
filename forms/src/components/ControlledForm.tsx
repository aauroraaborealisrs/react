import React, { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { saveControlledForm } from "../store/formSlice";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  picture: FileList;
  country: string;
  terms: boolean;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .required()
    .matches(/^[A-Z]/, "First letter must be uppercase"),
  age: yup.number().required().positive().integer(),
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(8)
    .matches(/[A-Z]/, "Must have one uppercase letter")
    .matches(/[a-z]/, "Must have one lowercase letter")
    .matches(/[0-9]/, "Must have one number")
    .matches(/[@$!%*?&#]/, "Must have one special character"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
  gender: yup.string().required(),
  picture: yup
    .mixed()
    .required()
    .test("fileSize", "File too large", (value) => {
      if (!value || !(value instanceof FileList)) {
        return false;
      }
      return value[0].size <= 1024 * 1024;
    })
    .test("fileType", "Unsupported File Format", (value) => {
      if (!value || !(value instanceof FileList)) {
        return false;
      }
      return ["image/jpeg", "image/png"].includes(value[0].type);
    }),
  country: yup.string().required(),
  terms: yup.boolean().oneOf([true], "Accept Terms is required").required(),
});

const calculatePasswordStrength = (password: string) => {
  let score = 0;

  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[@$!%*?&#]/.test(password)) score += 1;

  return score;
};

const ControlledForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as unknown as Resolver<FormData>,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const passwordValue = watch("password", "");

  const passwordStrength = calculatePasswordStrength(passwordValue);

  const onSubmit = (data: FormData) => {
    const file = data.picture[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      dispatch(saveControlledForm({ ...data, picture: base64String }));
      navigate("/");
    };

    if (file) {
      reader.readAsDataURL(file);
    }
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name:</label>
      <input id="name" type="text" {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}

      <label htmlFor="age">Age:</label>
      <input id="age" type="number" {...register("age")} />
      {errors.age && <p>{errors.age.message}</p>}

      <label htmlFor="email">Email:</label>
      <input id="email" type="email" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <label htmlFor="password">Password:</label>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            id="password"
            type={passwordVisible ? "text" : "password"}
            {...register("password")}
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {passwordVisible ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && <p>{errors.password.message}</p>}
        <div
          style={{
            height: "5px",
            backgroundColor: color,
            width: "10%",
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
          {...register("confirmPassword")}
        />
        <button type="button" onClick={togglePasswordVisibility}>
          {passwordVisible ? "Hide" : "Show"}
        </button>
      </div>
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <label htmlFor="gender">Gender:</label>
      <select id="gender" {...register("gender")}>
        <option value="">Select...</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {errors.gender && <p>{errors.gender.message}</p>}

      <label htmlFor="picture">Picture:</label>
      <input
        id="picture"
        type="file"
        {...register("picture")}
        accept=".png, .jpg, .jpeg"
      />
      {errors.picture && <p>{errors.picture.message}</p>}

      <label htmlFor="country">Country:</label>
      <input id="country" type="text" {...register("country")} />
      {errors.country && <p>{errors.country.message}</p>}

      <label htmlFor="terms">
        <input id="terms" type="checkbox" {...register("terms")} />
        Accept Terms and Conditions
      </label>
      {errors.terms && <p>{errors.terms.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default ControlledForm;
