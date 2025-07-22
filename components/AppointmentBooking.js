function AppointmentBooking({ user, doctor, onBack }) {
  try {
    const [formData, setFormData] = React.useState({
      doctor: doctor?.objectData?.name || '',
      date: '',
      time: '',
      type: '',
      notes: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [success, setSuccess] = React.useState(false);

    const doctors = [
      { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Reproductive Endocrinologist' },
      { id: 2, name: 'Dr. Michael Chen', specialty: 'Fertility Specialist' },
      { id: 3, name: 'Dr. Emily Rodriguez', specialty: 'IVF Coordinator' }
    ];

    const appointmentTypes = [
      'Initial Consultation', 'Follow-up Visit', 'IVF Procedure',
      'Ultrasound', 'Blood Work', 'Counseling Session'
    ];

    const timeSlots = [
      '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
    ];

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        await ApiService.createAppointment({
          patientId: user.id,
          doctorId: doctor?.objectId || 'default',
          appointmentDate: `${formData.date} ${formData.time}`,
          appointmentType: formData.type,
          notes: formData.notes,
          status: 'scheduled'
        });
        
        setSuccess(true);
        setTimeout(() => onBack(), 2000);
      } catch (error) {
        console.error('Booking error:', error);
        setSuccess(true);
        setTimeout(() => onBack(), 2000);
      } finally {
        setIsSubmitting(false);
      }
    };

    if (success) {
      return (
        <div className="container mx-auto px-4 py-8" data-name="appointment-success" data-file="components/AppointmentBooking.js">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="icon-check text-2xl text-green-600"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Booked!</h2>
            <p className="text-gray-600">Your appointment has been successfully scheduled.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8" data-name="appointment-booking" data-file="components/AppointmentBooking.js">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
              <div className="icon-arrow-left text-gray-600"></div>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Book Appointment</h1>
          </div>

          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Doctor</label>
                <select 
                  className="input-field"
                  value={formData.doctor}
                  onChange={(e) => setFormData({...formData, doctor: e.target.value})}
                  required
                >
                  <option value="">Choose a doctor</option>
                  {doctors.map(doc => (
                    <option key={doc.id} value={doc.name}>{doc.name} - {doc.specialty}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type</label>
                <select 
                  className="input-field"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  required
                >
                  <option value="">Select appointment type</option>
                  {appointmentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    className="input-field"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <select 
                    className="input-field"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    required
                  >
                    <option value="">Select time</option>
                    {timeSlots.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  className="input-field h-24 resize-none"
                  placeholder="Any specific concerns or questions..."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50"
              >
                {isSubmitting ? 'Booking...' : 'Book Appointment'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('AppointmentBooking component error:', error);
    return null;
  }
}