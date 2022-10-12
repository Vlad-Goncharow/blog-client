import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Header from './components/Header/index.jsx';
import Sidebar from './components/Sidebar/index.jsx';
import CreatePost from './pages/CreatePost/index.jsx';
import Login from './pages/Login/index.jsx';
import Post from './pages/Post/index.jsx';
import Posts from './pages/Posts';
import Register from './pages/Register';
import { fetchAuth } from './redux/slices/auth.js';

export const Context = React.createContext();

function App() {
  // ======== navigate
  const navigate = useNavigate();
  // ======== navigate

  // ======== dispatch
  const dispatch = useDispatch();
  // ======== dispatch

  // ======== current theme
  const [theme, setTheme] = React.useState(true);
  const [isSidebar, setIsSidebar] = React.useState(false);

  // ======== current theme

  // ======== auth
  const auth = async () => {
    const data = await dispatch(fetchAuth());
    if (data.payload) {
      if ('accessToken' in data.payload) {
        window.localStorage.setItem('token', data.payload.accessToken);
      }
    }
  };

  React.useEffect(() => {
    auth();
  }, []);
  // ======== auth

  // ======== all items
  const [items, setItems] = React.useState([]);
  // ======== all items

  React.useEffect(() => {
    navigate('/posts/all');
  }, []);

  const logout = () => {};

  const [sideOpen, setSideOpen] = React.useState(true);

  return (
    <Context.Provider
      value={{
        theme,
        setTheme,
        isSidebar,
        setIsSidebar,
      }}
    >
      <Header setItems={setItems} />
      <div className="page">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreatePost />} />
          <Route
            path="/posts/:value"
            element={<Posts items={items} setItems={setItems} />}
          />
          <Route
            path="/posts/tags/:name"
            element={<Posts items={items} setItems={setItems} />}
          />
          <Route
            path="/posts/user/:id"
            element={<Posts items={items} setItems={setItems} />}
          />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/post/:id/edit" element={<CreatePost />} />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
