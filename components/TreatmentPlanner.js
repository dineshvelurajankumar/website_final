function TreatmentPlanner({ user, onBack }) {
  try {
    const [schedule, setSchedule] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      loadTreatmentSchedule();
    }, []);

    const loadTreatmentSchedule = async () => {
      try {
        const data = await ApiService.getTreatmentPlan(user.id);
        setSchedule(data);
      } catch (error) {
        console.error('Error loading treatment plan:', error);
        setSchedule([
          { id: 1, date: '2024-01-20', task: 'Start medication protocol', status: 'upcoming' },
          { id: 2, date: '2024-01-25', task: 'First monitoring appointment', status: 'upcoming' },
          { id: 3, date: '2024-02-01', task: 'Egg retrieval procedure', status: 'pending' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="container mx-auto px-4 py-8" data-name="treatment-planner" data-file="components/TreatmentPlanner.js">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
            <div className="icon-arrow-left text-gray-600"></div>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Treatment Planner</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-semibold mb-6">Treatment Schedule</h2>
              
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p>Loading schedule...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {schedule.map(item => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className={`w-4 h-4 rounded-full ${
                        item.status === 'completed' ? 'bg-green-500' :
                        item.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-300'
                      }`}></div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.task}</h3>
                        <p className="text-sm text-gray-600">{item.date}</p>
                      </div>
                      <span className={`text-sm px-2 py-1 rounded ${
                        item.status === 'completed' ? 'bg-green-100 text-green-800' :
                        item.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium">Set Reminder</div>
                  <div className="text-sm text-gray-600">Get notifications for tasks</div>
                </button>
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium">Download Schedule</div>
                  <div className="text-sm text-gray-600">Export to calendar</div>
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Medication Tracker</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="font-medium text-blue-900">Gonal-F</div>
                  <div className="text-sm text-blue-700">Take at 8:00 PM daily</div>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="font-medium text-green-900">Prenatal Vitamins</div>
                  <div className="text-sm text-green-700">Take with breakfast</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('TreatmentPlanner component error:', error);
    return null;
  }
}