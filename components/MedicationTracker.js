function MedicationTracker({ user, onBack }) {
  try {
    const [medications, setMedications] = React.useState([
      { id: 1, name: 'Gonal-F', dosage: '150 IU', frequency: 'Daily', time: '8:00 PM', taken: true, nextDue: '8:00 PM' },
      { id: 2, name: 'Prenatal Vitamins', dosage: '1 tablet', frequency: 'Daily', time: '8:00 AM', taken: false, nextDue: 'Tomorrow 8:00 AM' }
    ]);
    const [sideEffects, setSideEffects] = React.useState([]);
    const [newMedication, setNewMedication] = React.useState({ name: '', dosage: '', frequency: '', time: '' });
    const [showAddForm, setShowAddForm] = React.useState(false);

    const markAsTaken = (id) => {
      setMedications(prev => prev.map(med => 
        med.id === id ? { ...med, taken: true } : med
      ));
    };

    const logSideEffect = async () => {
      const effect = prompt('Describe any side effects:');
      if (effect) {
        const newEffect = {
          id: Date.now(),
          medication: 'Gonal-F',
          description: effect,
          severity: 'Mild',
          date: new Date().toLocaleDateString()
        };
        setSideEffects(prev => [newEffect, ...prev]);
      }
    };

    const addMedication = () => {
      if (!newMedication.name.trim()) return;
      
      const medication = {
        id: Date.now(),
        ...newMedication,
        taken: false,
        nextDue: `Today ${newMedication.time}`
      };
      
      setMedications(prev => [medication, ...prev]);
      setNewMedication({ name: '', dosage: '', frequency: '', time: '' });
      setShowAddForm(false);
    };

    const frequencies = ['Daily', 'Twice Daily', 'Weekly', 'As Needed'];

    return (
      <div className="container mx-auto px-4 py-8" data-name="medication-tracker" data-file="components/MedicationTracker.js">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
            <div className="icon-arrow-left text-gray-600"></div>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Medication Tracker</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Current Medications</h2>
                <button 
                  onClick={() => setShowAddForm(true)}
                  className="btn-primary"
                >
                  <div className="icon-plus mr-2 inline"></div>
                  Add Medication
                </button>
              </div>

              {showAddForm && (
                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-3">Add New Medication</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Medication name"
                      value={newMedication.name}
                      onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                    />
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Dosage"
                      value={newMedication.dosage}
                      onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                    />
                    <select
                      className="input-field"
                      value={newMedication.frequency}
                      onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})}
                    >
                      <option value="">Select frequency</option>
                      {frequencies.map(freq => (
                        <option key={freq} value={freq}>{freq}</option>
                      ))}
                    </select>
                    <input
                      type="time"
                      className="input-field"
                      value={newMedication.time}
                      onChange={(e) => setNewMedication({...newMedication, time: e.target.value})}
                    />
                  </div>
                  <div className="flex space-x-2 mt-3">
                    <button onClick={addMedication} className="btn-primary">Add</button>
                    <button onClick={() => setShowAddForm(false)} className="btn-secondary">Cancel</button>
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {medications.map(med => (
                  <div key={med.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        med.taken ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        <div className={`icon-pill ${med.taken ? 'text-green-600' : 'text-blue-600'}`}></div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{med.name}</h3>
                        <p className="text-sm text-gray-600">{med.dosage} • {med.frequency}</p>
                        <p className="text-xs text-gray-500">Next due: {med.nextDue}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!med.taken && (
                        <button 
                          onClick={() => markAsTaken(med.id)}
                          className="btn-success text-sm"
                        >
                          Mark Taken
                        </button>
                      )}
                      {med.taken && (
                        <span className="text-sm text-green-600 font-medium">✓ Taken</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {sideEffects.length > 0 && (
              <div className="card">
                <h2 className="text-xl font-semibold mb-4">Side Effects Log</h2>
                <div className="space-y-3">
                  {sideEffects.map(effect => (
                    <div key={effect.id} className="p-3 bg-yellow-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{effect.medication}</h3>
                          <p className="text-sm text-gray-600">{effect.description}</p>
                        </div>
                        <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                          {effect.severity}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{effect.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="card">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button 
                  onClick={logSideEffect}
                  className="w-full text-left p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100"
                >
                  <div className="font-medium text-yellow-900">Log Side Effect</div>
                  <div className="text-sm text-yellow-700">Report any reactions</div>
                </button>
                <button className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100">
                  <div className="font-medium text-blue-900">Set Reminder</div>
                  <div className="text-sm text-blue-700">Custom notification time</div>
                </button>
                <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100">
                  <div className="font-medium text-green-900">Refill Request</div>
                  <div className="text-sm text-green-700">Order more medication</div>
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold mb-4">Adherence Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="font-medium">95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{width: '92%'}}></div>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold mb-4">Upcoming Doses</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-sm font-medium">Gonal-F</span>
                  <span className="text-xs text-blue-600">8:00 PM</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                  <span className="text-sm font-medium">Prenatal Vitamins</span>
                  <span className="text-xs text-green-600">8:00 AM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('MedicationTracker component error:', error);
    return null;
  }
}
