function CalendarScheduler({ user, onBack }) {
  try {
    const [currentDate, setCurrentDate] = React.useState(new Date());
    const [appointments, setAppointments] = React.useState([
      { id: 1, date: '2024-01-15', time: '10:00 AM', type: 'Consultation', doctor: 'Dr. Johnson' },
      { id: 2, date: '2024-01-22', time: '2:30 PM', type: 'Ultrasound', doctor: 'Dr. Chen' }
    ]);
    const [reminders, setReminders] = React.useState([
      { id: 1, date: '2024-01-14', time: '8:00 PM', task: 'Take Gonal-F injection', type: 'medication' },
      { id: 2, date: '2024-01-16', time: '9:00 AM', task: 'Blood work appointment', type: 'appointment' }
    ]);

    const getDaysInMonth = (date) => {
      const year = date.getFullYear();
      const month = date.getMonth();
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startDate = firstDay.getDay();
      
      const days = [];
      for (let i = 0; i < startDate; i++) {
        days.push(null);
      }
      for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
      }
      return days;
    };

    const getEventsForDate = (day) => {
      if (!day) return [];
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayAppointments = appointments.filter(apt => apt.date === dateStr);
      const dayReminders = reminders.filter(rem => rem.date === dateStr);
      return [...dayAppointments, ...dayReminders];
    };

    const addReminder = async () => {
      try {
        const reminderText = prompt('Enter reminder text:');
        if (!reminderText) return;
        
        const newReminder = {
          id: Date.now(),
          date: currentDate.toISOString().split('T')[0],
          time: '9:00 AM',
          task: reminderText,
          type: 'custom'
        };
        
        setReminders(prev => [...prev, newReminder]);
      } catch (error) {
        console.error('Add reminder error:', error);
      }
    };

    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];

    return (
      <div className="container mx-auto px-4 py-8" data-name="calendar-scheduler" data-file="components/CalendarScheduler.js">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
            <div className="icon-arrow-left text-gray-600"></div>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Calendar & Reminders</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <div className="icon-chevron-left"></div>
                </button>
                <button 
                  onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
                  className="p-2 hover:bg-gray-100 rounded"
                >
                  <div className="icon-chevron-right"></div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 text-center font-medium text-gray-600 text-sm">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {getDaysInMonth(currentDate).map((day, index) => {
                const events = getEventsForDate(day);
                return (
                  <div key={index} className="min-h-20 p-1 border border-gray-100 hover:bg-gray-50">
                    {day && (
                      <>
                        <div className="font-medium text-sm">{day}</div>
                        <div className="space-y-1">
                          {events.slice(0, 2).map((event, i) => (
                            <div key={i} className={`text-xs p-1 rounded ${
                              event.type === 'medication' ? 'bg-blue-100 text-blue-700' :
                              event.type === 'appointment' ? 'bg-green-100 text-green-700' :
                              'bg-purple-100 text-purple-700'
                            }`}>
                              {event.task || event.type}
                            </div>
                          ))}
                          {events.length > 2 && (
                            <div className="text-xs text-gray-500">+{events.length - 2} more</div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Quick Actions</h3>
                <button onClick={addReminder} className="btn-primary text-sm">
                  Add Reminder
                </button>
              </div>
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium">Schedule Appointment</div>
                  <div className="text-sm text-gray-600">Book with your doctor</div>
                </button>
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium">Set Medication Alert</div>
                  <div className="text-sm text-gray-600">Never miss a dose</div>
                </button>
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium">Export Calendar</div>
                  <div className="text-sm text-gray-600">Sync with your phone</div>
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold mb-4">Upcoming Events</h3>
              <div className="space-y-3">
                {appointments.slice(0, 3).map(apt => (
                  <div key={apt.id} className="p-3 bg-green-50 rounded-lg">
                    <div className="font-medium text-green-900">{apt.type}</div>
                    <div className="text-sm text-green-700">{apt.doctor}</div>
                    <div className="text-xs text-green-600">{apt.date} at {apt.time}</div>
                  </div>
                ))}
                {reminders.slice(0, 2).map(rem => (
                  <div key={rem.id} className="p-3 bg-blue-50 rounded-lg">
                    <div className="font-medium text-blue-900">{rem.task}</div>
                    <div className="text-xs text-blue-600">{rem.date} at {rem.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('CalendarScheduler component error:', error);
    return null;
  }
}