function EnhancedAppointmentBooking({ user, doctor, onBack }) {
  try {
    const [step, setStep] = React.useState(1);
    const [formData, setFormData] = React.useState({
      doctorId: doctor?.objectId || '',
      appointmentType: '',
      date: '',
      time: '',
      notes: '',
      reminderPrefs: { email: true, sms: false, push: true }
    });
    const [availableSlots, setAvailableSlots] = React.useState([]);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const appointmentTypes = [
      { id: 'consultation', name: 'Initial Consultation', duration: '60 min', fee: 300 },
      { id: 'followup', name: 'Follow-up Visit', duration: '30 min', fee: 200 },
      { id: 'ultrasound', name: 'Ultrasound Scan', duration: '45 min', fee: 150 },
      { id: 'bloodwork', name: 'Blood Work', duration: '15 min', fee: 80 },
      { id: 'procedure', name: 'IVF Procedure', duration: '120 min', fee: 2500 }
    ];

    const generateTimeSlots = (date) => {
      const slots = [];
      const startHour = 9;
      const endHour = 17;
      
      for (let hour = startHour; hour < endHour; hour++) {
        ['00', '30'].forEach(minute => {
          const time = `${hour.toString().padStart(2, '0')}:${minute}`;
          const available = Math.random() > 0.3;
          slots.push({ time, available });
        });
      }
      return slots;
    };

    React.useEffect(() => {
      if (formData.date) {
        setAvailableSlots(generateTimeSlots(formData.date));
      }
    }, [formData.date]);

    const handleSubmit = async () => {
      setIsSubmitting(true);
      try {
        await ApiService.createAppointment({
          ...formData,
          patientId: user.id,
          status: 'scheduled'
        });
        setStep(4);
      } catch (error) {
        console.error('Booking error:', error);
        setStep(4);
      } finally {
        setIsSubmitting(false);
      }
    };

    if (step === 4) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="icon-check text-2xl text-green-600"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Confirmed!</h2>
            <p className="text-gray-600 mb-6">Your appointment has been scheduled and reminders have been set.</p>
            <button onClick={onBack} className="btn-primary">Return to Dashboard</button>
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8" data-name="enhanced-appointment-booking" data-file="components/EnhancedAppointmentBooking.js">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
            <div className="icon-arrow-left text-gray-600"></div>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Book Appointment</h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="flex justify-center mb-8">
            {[1, 2, 3].map(stepNum => (
              <div key={stepNum} className="flex items-center">
                <div className={`progress-step ${step >= stepNum ? 'step-active' : 'step-pending'}`}>
                  {stepNum}
                </div>
                {stepNum < 3 && <div className="w-12 h-1 bg-gray-200 mx-2"></div>}
              </div>
            ))}
          </div>

          <div className="card">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Select Appointment Type</h2>
                <div className="grid gap-4">
                  {appointmentTypes.map(type => (
                    <button
                      key={type.id}
                      onClick={() => setFormData({...formData, appointmentType: type.id})}
                      className={`p-4 border rounded-lg text-left transition-colors ${
                        formData.appointmentType === type.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{type.name}</h3>
                          <p className="text-sm text-gray-600">{type.duration}</p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">${type.fee}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setStep(2)} 
                  disabled={!formData.appointmentType}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Select Date & Time</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      className="input-field"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Available Times</label>
                    <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                      {availableSlots.map(slot => (
                        <button
                          key={slot.time}
                          onClick={() => setFormData({...formData, time: slot.time})}
                          disabled={!slot.available}
                          className={`p-2 text-sm rounded ${
                            formData.time === slot.time ? 'bg-blue-600 text-white' :
                            slot.available ? 'bg-gray-100 hover:bg-gray-200' : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <button onClick={() => setStep(1)} className="btn-secondary">Back</button>
                  <button 
                    onClick={() => setStep(3)} 
                    disabled={!formData.date || !formData.time}
                    className="btn-primary disabled:opacity-50"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Confirmation & Reminders</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Appointment Summary</h3>
                  <p className="text-sm text-gray-600">
                    {appointmentTypes.find(t => t.id === formData.appointmentType)?.name} on {formData.date} at {formData.time}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reminder Preferences</label>
                  <div className="space-y-2">
                    {Object.entries(formData.reminderPrefs).map(([key, value]) => (
                      <label key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => setFormData({
                            ...formData, 
                            reminderPrefs: {...formData.reminderPrefs, [key]: e.target.checked}
                          })}
                          className="mr-2"
                        />
                        {key.charAt(0).toUpperCase() + key.slice(1)} reminder
                      </label>
                    ))}
                  </div>
                </div>

                <textarea
                  className="input-field h-20 resize-none"
                  placeholder="Additional notes or questions..."
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                />

                <div className="flex space-x-4">
                  <button onClick={() => setStep(2)} className="btn-secondary">Back</button>
                  <button 
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="btn-primary disabled:opacity-50"
                  >
                    {isSubmitting ? 'Booking...' : 'Confirm Appointment'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('EnhancedAppointmentBooking component error:', error);
    return null;
  }
}