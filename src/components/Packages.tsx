import React from 'react';
import { Check, Star, Crown, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useRazorpay } from '../hooks/useRazorpay';

const Packages: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { initiatePayment, loading } = useRazorpay();

  const handlePackageSelect = async (planType: string, planName: string, price: string) => {
    if (!isAuthenticated) {
      alert('Please login to purchase a package');
      return;
    }

    const success = await initiatePayment(planType, planName, price);
    if (success) {
      alert('Payment successful! Your subscription is now active.');
    }
  };

  const packages = [
    {
      name: 'Starter',
      id: 'starter',
      icon: Star,
      price: '₹1,999',
      period: '/month',
      description: 'Perfect for small businesses starting their social media journey',
      features: [
        '3 Posts per week',
        '10 Stories per month',
        'Free hashtags & captions',
        'Basic content planning',
        'Community management'
      ],
      buttonText: 'Get Started with Starter',
      popular: false,
      color: 'blue'
    },
    {
      name: 'Growth',
      id: 'growth',
      icon: Zap,
      price: '₹3,499',
      period: '/month',
      description: 'Ideal for growing businesses ready to scale their presence',
      features: [
        '5 Posts per week',
        '20 Stories per month',
        '2 Reels per month',
        'Free hashtags & captions',
        'Advanced analytics',
        '1 Free customizable post'
      ],
      bonusService: 'One free customizable post for offers and festivals per month.',
      buttonText: 'Get Started with Growth',
      popular: true,
      color: 'purple'
    },
    {
      name: 'Pro Boost',
      id: 'pro-boost',
      icon: Crown,
      price: '₹4,999',
      period: '/month',
      description: 'Complete social media domination for established brands',
      features: [
        '5 Posts per week',
        'Daily Stories',
        '4 Reels per month',
        'Free hashtags & captions',
        'Monthly growth analytics',
        '1 Free customizable post',
        'Priority support'
      ],
      bonusService: 'One free customizable post for offers and festivals per month.',
      buttonText: 'Get Started with Pro Boost',
      popular: false,
      color: 'orange'
    }
  ];

  return (
    <section id="packages" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Social Media Management Packages
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From startup to enterprise, we have the perfect package to grow your social media presence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => {
            const IconComponent = pkg.icon;
            const isPopular = pkg.popular;
            
            return (
              <div
                key={index}
                className={`relative rounded-2xl bg-white shadow-xl overflow-hidden transition-transform hover:scale-105 ${
                  isPopular ? 'ring-4 ring-purple-500' : ''
                }`}
              >
                {isPopular && (
                  <div className="absolute top-0 left-0 right-0 bg-purple-500 text-white text-center py-2 font-semibold">
                    Most Popular
                  </div>
                )}
                
                <div className={`p-8 ${isPopular ? 'pt-16' : ''}`}>
                  <div className="text-center mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                      pkg.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      pkg.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                      'bg-orange-100 text-orange-600'
                    }`}>
                      <IconComponent size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{pkg.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-gray-900">{pkg.price}</span>
                      <span className="text-gray-600 ml-1">{pkg.period}</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {pkg.bonusService && (
                    <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-pink-800 mb-2">🎁 Bonus Service</h4>
                      <p className="text-pink-700 text-sm">{pkg.bonusService}</p>
                    </div>
                  )}

                  <button className={`w-full py-4 px-6 rounded-lg font-semibold transition-colors ${
                    isPopular 
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                  } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => handlePackageSelect(pkg.id, pkg.name, pkg.price)}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : pkg.buttonText}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">🎁 Active Referral Program</h3>
          <p className="text-xl mb-6">Refer clients and earn amazing discounts!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-4xl font-bold mb-2">10%</h4>
              <p className="text-lg">Discount per referral</p>
            </div>
            <div>
              <h4 className="text-4xl font-bold mb-2">FREE</h4>
              <p className="text-lg">Package after 10 referrals</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Packages;