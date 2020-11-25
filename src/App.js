import React,{useReducer, createContext} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomeComp from './component/HomeComp';
import ListNews from './component/ListNews';
import LoginComp from './component/LoginComp';
import MenuComp from './component/MenuComp';
import Publik from './component/Publik';
import RegisterComp from './component/RegisterComp';
import RoleAdmin from './component/RoleAkses/RoleAdmin';
import RoleMember from './component/RoleAkses/RoleMember';
import RoleStaff from './component/RoleAkses/RoleStaff';
import Transaksi from './component/Transaksi';

//context
export const AuthContext = createContext()

//Inisiasi state
const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  tokenExpires: 0, 
  role: 0
}

const reducer = (state, action) => {
  switch(action.type){
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      localStorage.setItem("token", JSON.stringify(action.payload.token))
    return {
      ...state,
      isAuthenticated:true,
      user: action.payload.user,
      token: action.payload.token,
      tokenExpires: action.payload.expires,
      role: action.payload.role
    }

    case "LOGOUT":
      localStorage.clear()
      return{
        ...state,
        isAuthenticated: false,
        user: null
      }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <BrowserRouter>
    <Switch>
      <AuthContext.Provider value={{
        state,
        dispatch
      }}>

        <MenuComp/>
        <Route exact path="/" component={Publik} />
        <Route exact path="/login" component={LoginComp} />
        <Route exact path="/dashboard" component={HomeComp} />
        <Route exact path="/transaksi" component={Transaksi} />
        <Route exact path="/register" component={RegisterComp} />
        <Route exact path="/news" component={ListNews} />
        <Route exact path="/admin" component={RoleAdmin} />
        <Route exact path="/staff" component={RoleStaff} />
        <Route exact path="/member" component={RoleMember} />
      </AuthContext.Provider>
    </Switch>
    </BrowserRouter>
  );
}

export default App;
