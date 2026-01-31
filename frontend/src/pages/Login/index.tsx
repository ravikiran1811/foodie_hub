import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { login, selectAuthLoading, selectAuthError } from '../../store/slices/authSlice';
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
  StyledButton,
  StyledErrorMessage,
  StyledForgotPassword,
  StyledTestCredentials,
  StyledCredentialsTitle,
  StyledCredentialItem,
  StyledFooter,
} from './styles';

const Login = () => {
  const [email, setEmail] = useState('admin@gmail.com');
  const [password, setPassword] = useState('Test@123');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password })).unwrap();
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
        <StyledTitle>FoodieHub</StyledTitle>
        <StyledSubtitle>Welcome back! Sign in to continue</StyledSubtitle>
        
        <StyledForm onSubmit={handleSubmit}>
          <StyledFormGroup>
            <StyledLabel>Email</StyledLabel>
            <StyledInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@gmail.com"
            />
          </StyledFormGroup>

          <StyledFormGroup>
            <StyledLabel>Password</StyledLabel>
            <StyledInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </StyledFormGroup>

          {error && <StyledErrorMessage>{error}</StyledErrorMessage>}

          <StyledButton type="submit" disabled={loading}>
            {loading ? (
              <><Spinner /> Signing in...</>
            ) : (
              'Login'
            )}
          </StyledButton>
        </StyledForm>

        <StyledForgotPassword>
          <Link to="/forgot-password">Forgot Password?</Link>
        </StyledForgotPassword>

        <StyledTestCredentials>
          <StyledCredentialsTitle>Test Credentials:</StyledCredentialsTitle>
          <StyledCredentialItem>Admin: admin@gmail.com / Test@123</StyledCredentialItem>
          <StyledCredentialItem>Customer: customer@foodorder.com/ Test@123</StyledCredentialItem>
        </StyledTestCredentials>

        <StyledFooter>
          Don't have an account? <Link to="/register">Register here</Link>
        </StyledFooter>
      </StyledFormCard>
    </StyledContainer>
  );
};

export default Login;
