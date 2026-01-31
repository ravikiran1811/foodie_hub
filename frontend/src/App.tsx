import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { GlobalStyles } from './styles/GlobalStyles';
import { NotificationProvider } from './components/Notification';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Restaurants from './pages/Restaurants';
import RestaurantMenu from './pages/RestaurantMenu';
import Orders from './pages/Orders';
import PaymentMethods from './pages/PaymentMethods';
import Permissions from './pages/Permissions';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <NotificationProvider>
        <BrowserRouter>
          <GlobalStyles />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/restaurants" element={<ProtectedRoute><Restaurants /></ProtectedRoute>} />
            <Route path="/restaurants/:id" element={<ProtectedRoute><RestaurantMenu /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/payments" element={<ProtectedRoute><PaymentMethods /></ProtectedRoute>} />
            <Route path="/permissions" element={<ProtectedRoute><Permissions /></ProtectedRoute>} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </Provider>
  );
}

export default App;
