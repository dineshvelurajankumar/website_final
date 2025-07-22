function Header({ user, onLogin, onLogout, onNavigate }) {
  try {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
      <header className="bg-white shadow-sm border-b sticky top-0 z-50" data-name="header" data-file="components/Header.js">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <div className="icon-heart text-white text-lg"></div>
              </div>
              <span className="text-xl font-bold text-gray-900">IVF Care</span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <button 
                onClick={() => onNavigate('doctors')}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Find Doctors
              </button>
              
              {user ? (
                <>
                  <button 
                    onClick={() => onNavigate('dashboard')}
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                  >
                    Dashboard
                  </button>
                  <button 
                    onClick={() => onNavigate('journey')}
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                  >
                    My Journey
                  </button>
                  <button 
                    onClick={() => onNavigate('tools')}
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                  >
                    Fertility Tools
                  </button>
                  <button 
                    onClick={() => onNavigate('messaging')}
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                  >
                    Messages
                  </button>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600">Hi, {user.name}</span>
                    <button onClick={onLogout} className="btn-secondary text-sm">
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <button onClick={onLogin} className="btn-secondary">
                    Sign In
                  </button>
                  <button onClick={onLogin} className="btn-primary">
                    Get Started
                  </button>
                </div>
              )}
            </nav>

            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className={`icon-${isMenuOpen ? 'x' : 'menu'} text-gray-600`}></div>
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="space-y-3">
                <button 
                  onClick={() => { onNavigate('doctors'); setIsMenuOpen(false); }}
                  className="block w-full text-left text-gray-600 hover:text-blue-600 font-medium"
                >
                  Find Doctors
                </button>
                {user ? (
                  <>
                    <button 
                      onClick={() => { onNavigate('dashboard'); setIsMenuOpen(false); }}
                      className="block w-full text-left text-gray-600 hover:text-blue-600 font-medium"
                    >
                      Dashboard
                    </button>
                    <button 
                      onClick={() => { onNavigate('journey'); setIsMenuOpen(false); }}
                      className="block w-full text-left text-gray-600 hover:text-blue-600 font-medium"
                    >
                      My Journey
                    </button>
                    <button onClick={onLogout} className="block w-full text-left text-red-600 font-medium">
                      Logout
                    </button>
                  </>
                ) : (
                  <button onClick={onLogin} className="block w-full text-left text-blue-600 font-medium">
                    Sign In
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}