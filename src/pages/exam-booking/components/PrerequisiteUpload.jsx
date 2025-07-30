import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrerequisiteUpload = ({ selectedOption, selectedLevel, onUploadComplete }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  // Only show for partial bookings
  if (selectedOption === 'both') {
    return null;
  }

  const requiredDocument = selectedOption === 'oral' ?'Written Exam Certificate' :'Oral Exam Certificate';

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const file = files[0];
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a PDF, JPEG, or PNG file.');
      return;
    }

    if (file.size > maxSize) {
      alert('File size must be less than 5MB.');
      return;
    }

    const newFile = {
      id: Date.now(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date(),
      status: 'uploaded'
    };

    setUploadedFiles([newFile]);
    onUploadComplete(true);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== fileId));
    onUploadComplete(false);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-warning mb-1">Prerequisite Required</h4>
            <p className="text-sm text-text-secondary">
              To book the {selectedOption === 'oral' ? 'oral' : 'written'} examination only, you must have completed the {selectedOption === 'oral' ? 'written' : 'oral'} portion of {selectedLevel} level. Please upload your certificate below.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-text-primary mb-2">Upload Required Document</h4>
          <p className="text-sm text-text-secondary mb-4">
            Please upload your {requiredDocument} for {selectedLevel} level
          </p>
        </div>

        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleChange}
            accept=".pdf,.jpg,.jpeg,.png"
          />
          
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={24} className="text-primary" />
            </div>
            
            <div>
              <p className="text-lg font-medium text-text-primary mb-2">
                Drop your file here, or <span className="text-primary">browse</span>
              </p>
              <p className="text-sm text-text-secondary">
                Supports: PDF, JPEG, PNG (Max 5MB)
              </p>
            </div>
          </div>
        </div>

        {uploadedFiles.length > 0 && (
          <div className="space-y-3">
            <h5 className="text-sm font-medium text-text-primary">Uploaded Documents</h5>
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 bg-success/5 border border-success/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="FileText" size={16} className="text-success" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text-primary">{file.name}</p>
                    <p className="text-xs text-text-secondary">
                      {formatFileSize(file.size)} • Uploaded {file.uploadDate.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-success">
                    <Icon name="CheckCircle" size={16} />
                    <span className="text-xs font-medium">Verified</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(file.id)}
                    className="text-error hover:text-error"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="text-sm text-text-secondary">
              <p className="font-medium text-text-primary mb-1">Document Requirements:</p>
              <ul className="space-y-1 text-xs">
                <li>• Official certificate or transcript from recognized institution</li>
                <li>• Document must clearly show your name and {selectedLevel} level completion</li>
                <li>• Scanned copies must be clear and readable</li>
                <li>• Documents will be verified within 24 hours</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrerequisiteUpload;