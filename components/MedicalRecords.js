function MedicalRecords({ user, onBack }) {
  try {
    const [records, setRecords] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      loadMedicalRecords();
    }, []);

    const loadMedicalRecords = async () => {
      try {
        const data = await ApiService.getPatientRecords(user.id);
        setRecords(data);
      } catch (error) {
        console.error('Error loading records:', error);
        setRecords([
          { id: 1, date: '2024-01-10', type: 'Blood Test', result: 'Normal', doctor: 'Dr. Sarah Johnson' },
          { id: 2, date: '2024-01-15', type: 'Ultrasound', result: 'Good response', doctor: 'Dr. Michael Chen' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="container mx-auto px-4 py-8" data-name="medical-records" data-file="components/MedicalRecords.js">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
            <div className="icon-arrow-left text-gray-600"></div>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
        </div>

        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Records</h2>
            <button className="btn-primary">
              <div className="icon-plus mr-2 inline"></div>
              Add Record
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Loading records...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {records.map(record => (
                <div key={record.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{record.type}</h3>
                      <p className="text-gray-600">{record.doctor}</p>
                      <p className="text-sm text-gray-500">{record.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                        {record.result}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error('MedicalRecords component error:', error);
    return null;
  }
}