import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { register, selectAuthLoading, selectAuthError } from '../../store/slices/authSlice';
import { Spinner } from '../../components/Spinner';
import {
  StyledContainer,
  StyledFormCard,
  LogoIcon,
  StyledTitle,
  StyledSubtitle,
  StyledForm,
  StyledFormGroup,
  StyledLabel,
  StyledInput,
  StyledSelect,
  StyledButton,
  StyledErrorMessage,
  StyledFooter,
} from './styles';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleName, setRoleName] = useState('Customer');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(register({ name, email, password, roleName, country: 'INDIA' })).unwrap();
      navigate('/');
    } catch (err) {
      // Error handled by Redux
    }
  };

  return (
    <StyledContainer>
      <StyledFormCard>
        <LogoIcon>
          <img src="https://mir-s3-cdn-cf.behance.net/projects/404/42b7e5119707637.Y3JvcCwxMzgwLDEwODAsMjcwLDA.jpg" alt="FoodieHub Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
        </LogoIcon>
        <StyledTitle>Join FoodieHub</StyledTitle>
        <StyledSubtitle>Start your delicious journey with us</StyledSubtitle>
        
        <StyledForm onSubmit={handleSubmit}>
          <StyledFormGroup>
            <StyledLabel>Full Name</StyledLabel>
            <StyledInput
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="John Doe"
            />
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledLabel>Email</StyledLabel>
            <StyledInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="john@example.com"
            />
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledLabel>Password</StyledLabel>
            <StyledInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="••••••••"
            />
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledLabel>Role</StyledLabel>
            <StyledSelect value={roleName} onChange={(e) => setRoleName(e.target.value)}>
              <option value="Customer">Customer</option>
              {/* <option value="Manager">Manager</option>
              <option value="Admin">Admin</option> */}
            </StyledSelect>
          </StyledFormGroup>

          {error && <StyledErrorMessage>{error}</StyledErrorMessage>}

          <StyledButton type="submit" disabled={loading}>
            {loading ? (
              <><Spinner /> Creating account...</>
            ) : (
              'Register'
            )}
          </StyledButton>
        </StyledForm>

        <StyledFooter>
          Already have an account? <Link to="/login">Sign in here</Link>
        </StyledFooter>
      </StyledFormCard>
    </StyledContainer>
  );
};

export default Register;
