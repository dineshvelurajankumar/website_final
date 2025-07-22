function PatientAuth({ onLogin, onBack }) {
  try {
    const [isLogin, setIsLogin] = React.useState(true);
    const [formData, setFormData] = React.useState({
      email: '',
      password: '',
      name: '',
      phone: '',
      confirmPassword: ''
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError('');

      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (isLogin) {
          if (formData.email && formData.password) {
            const user = {
              id: '1',
              name: formData.name || formData.email.split('@')[0],
              email: formData.email,
              patientId: 'P001',
              currentStage: 'consultation'
            };
            
            AuthUtils.login(user);
            onLogin(user);
          } else {
            setError('Please fill in all fields');
          }
        } else {
          if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
          }
          
          const user = {
            id: Date.now().toString(),
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            patientId: 'P' + Math.floor(Math.random() * 1000),
            currentStage: 'consultation'
          };
          
          AuthUtils.login(user);
          onLogin(user);
        }
      } catch (err) {
        setError('Authentication failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4" 
           data-name="patient-auth" data-file="components/PatientAuth.js">
        <div className="card max-w-md w-full">
          <div className="flex items-center mb-6">
            <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
              <div className="icon-arrow-left text-gray-600"></div>
            </button>
            <h1 className="text-2xl font-bold text-gray-900">{isLogin ? 'Sign In' : 'Sign Up'}</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <input
                type="text"
                className="input-field"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            )}

            <input
              type="email"
              className="input-field"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />

            {!isLogin && (
              <input
                type="tel"
                className="input-field"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            )}

            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />

            {!isLogin && (
              <input
                type="password"
                className="input-field"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            )}

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {isLoading ? (isLogin ? 'Signing In...' : 'Creating Account...') : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('PatientAuth component error:', error);
    return null;
  }
}