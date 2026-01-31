import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import api from '../../services/api';
import { Order } from '../../types/api';
import { usePermission } from '../../components/PermissionGuard';
import { FeatureKey } from '../../types/permissions';
import { Spinner } from '../../components/Spinner';
import { useNotification } from '../../components/Notification';
import {
  StyledContainer,
  StyledHeader,
  StyledTitle,
  StyledSubtitle,
  StyledOrdersList,
  StyledOrderCard,
  StyledOrderHeader,
  StyledOrderInfo,
  StyledOrderId,
  StyledOrderDate,
  StyledOrderStatus,
  StyledRestaurantInfo,
  StyledRestaurantName,
  StyledRestaurantAddress,
  StyledOrderItems,
  StyledOrderItem,
  StyledItemName,
  StyledItemPrice,
  StyledOrderFooter,
  StyledTotalAmount,
  StyledCancelButton,
  StyledLoading,
  StyledEmptyState,
  StyledEmptyIcon,
  StyledEmptyText,
  StyledEmptySubtext,
  StyledNoAccess,
} from './styles';

const Orders = () => {
  const { showSuccess, showError, showWarning } = useNotification();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingOrderId, setCancellingOrderId] = useState<number | null>(null);
  
  const { hasPermission: canViewOrders } = usePermission(FeatureKey.VIEW_ORDERS);
  const { hasPermission: canCancelOrders } = usePermission(FeatureKey.CANCEL_ORDER);

  useEffect(() => {
    if (canViewOrders) {
      fetchOrders();
    }
  }, [canViewOrders]);

  const fetchOrders = async () => {
    try {
      const response = await api.get<Order[]>('/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId: number) => {
    if (!canCancelOrders) {
      showWarning('You do not have permission to cancel orders');
      return;
    }

    if (!confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    try {
      setCancellingOrderId(orderId);
      await api.delete(`/orders/${orderId}`);
      showSuccess('Order cancelled successfully');
      fetchOrders();
    } catch (error) {
      showError('Failed to cancel order');
      console.error(error);
    } finally {
      setCancellingOrderId(null);
    }
  };

  if (!canViewOrders) {
    return (
      <Layout>
        <StyledContainer>
          <StyledNoAccess>You don't have permission to view orders</StyledNoAccess>
        </StyledContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <StyledContainer>
        <StyledHeader>
          <StyledTitle>📦 Orders Management</StyledTitle>
          <StyledSubtitle>Track and manage your food orders</StyledSubtitle>
        </StyledHeader>

        {loading ? (
          <StyledLoading>Loading orders...</StyledLoading>
        ) : orders.length === 0 ? (
          <StyledEmptyState>
            <StyledEmptyIcon>📦</StyledEmptyIcon>
            <StyledEmptyText>No orders yet</StyledEmptyText>
            <StyledEmptySubtext>Start by ordering from your favorite restaurant!</StyledEmptySubtext>
          </StyledEmptyState>
        ) : (
          <StyledOrdersList>
            {orders.map((order) => (
              <StyledOrderCard key={order.id}>
                <StyledOrderHeader>
                  <StyledOrderInfo>
                    <StyledOrderId>Order #{order.id}</StyledOrderId>
                    <StyledOrderDate>{new Date(order.createdAt).toLocaleDateString()}</StyledOrderDate>
                  </StyledOrderInfo>
                  <StyledOrderStatus status={order.status}>{order.status}</StyledOrderStatus>
                </StyledOrderHeader>

                <StyledRestaurantInfo>
                  <StyledRestaurantName>{order.restaurant?.name}</StyledRestaurantName>
                  <StyledRestaurantAddress>{order.restaurant?.address}</StyledRestaurantAddress>
                </StyledRestaurantInfo>

                <StyledOrderItems>
                  {order.items.map((item, index) => (
                    <StyledOrderItem key={index}>
                      <StyledItemName>
                        {item.menuItem?.name} x {item.quantity}
                      </StyledItemName>
                      <StyledItemPrice>₹{item.price * item.quantity}</StyledItemPrice>
                    </StyledOrderItem>
                  ))}
                </StyledOrderItems>

                <StyledOrderFooter>
                  <StyledTotalAmount>
                    Total: <strong>₹{order.totalAmount}</strong>
                  </StyledTotalAmount>
                  {canCancelOrders && order.status !== 'CANCELLED' && order.status !== 'DELIVERED' && (
                    <StyledCancelButton 
                      onClick={() => handleCancelOrder(order.id)}
                      disabled={cancellingOrderId === order.id}
                    >
                      {cancellingOrderId === order.id ? (
                        <><Spinner /> Cancelling...</>
                      ) : (
                        'Cancel Order'
                      )}
                    </StyledCancelButton>
                  )}
                </StyledOrderFooter>
              </StyledOrderCard>
            ))}
          </StyledOrdersList>
        )}
      </StyledContainer>
    </Layout>
  );
};

export default Orders;
