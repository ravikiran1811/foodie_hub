import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import api from '../../services/api';
import { MenuItem, Restaurant } from '../../types/api';
import { usePermission } from '../../components/PermissionGuard';
import { FeatureKey } from '../../types/permissions';
import { Spinner } from '../../components/Spinner';
import { useNotification } from '../../components/Notification';
import {
  StyledContainer,
  StyledRestaurantHeader,
  StyledContentWrapper,
  StyledMenuSection,
  StyledSectionTitle,
  StyledMenuGrid,
  StyledMenuItem,
  StyledItemImage,
  StyledItemInfo,
  StyledItemName,
  StyledItemDescription,
  StyledItemFooter,
  StyledItemPrice,
  StyledAddButton,
  StyledCartSection,
  StyledCartItems,
  StyledCartItem,
  StyledCartItemName,
  StyledCartItemActions,
  StyledQuantityButton,
  StyledQuantity,
  StyledCartItemPrice,
  StyledTotal,
  StyledCheckoutButton,
  StyledLoading,
} from './styles';

interface CartItem extends MenuItem {
  quantity: number;
}

const RestaurantMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError, showWarning } = useNotification();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);

  const { hasPermission: canCreateOrder } = usePermission(FeatureKey.CREATE_ORDER);

  useEffect(() => {
    fetchRestaurant();
    fetchMenu();
  }, [id]);

  const fetchRestaurant = async () => {
    try {
      const response = await api.get<Restaurant>(`/restaurants/${id}`);
      setRestaurant(response.data);
    } catch (error) {
      console.error('Failed to fetch restaurant', error);
    }
  };

  const fetchMenu = async () => {
    try {
      const response = await api.get<MenuItem[]>(`/restaurants/${id}/menu`);
      setMenuItems(response.data);
    } catch (error) {
      console.error('Failed to fetch menu', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (item: MenuItem) => {
    const existing = cart.find((c) => c.id === item.id);
    if (existing) {
      setCart(cart.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c)));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: number) => {
    const existing = cart.find((c) => c.id === itemId);
    if (existing && existing.quantity > 1) {
      setCart(cart.map((c) => (c.id === itemId ? { ...c, quantity: c.quantity - 1 } : c)));
    } else {
      setCart(cart.filter((c) => c.id !== itemId));
    }
  };

  const getTotalAmount = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    if (!canCreateOrder) {
      showWarning('You do not have permission to create orders');
      return;
    }

    try {
      setCheckingOut(true);
      const orderData = {
        restaurantId: parseInt(id!),
        items: cart.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
          price: Number(item.price),
        })),
      };

      await api.post('/orders', orderData);
      showSuccess('Order placed successfully!');
      setCart([]);
      navigate('/orders');
    } catch (error) {
      showError('Failed to place order');
      console.error(error);
    } finally {
      setCheckingOut(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <StyledContainer>
          <StyledLoading>Loading menu...</StyledLoading>
        </StyledContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <StyledContainer>
        {restaurant && (
          <StyledRestaurantHeader>
            <h1>🍴 {restaurant.name}</h1>
            <p>{restaurant.description}</p>
            <p>📍 {restaurant.address}</p>
          </StyledRestaurantHeader>
        )}

        <StyledContentWrapper>
          <StyledMenuSection>
            <StyledSectionTitle>Menu</StyledSectionTitle>
            <StyledMenuGrid>
              {menuItems.map((item) => (
                <StyledMenuItem key={item.id}>
                  <StyledItemImage src={item.imageUrl || '/placeholder.png'} alt={item.name} />
                  <StyledItemInfo>
                    <StyledItemName>{item.name}</StyledItemName>
                    <StyledItemDescription>{item.description}</StyledItemDescription>
                    <StyledItemFooter>
                      <StyledItemPrice>₹{item.price}</StyledItemPrice>
                      {canCreateOrder && (
                        <StyledAddButton onClick={() => addToCart(item)}>Add +</StyledAddButton>
                      )}
                    </StyledItemFooter>
                  </StyledItemInfo>
                </StyledMenuItem>
              ))}
            </StyledMenuGrid>
          </StyledMenuSection>

          {cart.length > 0 && (
            <StyledCartSection>
              <StyledSectionTitle>Your Cart</StyledSectionTitle>
              <StyledCartItems>
                {cart.map((item) => (
                  <StyledCartItem key={item.id}>
                    <StyledCartItemName>{item.name}</StyledCartItemName>
                    <StyledCartItemActions>
                      <StyledQuantityButton onClick={() => removeFromCart(item.id)}>-</StyledQuantityButton>
                      <StyledQuantity>{item.quantity}</StyledQuantity>
                      <StyledQuantityButton onClick={() => addToCart(item)}>+</StyledQuantityButton>
                    </StyledCartItemActions>
                    <StyledCartItemPrice>₹{item.price * item.quantity}</StyledCartItemPrice>
                  </StyledCartItem>
                ))}
              </StyledCartItems>
              <StyledTotal>
                <span>Total:</span>
                <span>₹{getTotalAmount()}</span>
              </StyledTotal>
              {canCreateOrder && (
                <StyledCheckoutButton onClick={handleCheckout} disabled={checkingOut}>
                  {checkingOut ? (
                    <><Spinner /> Placing Order...</>
                  ) : (
                    'Place Order'
                  )}
                </StyledCheckoutButton>
              )}
            </StyledCartSection>
          )}
        </StyledContentWrapper>
      </StyledContainer>
    </Layout>
  );
};

export default RestaurantMenu;
