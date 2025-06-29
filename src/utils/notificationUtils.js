export const checkForNotifications = () => {
    const mous = JSON.parse(localStorage.getItem('mous')) || [];
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const notifications = [];

    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    
    mous.forEach(mou => {
      if (!mou.signedDate) return;
      
      const signedDate = new Date(mou.signedDate);
      const expiryDate = new Date(signedDate.getFullYear() + parseInt(mou.duration), signedDate.getMonth(), signedDate.getDate());
      
      if (expiryDate <= nextMonth && expiryDate >= now) {
        notifications.push({
          type: 'renewal',
          message: `MOU with ${mou.industryName} is expiring soon (${expiryDate.toLocaleDateString()})`,
          mouId: mou.industryName
        });
      }
    });
    
    if (currentUser.role === 'admin') {
      const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const newMous = mous.filter(mou => {
        if (!mou.signedDate) return false;
        const signedDate = new Date(mou.signedDate);
        return signedDate >= thisMonth;
      });
      
      if (newMous.length > 0) {
        notifications.push({
          type: 'new',
          message: `${newMous.length} new MOUs added this month`,
          count: newMous.length
        });
      }
    }
    
    return notifications;
  };