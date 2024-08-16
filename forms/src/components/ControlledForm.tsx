import React from "react";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { saveControlledForm } from "../store/formSlice";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  name: yup.string().required().matches(/^[A-Z]/, 'First letter must be uppercase'),
  age: yup.number().required().positive().integer(),
  email: yup.string().required().email(),
  password: yup.string().required().min(8)
    .matches(/[A-Z]/, 'Must have one uppercase letter')
    .matches(/[a-z]/, 'Must have one lowercase letter')
    .matches(/[0-9]/, 'Must have one number')
    .matches(/[@$!%*?&#]/, 'Must have one special character'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required(),
  gender: yup.string().required(),
  picture: yup.mixed().required().test('fileSize', 'File too large', (value) => {
    if (!value || !(value instanceof FileList)) {
      return false;
    }
    return value[0].size <= 1024 * 1024;
  }).test('fileType', 'Unsupported File Format', (value) => {
    if (!value || !(value instanceof FileList)) {
      return false;
    }
    return ['image/jpeg', 'image/png'].includes(value[0].type);
  }),
  country: yup.string().required(),
  terms: yup.boolean().oneOf([true], 'Accept Terms is required').required(),
});



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


const ControlledForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema) as unknown as Resolver<FormData>,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <input id="password" type="password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input id="confirmPassword" type="password" {...register("confirmPassword")} />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <label htmlFor="gender">Gender:</label>
      <select id="gender" {...register("gender")}>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {errors.gender && <p>{errors.gender.message}</p>}

      <label htmlFor="picture">Picture:</label>
      <input id="picture" type="file" {...register("picture")} accept=".png, .jpg, .jpeg" />
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
