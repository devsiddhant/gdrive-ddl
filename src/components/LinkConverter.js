import React, { useState } from 'react';

const LinkConverter = () => {
  const [inputLink, setInputLink] = useState('');
  const [convertedLink, setConvertedLink] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const extractFileId = (url) => {
    // Handle different Google Drive URL formats
    const patterns = [
      /\/file\/d\/([^\/]+)/,
      /id=([^&]+)/,
      /\/d\/([^\/]+)/,
      /\/open\?id=([^&]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  };

  const convertLink = () => {
    setError('');
    setConvertedLink('');
    setCopied(false);

    if (!inputLink.trim()) {
      setError('Please enter a Google Drive link');
      return;
    }

    const fileId = extractFileId(inputLink);
    
    if (!fileId) {
      setError('Invalid Google Drive link format');
      return;
    }

    const directDownloadLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
    setConvertedLink(directDownloadLink);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(convertedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const clearAll = () => {
    setInputLink('');
    setConvertedLink('');
    setError('');
    setCopied(false);
  };

  const handleExampleClick = () => {
    setInputLink('https://drive.google.com/file/d/1Q7MB6smDEFd-PzpqK-3cC2_fAZc4yaXF/view?usp=sharing');
    setError('');
    setConvertedLink('');
    setCopied(false);
  };

  return (
    <div className="converter-container">
      <div className="header">
        <h1>Google Drive Link Converter</h1>
        <p>Convert sharing links to direct download links</p>
      </div>

      <div className="input-section">
        <label htmlFor="drive-link">Google Drive Sharing Link:</label>
        <input
          id="drive-link"
          type="text"
          value={inputLink}
          onChange={(e) => setInputLink(e.target.value)}
          placeholder="Paste your Google Drive sharing link here..."
          className="link-input"
        />
        
        <div className="button-group">
          <button onClick={convertLink} className="btn btn-primary">
            Convert Link
          </button>
          <button onClick={clearAll} className="btn btn-secondary">
            Clear All
          </button>
          <button onClick={handleExampleClick} className="btn btn-outline">
            Load Example
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}

      {convertedLink && (
        <div className="result-section">
          <label>Direct Download Link:</label>
          <div className="result-container">
            <input
              type="text"
              value={convertedLink}
              readOnly
              className="result-input"
            />
            <button 
              onClick={copyToClipboard} 
              className={`btn btn-copy ${copied ? 'copied' : ''}`}
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
          
          <div className="preview-section">
            <p>Test your download link:</p>
            <a 
              href={convertedLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-download"
            >
              🔗 Open Download Link
            </a>
          </div>
        </div>
      )}

      <div className="info-section">
        <h3>How to use:</h3>
        <ol>
          <li>Copy a Google Drive sharing link (should look like: <code>drive.google.com/file/d/.../view</code>)</li>
          <li>Paste it in the input field above</li>
          <li>Click "Convert Link" to get the direct download URL</li>
          <li>Copy the converted link using the "Copy" button</li>
        </ol>
        
        <div className="supported-formats">
          <h4>Supported URL formats:</h4>
          <ul>
            <li><code>https://drive.google.com/file/d/FILE_ID/view</code></li>
            <li><code>https://drive.google.com/open?id=FILE_ID</code></li>
            <li><code>https://drive.google.com/uc?id=FILE_ID</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LinkConverter;
