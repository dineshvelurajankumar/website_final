function IVFCalculator({ onBack }) {
  try {
    const [formData, setFormData] = React.useState({
      age: '',
      amh: '',
      bmi: '',
      previousPregnancies: '',
      smokingStatus: 'never',
      diagnosis: ''
    });
    const [results, setResults] = React.useState(null);
    const [isCalculating, setIsCalculating] = React.useState(false);

    const diagnoses = [
      'Unexplained infertility',
      'Male factor infertility',
      'PCOS',
      'Endometriosis',
      'Tubal factor',
      'Ovulation disorders',
      'Other'
    ];

    const calculateSuccess = async () => {
      setIsCalculating(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const age = parseInt(formData.age);
        let baseRate = 50;
        
        if (age < 30) baseRate = 65;
        else if (age < 35) baseRate = 55;
        else if (age < 40) baseRate = 40;
        else if (age < 42) baseRate = 25;
        else baseRate = 15;
        
        const amhFactor = parseFloat(formData.amh) > 1.5 ? 1.1 : 0.9;
        const bmiFactor = parseFloat(formData.bmi) >= 18.5 && parseFloat(formData.bmi) <= 25 ? 1.05 : 0.95;
        const smokingFactor = formData.smokingStatus === 'never' ? 1.0 : 0.85;
        
        const finalRate = Math.round(baseRate * amhFactor * bmiFactor * smokingFactor);
        
        setResults({
          successRate: Math.min(finalRate, 85),
          cycles: Math.ceil(100 / Math.max(finalRate, 15)),
          recommendations: generateRecommendations(formData)
        });
      } catch (error) {
        console.error('Calculator error:', error);
      } finally {
        setIsCalculating(false);
      }
    };

    const generateRecommendations = (data) => {
      const recommendations = [];
      
      if (parseInt(data.age) > 35) {
        recommendations.push('Consider genetic testing due to maternal age');
      }
      if (parseFloat(data.bmi) > 25) {
        recommendations.push('Weight optimization may improve success rates');
      }
      if (data.smokingStatus !== 'never') {
        recommendations.push('Smoking cessation is strongly recommended');
      }
      if (parseFloat(data.amh) < 1.0) {
        recommendations.push('Consider ovarian reserve optimization');
      }
      
      return recommendations;
    };

    return (
      <div className="container mx-auto px-4 py-8" data-name="ivf-calculator" data-file="components/IVFCalculator.js">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
              <div className="icon-arrow-left text-gray-600"></div>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">IVF Success Calculator</h1>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="card">
              <h2 className="text-xl font-semibold mb-6">Enter Your Information</h2>
              
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="Your age"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      AMH Level (ng/mL)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      className="input-field"
                      placeholder="AMH level"
                      value={formData.amh}
                      onChange={(e) => setFormData({...formData, amh: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      BMI
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      className="input-field"
                      placeholder="Body Mass Index"
                      value={formData.bmi}
                      onChange={(e) => setFormData({...formData, bmi: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Previous Pregnancies
                    </label>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="Number"
                      value={formData.previousPregnancies}
                      onChange={(e) => setFormData({...formData, previousPregnancies: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Smoking Status
                  </label>
                  <select 
                    className="input-field"
                    value={formData.smokingStatus}
                    onChange={(e) => setFormData({...formData, smokingStatus: e.target.value})}
                  >
                    <option value="never">Never smoked</option>
                    <option value="former">Former smoker</option>
                    <option value="current">Current smoker</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Diagnosis
                  </label>
                  <select 
                    className="input-field"
                    value={formData.diagnosis}
                    onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
                  >
                    <option value="">Select diagnosis</option>
                    {diagnoses.map(diagnosis => (
                      <option key={diagnosis} value={diagnosis}>{diagnosis}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={calculateSuccess}
                  disabled={isCalculating || !formData.age || !formData.amh}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCalculating ? 'Calculating...' : 'Calculate Success Rate'}
                </button>
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-semibold mb-6">Results</h2>
              
              {results ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {results.successRate}%
                    </div>
                    <p className="text-gray-600">Estimated success rate per cycle</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-semibold text-green-600">
                        {results.cycles}
                      </div>
                      <p className="text-sm text-gray-600">Estimated cycles needed</p>
                    </div>
                    
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-semibold text-purple-600">
                        {Math.round(results.successRate * 0.8)}%
                      </div>
                      <p className="text-sm text-gray-600">Live birth rate</p>
                    </div>
                  </div>

                  {results.recommendations.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">Recommendations</h3>
                      <ul className="space-y-2">
                        {results.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start">
                            <div className="icon-check-circle text-green-500 mr-2 mt-0.5 text-sm"></div>
                            <span className="text-sm text-gray-600">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="icon-calculator text-4xl text-gray-300 mb-4"></div>
                  <p className="text-gray-500">Enter your information to calculate success rates</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('IVFCalculator component error:', error);
    return null;
  }
}
