function ProgressDashboard({ user, onBack }) {
  try {
    const [chartData, setChartData] = React.useState(null);
    const [timeRange, setTimeRange] = React.useState('3months');

    React.useEffect(() => {
      createProgressChart();
    }, [timeRange]);

    const createProgressChart = () => {
      const canvas = document.getElementById('progressChart');
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      
      if (chartData) {
        chartData.destroy();
      }

      const chart = new ChartJS(ctx, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
          datasets: [{
            label: 'Hormone Levels',
            data: [12, 19, 15, 25, 22, 30],
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            tension: 0.1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      setChartData(chart);
    };

    const metrics = [
      { title: 'Treatment Days', value: '42', unit: 'days', trend: '+5', color: 'blue' },
      { title: 'Appointments', value: '8', unit: 'total', trend: '+2', color: 'green' },
      { title: 'Medications', value: '3', unit: 'active', trend: '0', color: 'purple' },
      { title: 'Next Milestone', value: '5', unit: 'days', trend: '-2', color: 'orange' }
    ];

    const milestones = [
      { title: 'Initial Consultation', date: 'Dec 15, 2023', completed: true },
      { title: 'Baseline Testing', date: 'Jan 2, 2024', completed: true },
      { title: 'Stimulation Start', date: 'Jan 15, 2024', completed: true },
      { title: 'Monitoring Phase', date: 'Jan 20, 2024', completed: false, current: true },
      { title: 'Egg Retrieval', date: 'Feb 1, 2024', completed: false },
      { title: 'Embryo Transfer', date: 'Feb 6, 2024', completed: false }
    ];

    return (
      <div className="container mx-auto px-4 py-8" data-name="progress-dashboard" data-file="components/ProgressDashboard.js">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
            <div className="icon-arrow-left text-gray-600"></div>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Progress Tracking</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div key={index} className={`stat-card gradient-${metric.color}`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="text-sm opacity-90">{metric.title}</div>
                  <div className="text-xs opacity-75">{metric.unit}</div>
                </div>
                <div className={`text-sm ${metric.trend.startsWith('+') ? 'text-green-200' : metric.trend.startsWith('-') ? 'text-red-200' : 'text-gray-200'}`}>
                  {metric.trend !== '0' && metric.trend}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Progress Chart</h2>
              <select 
                className="px-3 py-1 border rounded"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="1month">1 Month</option>
                <option value="3months">3 Months</option>
                <option value="6months">6 Months</option>
              </select>
            </div>
            <div className="h-64">
              <canvas id="progressChart"></canvas>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold mb-6">Treatment Milestones</h2>
            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${
                    milestone.completed ? 'bg-green-500' : 
                    milestone.current ? 'bg-blue-500' : 'bg-gray-300'
                  }`}></div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${milestone.current ? 'text-blue-600' : 'text-gray-900'}`}>
                      {milestone.title}
                    </h3>
                    <p className="text-sm text-gray-600">{milestone.date}</p>
                  </div>
                  {milestone.completed && (
                    <div className="icon-check text-green-500"></div>
                  )}
                  {milestone.current && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Current</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('ProgressDashboard component error:', error);
    return null;
  }
}