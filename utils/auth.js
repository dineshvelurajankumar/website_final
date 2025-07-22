const AuthUtils = {
  login: (user) => {
    try {
      localStorage.setItem('currentUser', JSON.stringify(user));
      localStorage.setItem('loginTime', new Date().toISOString());
    } catch (error) {
      console.error('Login error:', error);
    }
  },

  logout: () => {
    try {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('loginTime');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem('currentUser');
      const loginTime = localStorage.getItem('loginTime');
      
      if (!userStr || !loginTime) {
        return null;
      }

      const loginDate = new Date(loginTime);
      const now = new Date();
      const hoursDiff = (now - loginDate) / (1000 * 60 * 60);
      
      if (hoursDiff > 24) {
        AuthUtils.logout();
        return null;
      }

      return JSON.parse(userStr);
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  },

  isLoggedIn: () => {
    return AuthUtils.getCurrentUser() !== null;
  },

  updateUser: (updatedUser) => {
    try {
      const currentUser = AuthUtils.getCurrentUser();
      if (currentUser) {
        const newUser = { ...currentUser, ...updatedUser };
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        return newUser;
      }
      return null;
    } catch (error) {
      console.error('Update user error:', error);
      return null;
    }
  }
};