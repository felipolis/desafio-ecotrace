import { useNavigate } from "react-router-dom";
import { createContext, useContext, useEffect, useState } from "react";
import { ISearch, IUser } from "../types";
import userApi from "../api/modules/user.api";

export const INITIAL_USER = {
  id: 0,
  name: '',
  username: '',
  email: '',
  avatarUrl: '',
  followers: 0,
  following: 0,
  repositories: 0,
  bio: '',
  twitter: '',
  companyName: '',
  site: '',
}

const INITIAL_STATE = {
  user: INITIAL_USER,
  history: [],
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
  setActkn: (token: string) => {},
  logout: () => {},
};

type IContextType = {
  user: IUser;
  history: ISearch[];
  setHistory: React.Dispatch<React.SetStateAction<ISearch[]>>;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
  setActkn: (token: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode}) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [history, setHistory] = useState<ISearch[]>([])

  const navigate = useNavigate()

  const checkAuthUser = async () => {
    const { response, error } = await userApi.getInfo()

    if (response) {
      setUser(response)
      setIsAuthenticated(true)
      return true
    }

    return false
  }

  const setActkn = (token: string) => {
    localStorage.setItem('actkn', token)
  }

  const logout = () => {
    localStorage.removeItem('actkn')
    setIsAuthenticated(false)
    setUser(INITIAL_USER)
    navigate('/sign-in')
  }


  useEffect(() => {
    if (
      localStorage.getItem('actkn') === '[]' ||
      localStorage.getItem('actkn') === null || localStorage.getItem('actkn') === undefined || localStorage.getItem('actkn') === ''
    ) {
      navigate('/sign-in');
    }

    checkAuthUser()
  }, []);

  const value = {
    user,
    setUser,
    history,
    setHistory,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
    setActkn,
    logout,
  }

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useUserContext = () => useContext(AuthContext)