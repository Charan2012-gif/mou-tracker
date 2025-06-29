import React, { useState, useEffect } from 'react';
import { checkForNotifications } from '../utils/notificationUtils';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faExclamationCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const notifs = checkForNotifications();
    setNotifications(notifs);
    
    notifs.forEach(notif => {
      if (notif.type === 'renewal') {
        toast.warning(notif.message, { autoClose: 10000 });
      } else if (notif.type === 'new') {
        toast.info(notif.message, { autoClose: 8000 });
      }
    });
  }, []);

  return (
    <div className="dropdown">
      <button 
        className="btn btn-light dropdown-toggle position-relative"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <FontAwesomeIcon icon={faBell} />
        {notifications.length > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {notifications.length}
          </span>
        )}
      </button>
      
      {showDropdown && (
        <div className="dropdown-menu show" style={{ right: 0, left: 'auto' }}>
          {notifications.length > 0 ? (
            notifications.map((notif, index) => (
              <div key={index} className="dropdown-item">
                {notif.type === 'renewal' ? (
                  <FontAwesomeIcon icon={faExclamationCircle} className="text-warning me-2" />
                ) : (
                  <FontAwesomeIcon icon={faInfoCircle} className="text-primary me-2" />
                )}
                {notif.message}
              </div>
            ))
          ) : (
            <div className="dropdown-item text-muted">No new notifications</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Notifications;