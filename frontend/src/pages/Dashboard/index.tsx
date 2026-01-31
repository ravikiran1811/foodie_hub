import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { selectUser, logout } from '../../store/slices/authSlice';
import { selectPermissions } from '../../store/slices/permissionsSlice';
import { dashboardApi } from '../../services/api';
import { DashboardStats, RecentOrder } from '../../types/api';
import { Spinner } from '../../components/Spinner';
import Layout from '../../components/Layout';
import {
  StyledContainer,
  StyledHeader,
  HeaderLeft,
  HeaderIcon,
  StyledTitle,
  HeaderActions,
  IconButton,
  ProfileWrapper,
  ProfileDropdown,
  DropdownItem,
  StatsGrid,
  StatCard,
  StatLabel,
  StatValue,
  ContentGrid,
  Section,
  SectionHeader,
  SectionTitle,
  ViewAllButton,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  StatusBadge,
  ChartSection,
} from './styles';

const Dashboard = () => {
  const user = useAppSelector(selectUser);
  const permissions = useAppSelector(selectPermissions);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [statsResponse, ordersResponse] = await Promise.all([
          dashboardApi.getStats(),
          dashboardApi.getRecentOrders(5),
        ]);
        setStats(statsResponse.data);
        setRecentOrders(ordersResponse.data);
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (loading) {
    return (
      <Layout>
        <StyledContainer>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
            <Spinner />
          </div>
        </StyledContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <StyledContainer>
        <StyledHeader>
          <HeaderLeft>
            <HeaderIcon>🍽️</HeaderIcon>
            <StyledTitle>Dashboard</StyledTitle>
          </HeaderLeft>
          <HeaderActions>
            <IconButton>🔔</IconButton>
            <IconButton>🔍</IconButton>
            <ProfileWrapper>
              <IconButton onClick={() => setShowProfileDropdown(!showProfileDropdown)}>👤</IconButton>
              {showProfileDropdown && (
                <ProfileDropdown>
                  <DropdownItem onClick={handleLogout}>🚪 Logout</DropdownItem>
                </ProfileDropdown>
              )}
            </ProfileWrapper>
          </HeaderActions>
        </StyledHeader>

        <StatsGrid>
          <StatCard>
            <StatLabel>Total Orders</StatLabel>
            <StatValue>{stats?.totalOrders || 0}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Total Restaurants</StatLabel>
            <StatValue>{stats?.totalRestaurants || 0}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Orders Last Year</StatLabel>
            <StatValue>{stats?.ordersLastYear || 0}</StatValue>
          </StatCard>
          <StatCard>
            <StatLabel>Orders Today</StatLabel>
            <StatValue>{stats?.ordersToday || 0}</StatValue>
          </StatCard>
        </StatsGrid>

        <ContentGrid>
          <Section>
            <SectionHeader>
              <SectionTitle>Latest Orders</SectionTitle>
              <ViewAllButton onClick={() => navigate('/orders')}>
                View All →
              </ViewAllButton>
            </SectionHeader>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Order ID</TableHeader>
                  <TableHeader>Customer</TableHeader>
                  <TableHeader>Status</TableHeader>
                  <TableHeader>Total</TableHeader>
                </TableRow>
              </TableHead>
              <tbody>
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.orderNumber}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>
                        <StatusBadge status={order.status}>{order.status}</StatusBadge>
                      </TableCell>
                      <TableCell>{order.total}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>
                      No orders found
                    </TableCell>
                  </TableRow>
                )}
              </tbody>
            </Table>
          </Section>

          <Section>
            <SectionHeader>
              <SectionTitle>Revenue Overview</SectionTitle>
            </SectionHeader>
            <div style={{ padding: '20px' }}>
              <StatLabel>Total Revenue</StatLabel>
              <StatValue style={{ fontSize: '2.5rem', marginTop: '10px' }}>
                {stats?.totalRevenue || '$0.00'}
              </StatValue>
              <div style={{ marginTop: '20px', color: '#666' }}>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Total Users:</strong> {stats?.totalUsers || 0}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Active Restaurants:</strong> {stats?.activeRestaurants || 0}
                </div>
                <div>
                  <strong>User Roles:</strong> {stats?.totalRoles || 0}
                </div>
              </div>
            </div>
          </Section>
        </ContentGrid>
      </StyledContainer>
    </Layout>
  );
};

export default Dashboard;
