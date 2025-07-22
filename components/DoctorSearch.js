function DoctorSearch({ onSelectDoctor, onViewChange }) {
  try {
    const [doctors, setDoctors] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [filters, setFilters] = React.useState({
      specialty: '',
      location: '',
      experience: '',
      rating: ''
    });

    React.useEffect(() => {
      loadDoctors();
    }, []);

    const loadDoctors = async () => {
      try {
        setLoading(true);
        const response = await ApiService.getDoctors();
        if (Array.isArray(response)) {
          setDoctors(response);
        } else {
          setDoctors(ApiService.getFallbackDoctors());
        }
      } catch (error) {
        console.error('Error loading doctors:', error);
        setDoctors(ApiService.getFallbackDoctors());
      } finally {
        setLoading(false);
      }
    };

    const handleDoctorSelect = (doctor) => {
      onSelectDoctor(doctor);
      onViewChange('doctor-profile');
    };

    const specialties = [
      'Reproductive Endocrinologist',
      'Fertility Specialist',
      'IVF Coordinator',
      'Andrologist',
      'Genetic Counselor'
    ];

    if (loading) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading doctors...</p>
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8" data-name="doctor-search" data-file="components/DoctorSearch.js">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find the Right Doctor</h1>
          <p className="text-gray-600">Connect with top fertility specialists in your area</p>
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <select 
              className="input-field"
              value={filters.specialty}
              onChange={(e) => setFilters({...filters, specialty: e.target.value})}
            >
              <option value="">All Specialties</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
            
            <input
              type="text"
              className="input-field"
              placeholder="Location"
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
            />
            
            <select 
              className="input-field"
              value={filters.experience}
              onChange={(e) => setFilters({...filters, experience: e.target.value})}
            >
              <option value="">Experience</option>
              <option value="5+">5+ years</option>
              <option value="10+">10+ years</option>
              <option value="15+">15+ years</option>
            </select>
            
            <select 
              className="input-field"
              value={filters.rating}
              onChange={(e) => setFilters({...filters, rating: e.target.value})}
            >
              <option value="">Rating</option>
              <option value="4+">4+ stars</option>
              <option value="4.5+">4.5+ stars</option>
            </select>
          </div>
        </div>

        {/* Doctor List */}
        <div className="grid lg:grid-cols-2 gap-6">
          {Array.isArray(doctors) && doctors.map(doctor => (
            <div key={doctor.objectId} className="card hover:shadow-lg transition-shadow cursor-pointer"
                 onClick={() => handleDoctorSelect(doctor)}>
              <div className="flex items-start space-x-4">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="icon-user-doctor text-2xl text-blue-600"></div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {doctor.objectData.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-2">
                    {doctor.objectData.specialty}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    {doctor.objectData.qualifications}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <div className="icon-star text-yellow-500 mr-1"></div>
                        <span className="text-sm font-medium">{doctor.objectData.rating}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {doctor.objectData.experience}+ years
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-green-600">
                        ${doctor.objectData.consultationFee}
                      </div>
                      <div className="text-sm text-gray-600">Consultation</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('DoctorSearch component error:', error);
    return null;
  }
}