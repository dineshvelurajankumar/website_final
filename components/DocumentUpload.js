function DocumentUpload({ user, onBack }) {
  try {
    const [documents, setDocuments] = React.useState([
      { id: 1, name: 'Blood Test Results.pdf', type: 'Lab Results', date: '2024-01-10', size: '2.4 MB' },
      { id: 2, name: 'Ultrasound Report.pdf', type: 'Imaging', date: '2024-01-08', size: '1.8 MB' }
    ]);
    const [uploading, setUploading] = React.useState(false);
    const [dragOver, setDragOver] = React.useState(false);

    const documentTypes = [
      'Lab Results', 'Imaging', 'Medical Records', 'Insurance', 'Prescription', 'Other'
    ];

    const handleFileUpload = async (files) => {
      setUploading(true);
      try {
        for (const file of files) {
          const newDoc = {
            id: Date.now() + Math.random(),
            name: file.name,
            type: 'Other',
            date: new Date().toISOString().split('T')[0],
            size: `${(file.size / 1024 / 1024).toFixed(1)} MB`
          };
          setDocuments(prev => [newDoc, ...prev]);
        }
      } catch (error) {
        console.error('Upload error:', error);
      } finally {
        setUploading(false);
      }
    };

    const handleDrop = (e) => {
      e.preventDefault();
      setDragOver(false);
      const files = Array.from(e.dataTransfer.files);
      handleFileUpload(files);
    };

    const handleFileInput = (e) => {
      const files = Array.from(e.target.files);
      handleFileUpload(files);
    };

    const deleteDocument = (id) => {
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    };

    return (
      <div className="container mx-auto px-4 py-8" data-name="document-upload" data-file="components/DocumentUpload.js">
        <div className="flex items-center mb-6">
          <button onClick={onBack} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
            <div className="icon-arrow-left text-gray-600"></div>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Medical Documents</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card">
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
              >
                <div className="icon-upload text-4xl text-gray-400 mb-4"></div>
                <h3 className="text-lg font-semibold mb-2">Upload Documents</h3>
                <p className="text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileInput}
                  className="hidden"
                  id="fileInput"
                />
                <label htmlFor="fileInput" className="btn-primary cursor-pointer">
                  {uploading ? 'Uploading...' : 'Choose Files'}
                </label>
              </div>
            </div>

            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Your Documents</h2>
              <div className="space-y-3">
                {documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <div className="icon-file text-blue-600"></div>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{doc.name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{doc.type}</span>
                          <span>•</span>
                          <span>{doc.date}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-600 hover:text-blue-600">
                        <div className="icon-download"></div>
                      </button>
                      <button 
                        onClick={() => deleteDocument(doc.id)}
                        className="p-2 text-gray-600 hover:text-red-600"
                      >
                        <div className="icon-trash-2"></div>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h3 className="font-semibold mb-4">Document Categories</h3>
              <div className="space-y-2">
                {documentTypes.map(type => (
                  <div key={type} className="flex justify-between items-center p-2">
                    <span className="text-sm">{type}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {documents.filter(doc => doc.type === type).length}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold mb-4">Security & Privacy</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="icon-shield-check text-green-600 mr-2"></div>
                  <span>End-to-end encryption</span>
                </div>
                <div className="flex items-center">
                  <div className="icon-lock text-green-600 mr-2"></div>
                  <span>HIPAA compliant storage</span>
                </div>
                <div className="flex items-center">
                  <div className="icon-eye-off text-green-600 mr-2"></div>
                  <span>Private access only</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('DocumentUpload component error:', error);
    return null;
  }
}