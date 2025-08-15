import { useState } from 'react';
import axios from 'axios';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const useRazorpay = () => {
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async (planType: string, planName: string, price: string): Promise<boolean> => {
    try {
      setLoading(true);

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load payment gateway. Please try again.');
        return false;
      }

      // Create order
      const orderResponse = await axios.post('/api/payments/create-order', {
        planType
      });

      const { orderId, amount, currency } = orderResponse.data;

      // Configure Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: 'SMMS Pro',
        description: `${planName} Plan Subscription`,
        order_id: orderId,
        handler: async (response: any) => {
          try {
            // Verify payment
            const verifyResponse = await axios.post('/api/payments/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planType
            });

            if (verifyResponse.data.message) {
              return true;
            }
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed. Please contact support.');
            return false;
          }
        },
        prefill: {
          name: `${(window as any).currentUser?.firstName || ''} ${(window as any).currentUser?.lastName || ''}`,
          email: (window as any).currentUser?.email || '',
        },
        theme: {
          color: '#9333ea'
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      return true;
    } catch (error: any) {
      console.error('Payment initiation failed:', error);
      alert(error.response?.data?.message || 'Payment failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    initiatePayment,
    loading
  };
};