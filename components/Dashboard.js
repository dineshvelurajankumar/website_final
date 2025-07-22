function Dashboard({ user, onViewChange }) {
  try {
    const [appointments, setAppointments] = React.useState([
      { id: 1, date: '2024-01-15', time: '10:00 AM', doctor: 'Dr. Sarah Johnson', type: 'Consultation' },
      { id: 2, date: '2024-01-22', time: '2:30 PM', doctor: 'Dr. Michael Chen', type: 'Follow-up' }
    ]);

    return (
      <div className="container mx-auto px-4 py-8" data-name="dashboard" data-file="components/Dashboard.js">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">Patient ID: {user?.patientId}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <button 
                  onClick={() => onViewChange('booking')}
                  className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-left"
                >
                  <div className="icon-calendar text-2xl text-blue-600 mb-2"></div>
                  <h3 className="font-medium text-gray-900">Book Appointment</h3>
                  <p className="text-sm text-gray-600">Schedule with specialists</p>
                </button>
                
                <button 
                  onClick={() => onViewChange('calculator')}
                  className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors text-left"
                >
                  <div className="icon-calculator text-2xl text-green-600 mb-2"></div>
                  <h3 className="font-medium text-gray-900">IVF Calculator</h3>
                  <p className="text-sm text-gray-600">Estimate success rates</p>
                </button>
                
                <button 
                  onClick={() => onViewChange('chatbot')}
                  className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left"
                >
                  <div className="icon-message-circle text-2xl text-purple-600 mb-2"></div>
                  <h3 className="font-medium text-gray-900">AI Assistant</h3>
                  <p className="text-sm text-gray-600">Get instant answers</p>
                </button>
                
                <button className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors text-left">
                  <div className="icon-file-text text-2xl text-orange-600 mb-2"></div>
                  <h3 className="font-medium text-gray-900">Medical Records</h3>
                  <p className="text-sm text-gray-600">View your history</p>
                </button>
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map(appointment => (
                    <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
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
                <p className="text-gray-500 text-center py-8">No upcoming appointments</p>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Treatment Progress</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Initial Consultation</span>
                  <div className="icon-check text-green-600"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Medical Tests</span>
                  <div className="icon-check text-green-600"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Treatment Plan</span>
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">IVF Procedure</span>
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Support</h2>
              <div className="space-y-3">
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
    console.error('Dashboard component error:', error);
    return null;
  }
}