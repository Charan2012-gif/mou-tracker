export const authenticateUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    return user || null;
  };
  
  export const registerUser = (userData) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === userData.email)) {
      return { success: false, message: 'User already exists' };
    }
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true, message: 'Registration successful' };
  };
  
  export const isAuthenticated = () => {
    return localStorage.getItem('currentUser') !== null;
  };
  
  export const logout = () => {
    localStorage.removeItem('currentUser');
  };