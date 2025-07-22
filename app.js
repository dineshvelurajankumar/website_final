class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">We're sorry, but something unexpected happened.</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  try {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [currentView, setCurrentView] = React.useState('home');
    const [selectedDoctor, setSelectedDoctor] = React.useState(null);

    React.useEffect(() => {
      const user = AuthUtils.getCurrentUser();
      if (user) {
        setCurrentUser(user);
        setCurrentView('dashboard');
      }
    }, []);

    const handleLogin = (user) => {
      setCurrentUser(user);
      setCurrentView('dashboard');
    };

    const handleLogout = () => {
      AuthUtils.logout();
      setCurrentUser(null);
      setCurrentView('home');
    };

    const renderContent = () => {
      switch (currentView) {
        case 'auth':
          return <PatientAuth onLogin={handleLogin} onBack={() => setCurrentView('home')} />;
        case 'dashboard':
          return <PatientDashboard user={currentUser} onViewChange={setCurrentView} />;
        case 'doctors':
          return <DoctorSearch onSelectDoctor={setSelectedDoctor} onViewChange={setCurrentView} />;
        case 'doctor-profile':
          return <DoctorProfile doctor={selectedDoctor} user={currentUser} onBack={() => setCurrentView('doctors')} onViewChange={setCurrentView} />;
        case 'journey':
          return <JourneyTracker user={currentUser} onBack={() => setCurrentView('dashboard')} />;
        case 'booking':
          return <EnhancedAppointmentBooking user={currentUser} doctor={selectedDoctor} onBack={() => setCurrentView('dashboard')} />;
        case 'tools':
          return <FertilityTools user={currentUser} onBack={() => setCurrentView('dashboard')} />;
        case 'records':
          return <MedicalRecords user={currentUser} onBack={() => setCurrentView('dashboard')} />;
        case 'planner':
          return <TreatmentPlanner user={currentUser} onBack={() => setCurrentView('dashboard')} />;
        case 'messaging':
          return <PatientMessaging user={currentUser} onBack={() => setCurrentView('dashboard')} />;
        case 'education':
          return <EducationHub user={currentUser} onBack={() => setCurrentView('dashboard')} />;
        case 'calendar':
          return <CalendarScheduler user={currentUser} onBack={() => setCurrentView('dashboard')} />;
        case 'video-consultation':
          return <VideoConsultation user={currentUser} onBack={() => setCurrentView('dashboard')} />;
        case 'progress':
          return <ProgressDashboard user={currentUser} onBack={() => setCurrentView('dashboard')} />;
        case 'community':
          return <CommunityForum user={currentUser} onBack={() => setCurrentView('dashboard')} />;
        case 'documents':
          return <DocumentUpload user={currentUser} onBack={() => setCurrentView('dashboard')} />;
        case 'medications':
          return <MedicationTracker user={currentUser} onBack={() => setCurrentView('dashboard')} />;
        default:
          return <Homepage onViewChange={setCurrentView} />;
      }
    };

    return (
      <div className="min-h-screen bg-gray-50" data-name="app" data-file="app.js">
        <Header 
          user={currentUser} 
          onLogin={() => setCurrentView('auth')}
          onLogout={handleLogout}
          onNavigate={setCurrentView}
        />
        {renderContent()}
      </div>
    );
  } catch (error) {
    console.error('App component error:', error);
    return null;
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);