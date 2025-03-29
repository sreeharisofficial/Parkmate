export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };
  
  export const getRole = () => {
    return localStorage.getItem('role');
  };
  
  export const requireAuth = (to, from, next) => {
    if (!isAuthenticated()) {
      next('/auth');
    } else {
      next();
    }
  };
  
  export const requireRole = (role) => {
    return (to, from, next) => {
      if (!isAuthenticated()) {
        next('/auth');
      } else if (getRole() !== role) {
        next('/');
      } else {
        next();
      }
    };
  };