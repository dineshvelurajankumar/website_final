function PatientMessaging({ user, onBack }) {
  try {
    const [messages, setMessages] = React.useState([
      { id: 1, sender: 'Dr. Sarah Johnson', content: 'Your test results look good! Ready for next phase.', time: '2:30 PM', type: 'doctor' },
      { id: 2, sender: 'You', content: 'Thank you! When should I start the medication?', time: '2:45 PM', type: 'patient' }
    ]);
    const [newMessage, setNewMessage] = React.useState('');
    const [isAIMode, setIsAIMode] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const sendMessage = async () => {
      if (!newMessage.trim()) return;
      
      const userMessage = {
        id: Date.now(),
        sender: 'You',
        content: newMessage,
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        type: 'patient'
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      
      if (isAIMode) {
        setLoading(true);
        try {
          const aiResponse = await invokeAIAgent(
            'You are a helpful IVF assistant. Provide supportive, informative responses about fertility treatment. Always recommend consulting with their doctor for medical advice.',
            newMessage
          );
          
          const aiMessage = {
            id: Date.now() + 1,
            sender: 'AI Assistant',
            content: aiResponse,
            time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
            type: 'ai'
          };
          
          setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
          console.error('AI response error:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    return (
      <div className="container mx-auto px-4 py-8" data-name="patient-messaging" data-file="components/PatientMessaging.js">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
            <div className="icon-arrow-left text-gray-600"></div>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="card">
            <h3 className="font-semibold mb-4">Contacts</h3>
            <div className="space-y-2">
              <div className="p-3 bg-blue-50 rounded-lg cursor-pointer">
                <div className="font-medium">Dr. Sarah Johnson</div>
                <div className="text-sm text-gray-600">Reproductive Specialist</div>
              </div>
              <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="font-medium">Nurse Linda</div>
                <div className="text-sm text-gray-600">Care Coordinator</div>
              </div>
              <div className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="font-medium">AI Assistant</div>
                <div className="text-sm text-gray-600">24/7 Support</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 card h-96 flex flex-col">
            <div className="flex justify-between items-center mb-4 pb-4 border-b">
              <h3 className="font-semibold">Dr. Sarah Johnson</h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">AI Mode</span>
                <button 
                  onClick={() => setIsAIMode(!isAIMode)}
                  className={`w-10 h-6 rounded-full ${isAIMode ? 'bg-blue-600' : 'bg-gray-300'} relative transition-colors`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${isAIMode ? 'translate-x-5' : 'translate-x-1'}`}></div>
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {messages.map(message => (
                <div key={message.id} className={`flex ${message.type === 'patient' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-3 rounded-lg ${
                    message.type === 'patient' ? 'bg-blue-600 text-white' : 
                    message.type === 'ai' ? 'bg-purple-100 text-purple-900' :
                    'bg-gray-100 text-gray-900'
                  }`}>
                    <div className="font-medium text-sm">{message.sender}</div>
                    <div className="text-sm mt-1">{message.content}</div>
                    <div className="text-xs mt-1 opacity-70">{message.time}</div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-purple-100 text-purple-900 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex space-x-2">
              <input
                type="text"
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              />
              <button onClick={sendMessage} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <div className="icon-send"></div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('PatientMessaging component error:', error);
    return null;
  }
}