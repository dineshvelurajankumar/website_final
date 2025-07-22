function Chatbot({ onBack }) {
  try {
    const [messages, setMessages] = React.useState([
      {
        id: 1,
        type: 'bot',
        content: 'Hello! I\'m your IVF Assistant. I can help answer questions about fertility treatments, procedures, and general guidance. How can I help you today?',
        timestamp: new Date()
      }
    ]);
    const [inputMessage, setInputMessage] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);

    const quickQuestions = [
      'What is IVF?',
      'How long does IVF take?',
      'What are the side effects?',
      'Success rates by age',
      'Cost of treatment',
      'Preparation tips'
    ];

    const handleSendMessage = async (message) => {
      if (!message.trim()) return;

      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setIsTyping(true);

      try {
        // Simulate AI response
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const botResponse = await generateBotResponse(message);
        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: botResponse,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, botMessage]);
      } catch (error) {
        console.error('Chat error:', error);
      } finally {
        setIsTyping(false);
      }
    };

    const generateBotResponse = async (userMessage) => {
      const message = userMessage.toLowerCase();
      
      if (message.includes('ivf') || message.includes('what is')) {
        return 'IVF (In Vitro Fertilization) is a fertility treatment where eggs are retrieved from the ovaries and fertilized with sperm in a laboratory. The resulting embryos are then transferred to the uterus. The process typically takes 4-6 weeks per cycle.';
      }
      
      if (message.includes('success') || message.includes('rate')) {
        return 'IVF success rates vary by age: Under 35 (55-65%), 35-37 (45-55%), 38-40 (35-45%), 41-42 (15-25%), Over 42 (5-15%). Individual factors like AMH levels, BMI, and diagnosis also affect success rates.';
      }
      
      if (message.includes('side effect') || message.includes('risk')) {
        return 'Common IVF side effects include bloating, mood swings, breast tenderness, and injection site reactions. Serious risks are rare but can include ovarian hyperstimulation syndrome (OHSS) and multiple pregnancies.';
      }
      
      if (message.includes('cost') || message.includes('price')) {
        return 'IVF costs vary by location and clinic. In the US, one cycle typically ranges from $12,000-$17,000. Many insurance plans now cover fertility treatments. We recommend checking with your insurance provider and exploring financing options.';
      }
      
      if (message.includes('preparation') || message.includes('prepare')) {
        return 'IVF preparation includes: maintaining a healthy diet, taking prenatal vitamins, avoiding smoking and excessive alcohol, managing stress, following medication schedules precisely, and attending all monitoring appointments.';
      }
      
      return 'Thank you for your question. For specific medical advice, please consult with your fertility specialist. I can provide general information about IVF procedures, success rates, and preparation tips. Is there anything specific you\'d like to know?';
    };

    return (
      <div className="container mx-auto px-4 py-8" data-name="chatbot" data-file="components/Chatbot.js">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
              <div className="icon-arrow-left text-gray-600"></div>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">AI Assistant</h1>
          </div>

          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <div className="card h-96 flex flex-col">
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map(message => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Ask me anything about IVF..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
                    />
                    <button
                      onClick={() => handleSendMessage(inputMessage)}
                      disabled={!inputMessage.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="icon-send text-sm"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="card">
                <h3 className="font-semibold mb-3">Quick Questions</h3>
                <div className="space-y-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(question)}
                      className="w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Chatbot component error:', error);
    return null;
  }
}