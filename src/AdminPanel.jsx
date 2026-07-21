import { useState, useEffect } from 'react';
import './AdminPanel.css';

function AdminPanel() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const ADMIN_PASSWORD = 'mahar2026';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchMessages();
    } else {
      alert('Wrong password!');
    }
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/contact';
      const res = await fetch(apiUrl);
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      } else {
        setError('Failed to load messages');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-PK', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-icon">
            <i className="fa-solid fa-shield-halved"></i>
          </div>
          <h2>Admin Panel</h2>
          <p>Enter password to access messages</p>
          <form onSubmit={handleLogin}>
            <div className="admin-input-group">
              <i className="fa-solid fa-lock"></i>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            <button type="submit" className="admin-login-btn">
              <i className="fa-solid fa-right-to-bracket"></i> Login
            </button>
          </form>
          <a href="/" className="admin-back-link">
            <i className="fa-solid fa-arrow-left"></i> Back to Website
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-wrapper">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <i className="fa-brands fa-connectdevelop admin-logo-icon"></i>
          <span className="admin-logo-text">MC. Admin</span>
        </div>
        <div className="admin-nav">
          <a href="#" className="admin-nav-item active">
            <i className="fa-solid fa-inbox"></i> Contact Messages
          </a>
          <a href="#" className="admin-nav-item">
            <i className="fa-solid fa-envelope"></i> Messages
            <span className="admin-badge">{messages.length}</span>
          </a>
          <a href="/" className="admin-nav-item">
            <i className="fa-solid fa-globe"></i> View Website
          </a>
        </div>
        <div className="admin-sidebar-footer">
          <button onClick={() => { setIsAuthenticated(false); setPassword(''); }} className="admin-logout-btn">
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-header">
          <h1><i className="fa-solid fa-inbox"></i> Contact Messages</h1>
          <button onClick={fetchMessages} className="admin-refresh-btn">
            <i className="fa-solid fa-rotate"></i> Refresh
          </button>
        </div>

        {loading && (
          <div className="admin-loading">
            <div className="admin-spinner"></div>
            <p>Loading messages...</p>
          </div>
        )}

        {error && (
          <div className="admin-error">
            <i className="fa-solid fa-triangle-exclamation"></i> {error}
          </div>
        )}

        {!loading && !error && messages.length === 0 && (
          <div className="admin-empty">
            <i className="fa-solid fa-inbox"></i>
            <h3>No Messages Yet</h3>
            <p>When someone submits the contact form, their messages will appear here.</p>
          </div>
        )}

        {!loading && !error && messages.length > 0 && (
          <div className="admin-messages-grid">
            {messages.map((msg, idx) => (
              <div
                className={`admin-msg-card ${selectedMsg === idx ? 'expanded' : ''}`}
                key={msg.id || msg._id || idx}
                onClick={() => setSelectedMsg(selectedMsg === idx ? null : idx)}
              >
                <div className="admin-msg-header">
                  <div className="admin-msg-avatar">
                    {msg.name ? msg.name.charAt(0).toUpperCase() : '?'}
                  </div>
                  <div className="admin-msg-meta">
                    <h3>{msg.name || 'Unknown'}</h3>
                    <span className="admin-msg-email">{msg.email || 'No email'}</span>
                  </div>
                  <span className="admin-msg-date">{formatDate(msg.createdAt)}</span>
                </div>
                <div className="admin-msg-subject">
                  <i className="fa-solid fa-tag"></i> {msg.subject || 'No Subject'}
                </div>
                <div className="admin-msg-body">
                  {msg.message || 'No message content'}
                </div>
                {selectedMsg === idx && (
                  <div className="admin-msg-actions">
                    <a href={`mailto:${msg.email}`} className="admin-reply-btn">
                      <i className="fa-solid fa-reply"></i> Reply via Email
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Message Detail Modal */}
      {selectedMsg !== null && messages[selectedMsg] && (
        <div className="admin-detail-overlay" onClick={() => setSelectedMsg(null)}>
          <div className="admin-detail-card" onClick={e => e.stopPropagation()}>
            <button className="admin-detail-close" onClick={() => setSelectedMsg(null)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div className="admin-detail-avatar">
              {messages[selectedMsg].name ? messages[selectedMsg].name.charAt(0).toUpperCase() : '?'}
            </div>
            <h2>{messages[selectedMsg].name}</h2>
            <p className="admin-detail-email">{messages[selectedMsg].email}</p>
            <div className="admin-detail-divider"></div>
            <div className="admin-detail-field">
              <label>Subject</label>
              <p>{messages[selectedMsg].subject}</p>
            </div>
            <div className="admin-detail-field">
              <label>Message</label>
              <p>{messages[selectedMsg].message}</p>
            </div>
            <div className="admin-detail-field">
              <label>Received</label>
              <p>{formatDate(messages[selectedMsg].createdAt)}</p>
            </div>
            <a href={`mailto:${messages[selectedMsg].email}`} className="admin-detail-reply">
              <i className="fa-solid fa-reply"></i> Reply to {messages[selectedMsg].name}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
