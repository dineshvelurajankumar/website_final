function PatientLogin({ onLogin }) {
  try {
    const [formData, setFormData] = React.useState({
      email: '',
      password: ''
    });
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError('');

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (formData.email && formData.password) {
          const user = {
            id: '1',
            name: formData.email.split('@')[0],
            email: formData.email,
            patientId: 'P001'
          };
          
          AuthUtils.login(user);
          onLogin(user);
        } else {
          setError('Please fill in all fields');
        }
      } catch (err) {
        setError('Login failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4" 
           data-name="patient-login" data-file="components/PatientLogin.js">
        <div className="card max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="icon-user text-2xl text-white"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Patient Login</h2>
            <p className="text-gray-600 mt-2">Access your fertility journey dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="input-field"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                className="input-field"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Demo: Use any email and password to login
            </p>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('PatientLogin component error:', error);
    return null;
  }
}