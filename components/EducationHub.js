function EducationHub({ user, onBack }) {
  try {
    const [activeCategory, setActiveCategory] = React.useState('basics');
    const [personalizedContent, setPersonalizedContent] = React.useState([]);

    const categories = [
      { id: 'basics', name: 'IVF Basics', icon: 'book' },
      { id: 'preparation', name: 'Preparation', icon: 'heart' },
      { id: 'procedures', name: 'Procedures', icon: 'activity' },
      { id: 'nutrition', name: 'Nutrition', icon: 'apple' },
      { id: 'support', name: 'Support', icon: 'users' }
    ];

    const contentLibrary = {
      basics: [
        { title: 'What is IVF?', content: 'Understanding the basics of In Vitro Fertilization', readTime: '5 min', stage: 'all' },
        { title: 'Success Rates by Age', content: 'Statistical overview of IVF success rates', readTime: '3 min', stage: 'all' },
        { title: 'Timeline Overview', content: 'What to expect during your IVF journey', readTime: '7 min', stage: 'consultation' }
      ],
      preparation: [
        { title: 'Pre-IVF Health Tips', content: 'Optimizing your health before treatment', readTime: '6 min', stage: 'preparation' },
        { title: 'Medication Guide', content: 'Understanding your fertility medications', readTime: '8 min', stage: 'stimulation' },
        { title: 'Mental Preparation', content: 'Emotional readiness for IVF', readTime: '5 min', stage: 'all' }
      ],
      procedures: [
        { title: 'Egg Retrieval Process', content: 'Step-by-step guide to egg retrieval', readTime: '10 min', stage: 'retrieval' },
        { title: 'Embryo Transfer', content: 'What happens during embryo transfer', readTime: '8 min', stage: 'transfer' },
        { title: 'Monitoring Appointments', content: 'Understanding your monitoring visits', readTime: '4 min', stage: 'monitoring' }
      ]
    };

    React.useEffect(() => {
      generatePersonalizedContent();
    }, [user]);

    const generatePersonalizedContent = async () => {
      try {
        const stage = user?.currentStage || 'consultation';
        const prompt = `Generate 3 personalized educational topics for an IVF patient currently in the ${stage} stage. Return as JSON array with title and description fields.`;
        
        const response = await invokeAIAgent(
          'You are an IVF education specialist. Generate relevant, supportive educational content.',
          prompt
        );
        
        const cleanResponse = response.replace(/```json|```/g, '');
        const content = JSON.parse(cleanResponse);
        setPersonalizedContent(content);
      } catch (error) {
        console.error('Error generating content:', error);
        setPersonalizedContent([
          { title: 'Your Current Stage Guide', description: 'Tailored information for your treatment phase' },
          { title: 'Upcoming Milestones', description: 'What to expect in the coming weeks' },
          { title: 'Personalized Tips', description: 'Customized advice based on your profile' }
        ]);
      }
    };

    return (
      <div className="container mx-auto px-4 py-8" data-name="education-hub" data-file="components/EducationHub.js">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
            <div className="icon-arrow-left text-gray-600"></div>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Education Hub</h1>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          <div className="card">
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeCategory === category.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`icon-${category.icon} mr-3`}></div>
                    <span className="font-medium">{category.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <div className="card">
              <h3 className="text-xl font-semibold mb-4">Personalized for You</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {personalizedContent.map((item, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600">{item.description}</p>
                    <button className="mt-3 text-blue-600 text-sm font-medium hover:text-blue-800">
                      Read More →
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold mb-4">
                {categories.find(c => c.id === activeCategory)?.name}
              </h3>
              <div className="space-y-4">
                {(contentLibrary[activeCategory] || []).map((article, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-2">{article.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{article.content}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>{article.readTime}</span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                            {article.stage === 'all' ? 'All Stages' : article.stage}
                          </span>
                        </div>
                      </div>
                      <div className="icon-chevron-right text-gray-400"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('EducationHub component error:', error);
    return null;
  }
}