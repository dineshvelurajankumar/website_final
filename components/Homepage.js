function Homepage({ onViewChange }) {
  try {
    const features = [
      {
        icon: 'user-doctor',
        title: 'Expert Doctors',
        description: 'Connect with top fertility specialists and reproductive endocrinologists'
      },
      {
        icon: 'route',
        title: 'Journey Tracking',
        description: 'Track your complete IVF journey with personalized milestones and guidance'
      },
      {
        icon: 'calendar-check',
        title: 'Easy Booking',
        description: 'Book appointments instantly with real-time availability'
      },
      {
        icon: 'chart-bar',
        title: 'Fertility Tools',
        description: 'Access calculators, trackers, and educational resources'
      },
      {
        icon: 'shield-check',
        title: 'Secure Records',
        description: 'Keep all your medical records safe and easily accessible'
      },
      {
        icon: 'heart-handshake',
        title: 'Support Community',
        description: 'Connect with other couples on similar journeys for support'
      }
    ];

    const stats = [
      { number: '10,000+', label: 'Happy Families' },
      { number: '500+', label: 'Expert Doctors' },
      { number: '85%', label: 'Success Rate' },
      { number: '24/7', label: 'Support' }
    ];

    return (
      <div className="min-h-screen" data-name="homepage" data-file="components/Homepage.js">
        {/* Hero Section */}
        <section className="gradient-primary py-20">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your Journey to Parenthood Starts Here
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Comprehensive IVF care with expert doctors, personalized tracking, and support every step of the way
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => onViewChange('auth')}
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Start Your Journey
              </button>
              <button 
                onClick={() => onViewChange('doctors')}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Find Doctors
              </button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="p-6">
                  <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything You Need for Your Fertility Journey
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                From expert consultations to journey tracking, we provide comprehensive support
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="card text-center hover:transform hover:scale-105 transition-all">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className={`icon-${feature.icon} text-2xl text-blue-600`}></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Begin Your Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of couples who have found success with our platform
            </p>
            <button 
              onClick={() => onViewChange('auth')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </button>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Homepage component error:', error);
    return null;
  }
}