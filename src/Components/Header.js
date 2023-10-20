import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Redux/Reducers/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const userData = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const currentUrl = location.pathname;
    const handleLogout = () => {
        dispatch(logout(false));
        navigate('/');
    };

    return (
        <header className='bg-primary'>
            <div className='container mx-auto p-2 flex items-center justify-between h-[70px]'>
                <div className='logo'>
                    <img src='./logo.png' className='w-[50px]' alt='logo' />
                </div>
                <div className='submit--page w-full flex items-center justify-end gap-[15px]'>
                    <div className='text-white'>{isAuthenticated && userData.username}</div>
                    {currentUrl === '/register' ? (
                        <button onClick={() => navigate('/')} type="button" className="bg-white text-textColor max-w-[150px] w-full rounded-[50px] h-[45px] font-semibold border-[2px] border-white hover:bg-primary hover:text-white duration-[0.3s]">
                            Login
                        </button>
                    ) : currentUrl === '/' ? (
                        <button onClick={() => navigate('/register')} type="button" className="bg-white text-textColor max-w-[150px] w-full rounded-[50px] h-[45px] font-semibold border-[2px] border-white hover:bg-primary hover:text-white duration-[0.3s]">
                            Register
                        </button>
                    ) : (
                        isAuthenticated && (
                            <button onClick={handleLogout} type="button" className="bg-white text-textColor max-w-[150px] w-full rounded-[50px] h-[45px] font-semibold border-[2px] border-white hover:bg-primary hover:text-white duration-[0.3s]">
                                Logout
                            </button>
                        )
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
