import { useState, useEffect, FormEvent } from 'react';
import Layout from '../../components/Layout';
import api from '../../services/api';
import { PaymentMethod } from '../../types/api';
import { usePermission } from '../../components/PermissionGuard';
import { FeatureKey } from '../../types/permissions';
import { Spinner } from '../../components/Spinner';
import { useNotification } from '../../components/Notification';
import {
  StyledContainer,
  StyledHeader,
  StyledHeaderContent,
  StyledTitle,
  StyledSubtitle,
  StyledAddButton,
  StyledFormCard,
  StyledFormTitle,
  StyledForm,
  StyledFormGroup,
  StyledLabel,
  StyledInput,
  StyledSelect,
  StyledSubmitButton,
  StyledPaymentGrid,
  StyledPaymentCard,
  StyledCardIcon,
  StyledCardInfo,
  StyledCardLabel,
  StyledCardType,
  StyledCardNumber,
  StyledDeleteButton,
  StyledLoading,
  StyledEmptyState,
  StyledEmptyIcon,
  StyledEmptyText,
  StyledEmptySubtext,
  StyledNoAccess,
} from './styles';

const PaymentMethods = () => {
  const { showSuccess, showError, showWarning } = useNotification();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    type: 'CREDIT_CARD',
    label: '',
    last4Digits: '',
  });

  const { hasPermission: canViewPayments } = usePermission(FeatureKey.VIEW_PAYMENT_METHODS);
  const { hasPermission: canAddPayments } = usePermission(FeatureKey.ADD_PAYMENT_METHOD);

  useEffect(() => {
    if (canViewPayments) {
      fetchPaymentMethods();
    }
  }, [canViewPayments]);

  const fetchPaymentMethods = async () => {
    try {
      const response = await api.get<PaymentMethod[]>('/payments/methods');
      setPaymentMethods(response.data);
    } catch (error) {
      console.error('Failed to fetch payment methods', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!canAddPayments) {
      showWarning('You do not have permission to add payment methods');
      return;
    }

    try {
      setSubmitting(true);
      await api.post('/payments/methods', formData);
      showSuccess('Payment method added successfully');
      setFormData({ type: 'CREDIT_CARD', label: '', last4Digits: '' });
      setShowForm(false);
      fetchPaymentMethods();
    } catch (error) {
      showError('Failed to add payment method');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to remove this payment method?')) {
      return;
    }

    try {
      setDeletingId(id);
      await api.delete(`/payments/methods/${id}`);
      showSuccess('Payment method removed successfully');
      fetchPaymentMethods();
    } catch (error) {
      showError('Failed to remove payment method');
      console.error(error);
    } finally {
      setDeletingId(null);
    }
  };

  if (!canViewPayments) {
    return (
      <Layout>
        <StyledContainer>
          <StyledNoAccess>You don't have permission to view payment methods</StyledNoAccess>
        </StyledContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <StyledContainer>
        <StyledHeader>
          <StyledHeaderContent>
            <div>
              <StyledTitle>💳 Payment Methods</StyledTitle>
              <StyledSubtitle>Manage your payment options</StyledSubtitle>
            </div>
            {canAddPayments && (
              <StyledAddButton onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : '+ Add New'}
              </StyledAddButton>
            )}
          </StyledHeaderContent>
        </StyledHeader>

        {showForm && canAddPayments && (
          <StyledFormCard>
            <StyledFormTitle>Add New Payment Method</StyledFormTitle>
            <StyledForm onSubmit={handleSubmit}>
              <StyledFormGroup>
                <StyledLabel>Type</StyledLabel>
                <StyledSelect
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                  <option value="CREDIT_CARD">Credit Card</option>
                  <option value="DEBIT_CARD">Debit Card</option>
                  <option value="UPI">UPI</option>
                  <option value="NET_BANKING">Net Banking</option>
                  <option value="WALLET">Wallet</option>
                </StyledSelect>
              </StyledFormGroup>

              <StyledFormGroup>
                <StyledLabel>Label</StyledLabel>
                <StyledInput
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="e.g., My Visa Card"
                  required
                />
              </StyledFormGroup>

              <StyledFormGroup>
                <StyledLabel>Last 4 Digits</StyledLabel>
                <StyledInput
                  type="text"
                  value={formData.last4Digits}
                  onChange={(e) => setFormData({ ...formData, last4Digits: e.target.value })}
                  placeholder="1234"
                  required
                  maxLength={4}
                  pattern="[0-9]{4}"
                />
              </StyledFormGroup>

              <StyledSubmitButton type="submit" disabled={submitting}>
                {submitting ? (
                  <><Spinner /> Adding...</>
                ) : (
                  'Add Payment Method'
                )}
              </StyledSubmitButton>
            </StyledForm>
          </StyledFormCard>
        )}

        {loading ? (
          <StyledLoading>Loading payment methods...</StyledLoading>
        ) : paymentMethods.length === 0 ? (
          <StyledEmptyState>
            <StyledEmptyIcon>💳</StyledEmptyIcon>
            <StyledEmptyText>No payment methods added</StyledEmptyText>
            <StyledEmptySubtext>Add a payment method to checkout faster</StyledEmptySubtext>
          </StyledEmptyState>
        ) : (
          <StyledPaymentGrid>
            {paymentMethods.map((method) => (
              <StyledPaymentCard key={method.id}>
                <StyledCardIcon>
                  {method.type === 'CREDIT_CARD' || method.type === 'DEBIT_CARD'
                    ? '💳'
                    : method.type === 'UPI'
                    ? '📱'
                    : method.type === 'WALLET'
                    ? '👛'
                    : '🏦'}
                </StyledCardIcon>
                <StyledCardInfo>
                  <StyledCardLabel>{method.label}</StyledCardLabel>
                  <StyledCardType>{method.type.replace('_', ' ')}</StyledCardType>
                  <StyledCardNumber>•••• {method.last4Digits}</StyledCardNumber>
                </StyledCardInfo>
                <StyledDeleteButton 
                  onClick={() => handleDelete(method.id)}
                  disabled={deletingId === method.id}
                >
                  {deletingId === method.id ? (
                    <><Spinner /> Removing...</>
                  ) : (
                    'Remove'
                  )}
                </StyledDeleteButton>
              </StyledPaymentCard>
            ))}
          </StyledPaymentGrid>
        )}
      </StyledContainer>
    </Layout>
  );
};

export default PaymentMethods;
