import { createContext, useState, useContext } from 'react';
const AuthContext = createContext(null);
export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (user) => setUser(user);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const UseAuth = () => useContext(AuthContext);
