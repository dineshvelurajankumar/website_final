function VideoConsultation({ user, onBack }) {
  try {
    const [isInCall, setIsInCall] = React.useState(false);
    const [isMuted, setIsMuted] = React.useState(false);
    const [isVideoOff, setIsVideoOff] = React.useState(false);
    const [upcomingCalls, setUpcomingCalls] = React.useState([
      { id: 1, doctor: 'Dr. Sarah Johnson', date: '2024-01-15', time: '10:00 AM', type: 'Consultation' },
      { id: 2, doctor: 'Dr. Michael Chen', date: '2024-01-20', time: '2:30 PM', type: 'Follow-up' }
    ]);

    const startCall = (callId) => {
      setIsInCall(true);
    };

    const endCall = () => {
      setIsInCall(false);
    };

    if (isInCall) {
      return (
        <div className="fixed inset-0 bg-gray-900 z-50" data-name="video-call" data-file="components/VideoConsultation.js">
          <div className="h-full flex flex-col">
            <div className="flex-1 relative">
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="icon-user text-4xl"></div>
                  </div>
                  <h3 className="text-xl font-semibold">Dr. Sarah Johnson</h3>
                  <p className="text-gray-300">Connecting...</p>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 w-48 h-36 bg-gray-700 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-blue-600 flex items-center justify-center">
                  <div className="icon-user text-white text-2xl"></div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-6 flex justify-center space-x-4">
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className={`p-4 rounded-full ${isMuted ? 'bg-red-600' : 'bg-gray-600'} text-white hover:opacity-80`}
              >
                <div className={`icon-${isMuted ? 'mic-off' : 'mic'}`}></div>
              </button>
              
              <button 
                onClick={() => setIsVideoOff(!isVideoOff)}
                className={`p-4 rounded-full ${isVideoOff ? 'bg-red-600' : 'bg-gray-600'} text-white hover:opacity-80`}
              >
                <div className={`icon-${isVideoOff ? 'video-off' : 'video'}`}></div>
              </button>
              
              <button 
                onClick={endCall}
                className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700"
              >
                <div className="icon-phone-off"></div>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container mx-auto px-4 py-8" data-name="video-consultation" data-file="components/VideoConsultation.js">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
            <div className="icon-arrow-left text-gray-600"></div>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Video Consultation</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="card">
            <h2 className="text-xl font-semibold mb-6">Upcoming Consultations</h2>
            <div className="space-y-4">
              {upcomingCalls.map(call => (
                <div key={call.id} className="p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900">{call.doctor}</h3>
                      <p className="text-gray-600">{call.type}</p>
                      <p className="text-sm text-gray-500">{call.date} at {call.time}</p>
                    </div>
                    <button 
                      onClick={() => startCall(call.id)}
                      className="btn-primary"
                    >
                      <div className="icon-video mr-2 inline"></div>
                      Join Call
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100">
                  <div className="font-medium text-blue-900">Schedule New Consultation</div>
                  <div className="text-sm text-blue-700">Book video appointment</div>
                </button>
                <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100">
                  <div className="font-medium text-green-900">Test Your Connection</div>
                  <div className="text-sm text-green-700">Check audio/video setup</div>
                </button>
              </div>
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold mb-4">Call History</h3>
              <div className="space-y-2">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">Dr. Emily Rodriguez</div>
                  <div className="text-sm text-gray-600">Jan 10, 2024 - 45 min</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="font-medium">Dr. Sarah Johnson</div>
                  <div className="text-sm text-gray-600">Jan 5, 2024 - 30 min</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('VideoConsultation component error:', error);
    return null;
  }
}