function DoctorProfile({ doctor, user, onBack, onViewChange }) {
  try {
    if (!doctor) {
      return (
        <div className="container mx-auto px-4 py-8">
          <p>Doctor not found</p>
        </div>
      );
    }

    const handleBookAppointment = () => {
      if (!user) {
        onViewChange('auth');
        return;
      }
      onViewChange('booking');
    };

    return (
      <div className="container mx-auto px-4 py-8" data-name="doctor-profile" data-file="components/DoctorProfile.js">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
            <div className="icon-arrow-left text-gray-600"></div>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Doctor Profile</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <div className="flex items-start space-x-6">
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="icon-user-doctor text-4xl text-blue-600"></div>
                </div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {doctor.objectData.name}
                  </h2>
                  <p className="text-blue-600 font-semibold text-lg mb-2">
                    {doctor.objectData.specialty}
                  </p>
                  <p className="text-gray-600 mb-4">
                    {doctor.objectData.qualifications}
                  </p>
                  
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center">
                      <div className="icon-star text-yellow-500 mr-1"></div>
                      <span className="font-semibold">{doctor.objectData.rating}</span>
                      <span className="text-gray-600 ml-1">(124 reviews)</span>
                    </div>
                    <div className="text-gray-600">
                      {doctor.objectData.experience}+ years experience
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-4">About</h3>
              <p className="text-gray-600 leading-relaxed">
                Dr. {doctor.objectData.name.split(' ').pop()} is a highly experienced {doctor.objectData.specialty.toLowerCase()} 
                with over {doctor.objectData.experience} years of experience in reproductive medicine. 
                Specializing in advanced fertility treatments, IVF procedures, and reproductive endocrinology, 
                Dr. {doctor.objectData.name.split(' ').pop()} has helped thousands of couples achieve their dream of parenthood.
              </p>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Specializations</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <div className="icon-check text-green-500 mr-2"></div>
                  <span className="text-sm">IVF Procedures</span>
                </div>
                <div className="flex items-center">
                  <div className="icon-check text-green-500 mr-2"></div>
                  <span className="text-sm">ICSI Treatment</span>
                </div>
                <div className="flex items-center">
                  <div className="icon-check text-green-500 mr-2"></div>
                  <span className="text-sm">Genetic Testing</span>
                </div>
                <div className="flex items-center">
                  <div className="icon-check text-green-500 mr-2"></div>
                  <span className="text-sm">Fertility Preservation</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Book Appointment</h3>
              <div className="text-center mb-4">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  ${doctor.objectData.consultationFee}
                </div>
                <p className="text-gray-600 text-sm">Consultation Fee</p>
              </div>
              <button
                onClick={handleBookAppointment}
                className="w-full btn-primary"
              >
                Book Appointment
              </button>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Availability</h3>
              <div className="space-y-2">
                {doctor.objectData.availability.map((day, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{day}</span>
                    <span className="text-sm text-green-600">Available</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('DoctorProfile component error:', error);
    return null;
  }
}
