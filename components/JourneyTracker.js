function JourneyTracker({ user, onBack }) {
  try {
    const [currentStep, setCurrentStep] = React.useState(2);
    const [journeyData, setJourneyData] = React.useState(null);

    const steps = [
      { id: 1, title: 'Initial Consultation', desc: 'Meet with fertility specialist', completed: true },
      { id: 2, title: 'Medical Testing', desc: 'Comprehensive fertility assessment', completed: true },
      { id: 3, title: 'Treatment Planning', desc: 'Personalized treatment strategy', active: true },
      { id: 4, title: 'Medication Protocol', desc: 'Hormone stimulation phase', completed: false },
      { id: 5, title: 'Monitoring', desc: 'Regular check-ups and adjustments', completed: false },
      { id: 6, title: 'Egg Retrieval', desc: 'Minimally invasive procedure', completed: false },
      { id: 7, title: 'Embryo Transfer', desc: 'Transfer healthy embryos', completed: false },
      { id: 8, title: 'Pregnancy Test', desc: 'Confirm treatment success', completed: false }
    ];

    React.useEffect(() => {
      loadJourneyData();
    }, []);

    const loadJourneyData = async () => {
      try {
        const data = await ApiService.getPatientJourney(user.id);
        setJourneyData(data);
      } catch (error) {
        console.error('Error loading journey data:', error);
        setJourneyData({
          startDate: '2024-01-01',
          estimatedCompletion: '2024-04-15',
          successRate: 65,
          currentCycle: 1
        });
      }
    };

    return (
      <div className="container mx-auto px-4 py-8" data-name="journey-tracker" data-file="components/JourneyTracker.js">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
            <div className="icon-arrow-left text-gray-600"></div>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Your IVF Journey</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <h2 className="text-xl font-semibold mb-6">Treatment Progress</h2>
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-start space-x-4">
                    <div className={`progress-step ${
                      step.completed ? 'step-completed' : 
                      step.active ? 'step-active' : 'step-pending'
                    }`}>
                      {step.completed ? (
                        <div className="icon-check text-sm"></div>
                      ) : (
                        <span>{step.id}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${
                        step.completed || step.active ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{step.desc}</p>
                      {step.active && (
                        <div className="mt-2">
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            In Progress
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Journey Overview</h3>
              {journeyData && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Started</p>
                    <p className="font-medium">{new Date(journeyData.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Estimated Completion</p>
                    <p className="font-medium">{new Date(journeyData.estimatedCompletion).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Success Rate</p>
                    <p className="font-medium text-green-600">{journeyData.successRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Current Cycle</p>
                    <p className="font-medium">{journeyData.currentCycle}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-900">Schedule Follow-up</p>
                  <p className="text-sm text-blue-700">Book your next appointment</p>
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <p className="font-medium text-yellow-900">Medication Review</p>
                  <p className="text-sm text-yellow-700">Discuss protocol adjustments</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <div className="space-y-2">
                <button className="w-full text-left p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                  <div className="text-sm font-medium">Treatment Guide</div>
                </button>
                <button className="w-full text-left p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                  <div className="text-sm font-medium">Support Groups</div>
                </button>
                <button className="w-full text-left p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
                  <div className="text-sm font-medium">Nutrition Tips</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('JourneyTracker component error:', error);
    return null;
  }
}