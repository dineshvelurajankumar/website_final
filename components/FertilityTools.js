function FertilityTools({ user, onBack }) {
  try {
    const [activeTab, setActiveTab] = React.useState('calculator');
    const [calculatorData, setCalculatorData] = React.useState({
      age: '',
      amh: '',
      bmi: '',
      cycles: ''
    });
    const [results, setResults] = React.useState(null);

    const tools = [
      { id: 'calculator', name: 'IVF Calculator', icon: 'calculator' },
      { id: 'tracker', name: 'Cycle Tracker', icon: 'calendar' },
      { id: 'nutrition', name: 'Nutrition Guide', icon: 'apple' },
      { id: 'exercises', name: 'Exercise Guide', icon: 'activity' }
    ];

    const calculateSuccess = async () => {
      try {
        const age = parseInt(calculatorData.age);
        let baseRate = 50;
        
        if (age < 30) baseRate = 65;
        else if (age < 35) baseRate = 55;
        else if (age < 40) baseRate = 40;
        else if (age < 42) baseRate = 25;
        else baseRate = 15;
        
        setResults({
          successRate: baseRate,
          cycles: Math.ceil(100 / baseRate),
          livebirthRate: Math.round(baseRate * 0.8)
        });
      } catch (error) {
        console.error('Calculator error:', error);
      }
    };

    return (
      <div className="container mx-auto px-4 py-8" data-name="fertility-tools" data-file="components/FertilityTools.js">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
            <div className="icon-arrow-left text-gray-600"></div>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Fertility Tools</h1>
        </div>

        <div className="card mb-6">
          <div className="flex space-x-4 border-b">
            {tools.map(tool => (
              <button
                key={tool.id}
                onClick={() => setActiveTab(tool.id)}
                className={`px-4 py-2 font-medium ${
                  activeTab === tool.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'
                }`}
              >
                <div className={`icon-${tool.icon} mr-2 inline`}></div>
                {tool.name}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'calculator' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">IVF Success Calculator</h3>
              <div className="space-y-4">
                <input
                  type="number"
                  className="input-field"
                  placeholder="Your age"
                  value={calculatorData.age}
                  onChange={(e) => setCalculatorData({...calculatorData, age: e.target.value})}
                />
                <input
                  type="number"
                  className="input-field"
                  placeholder="AMH level"
                  value={calculatorData.amh}
                  onChange={(e) => setCalculatorData({...calculatorData, amh: e.target.value})}
                />
                <button onClick={calculateSuccess} className="btn-primary w-full">
                  Calculate Success Rate
                </button>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {results ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">{results.successRate}%</div>
                    <p className="text-gray-600">Success Rate</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded">
                      <div className="text-xl font-bold text-green-600">{results.cycles}</div>
                      <p className="text-sm text-gray-600">Estimated Cycles</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded">
                      <div className="text-xl font-bold text-purple-600">{results.livebirthRate}%</div>
                      <p className="text-sm text-gray-600">Live Birth Rate</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">Enter your information to calculate</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'tracker' && (
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Cycle Tracker</h3>
            <p className="text-gray-600">Track your menstrual cycles and fertility windows.</p>
          </div>
        )}

        {activeTab === 'nutrition' && (
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Nutrition Guide</h3>
            <p className="text-gray-600">Dietary recommendations for fertility optimization.</p>
          </div>
        )}

        {activeTab === 'exercises' && (
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Exercise Guide</h3>
            <p className="text-gray-600">Safe and effective exercises during fertility treatment.</p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('FertilityTools component error:', error);
    return null;
  }
}
