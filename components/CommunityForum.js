function CommunityForum({ user, onBack }) {
  try {
    const [activeTab, setActiveTab] = React.useState('discussions');
    const [posts, setPosts] = React.useState([
      { id: 1, title: 'First IVF cycle - feeling nervous', author: 'Sarah M.', replies: 12, time: '2 hours ago', category: 'Support' },
      { id: 2, title: 'Success story after 3 cycles', author: 'Jennifer K.', replies: 28, time: '5 hours ago', category: 'Success Stories' },
      { id: 3, title: 'Medication side effects discussion', author: 'Lisa R.', replies: 8, time: '1 day ago', category: 'Medical' }
    ]);
    const [newPost, setNewPost] = React.useState({ title: '', content: '', category: '' });

    const categories = ['General', 'Support', 'Success Stories', 'Medical', 'Nutrition', 'Exercise'];

    const createPost = async () => {
      if (!newPost.title.trim() || !newPost.content.trim()) return;

      try {
        const post = {
          id: Date.now(),
          title: newPost.title,
          author: user.name,
          replies: 0,
          time: 'Just now',
          category: newPost.category || 'General'
        };

        setPosts(prev => [post, ...prev]);
        setNewPost({ title: '', content: '', category: '' });
      } catch (error) {
        console.error('Create post error:', error);
      }
    };

    return (
      <div className="container mx-auto px-4 py-8" data-name="community-forum" data-file="components/CommunityForum.js">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
            <div className="icon-arrow-left text-gray-600"></div>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Community Forum</h1>
        </div>

        <div className="card mb-6">
          <div className="flex space-x-4 border-b">
            <button
              onClick={() => setActiveTab('discussions')}
              className={`px-4 py-2 font-medium ${activeTab === 'discussions' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            >
              Discussions
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`px-4 py-2 font-medium ${activeTab === 'create' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
            >
              Create Post
            </button>
          </div>
        </div>

        {activeTab === 'discussions' && (
          <div className="grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3 space-y-4">
              {posts.map(post => (
                <div key={post.id} className="card hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{post.category}</span>
                        <span className="text-gray-500 text-sm">{post.time}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{post.title}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <span>by {post.author}</span>
                        <span className="mx-2">•</span>
                        <span>{post.replies} replies</span>
                      </div>
                    </div>
                    <div className="icon-chevron-right text-gray-400"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="card">
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button key={category} className="w-full text-left p-2 hover:bg-gray-50 rounded">
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="card">
                <h3 className="font-semibold mb-4">Community Guidelines</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Be respectful and supportive</li>
                  <li>• No medical advice</li>
                  <li>• Protect privacy</li>
                  <li>• Stay on topic</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'create' && (
          <div className="max-w-2xl mx-auto card">
            <h2 className="text-xl font-semibold mb-6">Create New Post</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select 
                  className="input-field"
                  value={newPost.category}
                  onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter post title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  className="input-field h-32 resize-none"
                  placeholder="Share your thoughts, questions, or experiences..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                />
              </div>

              <button onClick={createPost} className="btn-primary w-full">
                Create Post
              </button>
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error('CommunityForum component error:', error);
    return null;
  }
}