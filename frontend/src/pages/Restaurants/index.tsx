import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import api from '../../services/api';
import { Restaurant } from '../../types/api';
import { PermissionGuard } from '../../components/PermissionGuard';
import { FeatureKey } from '../../types/permissions';
import {
  StyledContainer,
  StyledHeader,
  StyledTitle,
  StyledSubtitle,
  StyledGrid,
  StyledCard,
  StyledImageContainer,
  StyledImage,
  StyledCardContent,
  StyledRestaurantName,
  StyledDescription,
  StyledAddress,
  StyledCountry,
  StyledLoading,
  StyledNoAccess,
} from './styles';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await api.get<Restaurant[]>('/restaurants');
      setRestaurants(response.data);
    } catch (error) {
      console.error('Failed to fetch restaurants', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <StyledContainer>
        <StyledHeader>
          <StyledTitle>🏪 Manage Restaurants</StyledTitle>
          <StyledSubtitle>Choose from the best restaurants in your area</StyledSubtitle>
        </StyledHeader>

        <PermissionGuard
          feature={FeatureKey.VIEW_RESTAURANTS}
          fallback={<StyledNoAccess>You don't have permission to view restaurants</StyledNoAccess>}
        >
          {loading ? (
            <StyledLoading>Loading restaurants...</StyledLoading>
          ) : (
            <StyledGrid>
              {restaurants.map((restaurant) => (
                <StyledCard key={restaurant.id} onClick={() => navigate(`/restaurants/${restaurant.id}`)}>
                  <StyledImageContainer>
                    <StyledImage src={restaurant.imageUrl || '/placeholder.png'} alt={restaurant.name} />
                  </StyledImageContainer>
                  <StyledCardContent>
                    <StyledRestaurantName>{restaurant.name}</StyledRestaurantName>
                    <StyledDescription>{restaurant.description}</StyledDescription>
                    <StyledAddress>📍 {restaurant.address}</StyledAddress>
                    <StyledCountry>🌍 {restaurant.country}</StyledCountry>
                  </StyledCardContent>
                </StyledCard>
              ))}
            </StyledGrid>
          )}
        </PermissionGuard>
      </StyledContainer>
    </Layout>
  );
};

export default Restaurants;
