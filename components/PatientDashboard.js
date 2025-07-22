function PatientDashboard({ user, onViewChange }) {
  try {
    const [appointments, setAppointments] = React.useState([]);
    const [stats, setStats] = React.useState({
      totalAppointments: 5,
      completedSteps: 3,
      nextAppointment: 'Jan 15, 2024',
      currentCycle: 1
    });

    React.useEffect(() => {
      loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
      try {
        const appointmentData = await ApiService.getPatientAppointments(user.id);
        setAppointments(appointmentData);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setAppointments([
          { id: 1, date: '2024-01-15', time: '10:00 AM', doctor: 'Dr. Sarah Johnson', type: 'Consultation' },
          { id: 2, date: '2024-01-22', time: '2:30 PM', doctor: 'Dr. Michael Chen', type: 'Follow-up' }
        ]);
      }
    };

    const quickActions = [
      { icon: 'calendar', title: 'Book Appointment', desc: 'Schedule with specialists', action: () => onViewChange('booking') },
      { icon: 'video', title: 'Video Consultation', desc: 'Start virtual meeting', action: () => onViewChange('video-consultation') },
      { icon: 'trending-up', title: 'Progress Tracking', desc: 'View detailed metrics', action: () => onViewChange('progress') },
      { icon: 'users', title: 'Community Forum', desc: 'Connect with others', action: () => onViewChange('community') },
      { icon: 'route', title: 'Track Journey', desc: 'View your progress', action: () => onViewChange('journey') },
      { icon: 'calculator', title: 'Fertility Tools', desc: 'Access calculators', action: () => onViewChange('tools') },
      { icon: 'message-circle', title: 'Messages', desc: 'Chat with doctors', action: () => onViewChange('messaging') },
      { icon: 'book-open', title: 'Education Hub', desc: 'Learn about IVF', action: () => onViewChange('education') },
      { icon: 'upload', title: 'Documents', desc: 'Upload medical files', action: () => onViewChange('documents') },
      { icon: 'pill', title: 'Medications', desc: 'Track your medications', action: () => onViewChange('medications') }
    ];

    return (
      <div className="container mx-auto px-4 py-8" data-name="patient-dashboard" data-file="components/PatientDashboard.js">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">Patient ID: {user?.patientId}</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="stat-card gradient-primary">
            <div className="icon-calendar text-2xl mb-2"></div>
            <div className="text-2xl font-bold">{stats.totalAppointments}</div>
            <div className="text-sm opacity-90">Total Appointments</div>
          </div>
          <div className="stat-card gradient-success">
            <div className="icon-check-circle text-2xl mb-2"></div>
            <div className="text-2xl font-bold">{stats.completedSteps}</div>
            <div className="text-sm opacity-90">Completed Steps</div>
          </div>
          <div className="stat-card gradient-warning">
            <div className="icon-clock text-2xl mb-2"></div>
            <div className="text-lg font-bold">{stats.nextAppointment}</div>
            <div className="text-sm opacity-90">Next Appointment</div>
          </div>
          <div className="stat-card gradient-info">
            <div className="icon-activity text-2xl mb-2"></div>
            <div className="text-2xl font-bold">{stats.currentCycle}</div>
            <div className="text-sm opacity-90">Current Cycle</div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <button 
                    key={index}
                    onClick={action.action}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                  >
                    <div className={`icon-${action.icon} text-2xl text-blue-600 mb-2`}></div>
                    <h3 className="font-medium text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>
              {appointments.length > 0 ? (
                <div className="space-y-3">
                  {appointments.map(appointment => (
                    <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{appointment.type}</h3>
                        <p className="text-sm text-gray-600">{appointment.doctor}</p>
                        <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                      </div>
                      <div className="icon-chevron-right text-gray-400"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-6">No appointments found</p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Treatment Progress</h2>
              <div className="space-y-3">
                {['Initial Consultation', 'Medical Tests', 'Treatment Plan', 'IVF Procedure'].map((step, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{step}</span>
                    <div className={`icon-${index < 3 ? 'check' : 'clock'} ${index < 3 ? 'text-green-600' : 'text-gray-400'}`}></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Support</h2>
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <div className="icon-phone text-blue-600 mr-3"></div>
                    <span className="text-sm">Emergency Contact</span>
                  </div>
                </button>
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <div className="icon-help-circle text-blue-600 mr-3"></div>
                    <span className="text-sm">FAQ & Resources</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('PatientDashboard component error:', error);
    return null;
  }
}