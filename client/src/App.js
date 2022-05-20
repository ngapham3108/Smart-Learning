import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import Landing from './components/layout/Landing';
import Auth from './views/Auth';
import AuthContextProvider from './contexts/AuthContext';
import DashBoard from './views/DashBoard';
import About from './views/About';
import ProtectedRoute from './components/routing/ProtectedRoute';
import PostsContextProvider from './contexts/PostsContext';

function App() {
    return (
        <AuthContextProvider>
            <Router>
                <Routes>
                    <Route exact path="/" element={<Landing />} />
                    <Route
                        exact
                        path="/login"
                        element={<Auth authRoute="login" />}
                    />
                    <Route
                        exact
                        path="/register"
                        element={<Auth authRoute="register" />}
                    />
                    <Route
                        exact
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <PostsContextProvider>
                                    <DashBoard />
                                </PostsContextProvider>
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        exact
                        path="/about"
                        element={
                            <ProtectedRoute>
                                <About />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </AuthContextProvider>
    );
}

export default App;
