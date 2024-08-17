import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveUncontrolledForm } from '../store/formSlice';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { RootState } from '../store';
import CountryAutocomplete from './CountryAutocomplete';

const UncontrolledForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state: RootState) => state.countries.countries);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const termsRef = useRef<HTMLInputElement>(null);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const schema = yup.object().shape({
    name: yup
      .string()
      .required('Name is required')
      .matches(/^[A-Z]/, 'First letter must be uppercase'),
    age: yup
      .number()
      .required('Age is required')
      .positive('Age must be a positive number')
      .integer('Age must be an integer'),
    email: yup
      .string()
      .required('Email is required')
      .email('Invalid email format'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(/[A-Z]/, 'Must have one uppercase letter')
      .matches(/[a-z]/, 'Must have one lowercase letter')
      .matches(/[0-9]/, 'Must have one number')
      .matches(/[@$!%*?&#]/, 'Must have one special character'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
    gender: yup.string().required('Gender is required'),
    picture: yup
      .mixed()
      .required('Picture is required')
      .test('fileSize', 'File too large', (value) => {
        if (!value || !(value instanceof FileList) || value.length === 0) {
          return false;
        }
        return value[0].size <= 1024 * 1024;
      })
      .test('fileType', 'Unsupported File Format', (value) => {
        if (!value || !(value instanceof FileList) || value.length === 0) {
          return false;
        }
        return ['image/jpeg', 'image/png'].includes(value[0].type);
      }),
    country: yup
      .string()
      .required('Country is required')
      .test('isValidCountry', 'You must select a valid country', function (value) {
        return countries.includes(value || '');
      }),
    terms: yup
      .boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('You must accept the terms and conditions'),
  });

  const validateForm = async () => {
    try {
      const formData = {
        name: nameRef.current!.value,
        age: parseInt(ageRef.current!.value),
        email: emailRef.current!.value,
        password: passwordRef.current!.value,
        confirmPassword: confirmPasswordRef.current!.value,
        gender: genderRef.current!.value,
        picture: pictureRef.current!.files,
        country: selectedCountry,
        terms: termsRef.current!.checked,
      };

      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      return formData;
    } catch (validationErrors) {
      const formattedErrors: { [key: string]: string } = {};
      if (validationErrors instanceof yup.ValidationError) {
        validationErrors.inner.forEach((error) => {
          if (error.path) {
            formattedErrors[error.path] = error.message;
          }
        });
      }
      setErrors(formattedErrors);
      return null;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = await validateForm();

    if (formData) {
      const file = formData.picture?.[0] ?? null;
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;

        dispatch(saveUncontrolledForm({ ...formData, picture: base64String }));
        navigate('/');
      };

      if (file) {
        reader.readAsDataURL(file);
      }
    }
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

  const getPasswordStrengthInfo = (strength: number) => {
    switch (strength) {
      case 1:
        return { color: 'red', text: 'Very Weak' };
      case 2:
        return { color: 'orange', text: 'Weak' };
      case 3:
        return { color: 'yellow', text: 'Moderate' };
      case 4:
        return { color: 'lightgreen', text: 'Strong' };
      case 5:
        return { color: 'green', text: 'Very Strong' };
      default:
        return { color: 'gray', text: 'Too Short' };
    }
  };

  const { color, text } = getPasswordStrengthInfo(passwordStrength);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <form  onSubmit={handleSubmit} autoComplete="off">
      <label htmlFor="name">Name:</label>
      <input id="name" type="text" ref={nameRef} />
      {errors.name && <p>{errors.name}</p>}

      <label htmlFor="age">Age:</label>
      <input id="age" type="number" ref={ageRef} />
      {errors.age && <p>{errors.age}</p>}

      <label htmlFor="email">Email:</label>
      <input id="email" type="email" ref={emailRef} />
      {errors.email && <p>{errors.email}</p>}

      <label htmlFor="password">Password:</label>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <input
            id="password"
            type={passwordVisible ? 'text' : 'password'}
            ref={passwordRef}
            onChange={(e) => {
              calculatePasswordStrength(e.target.value);
            }}
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {passwordVisible ? 'Hide' : 'Show'}
          </button>
        </div>
        {errors.password && <p>{errors.password}</p>}
        <div
          style={{
            height: '5px',
            backgroundColor: color,
            width: '100%',
            marginTop: '5px',
          }}
        />
        <p style={{ color }}>{text}</p>
      </div>

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          id="confirmPassword"
          type={passwordVisible ? 'text' : 'password'}
          ref={confirmPasswordRef}
        />
        <button type="button" onClick={togglePasswordVisibility}>
          {passwordVisible ? 'Hide' : 'Show'}
        </button>
      </div>
      {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

      <label htmlFor="gender">Gender:</label>
      <select id="gender" ref={genderRef}>
        <option value="">Select...</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {errors.gender && <p>{errors.gender}</p>}

      <label htmlFor="picture">Picture:</label>
      <input id="picture" type="file" ref={pictureRef} accept=".png, .jpg, .jpeg" />
      {errors.picture && <p>{errors.picture}</p>}

      <CountryAutocomplete
        onSelectCountry={(country) => setSelectedCountry(country)}
        selectedCountry={selectedCountry}
      />
      {errors.country && <p>{errors.country}</p>}

      <label htmlFor="terms">
        <input id="terms" type="checkbox" ref={termsRef} />
        Accept Terms and Conditions
      </label>
      {errors.terms && <p>{errors.terms}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
