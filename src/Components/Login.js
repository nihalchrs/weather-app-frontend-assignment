import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {
    setAccessToken,
    setIsAuthenticated,
    setuser,
} from '../Redux/Reducers/authSlice';
import { withoutAuthAxios } from '../config/config';
import IsLoadingHOC from '../common/IsLoadingHOC';
import withAuthRedirect from '../common/withAuthRedirect';
import { useNavigate } from 'react-router-dom';

function LoginComponent(props) {
    const { setLoading } = props;
    const [formData, setFormData] = useState({ username: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleLogin = async () => {
        setLoading(true);

        const { username, password } = formData;

        // Validate username and password
        if (!username || !password) {
            setLoading(false);
            toast.error('Please enter both username and password.');
            return;
        }

        try {
            const response = await withoutAuthAxios().post(
                `${process.env.REACT_APP_API_URL}login`,
                formData
            );

            setLoading(false);
            if (response.data.status === true) {
                const { token, user, message } = response.data;
                toast.success(message);
                dispatch(setAccessToken(token));
                navigate('/weather');
                dispatch(setuser(user));
                dispatch(setIsAuthenticated(true));
                console.log('Login successful:', message);
            }
        } catch (error) {
            setLoading(false);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error('An error occurred while logging in.');
            }
            console.error('Error logging in:', error);
        }
    };

    return (
        <>
            <div className='w-full pt-[clamp(20px,3vw,50px)]'>
                <div className='flex flex-col w-full items-center pt-[clamp(20px,3vw,50px)]'>
                    <div className='max-w-[350px] w-full mx-auto bg-bgColor rounded-[10px] p-[clamp(15px,2vw,25px)] shadow-lg'>
                        <h2 className='text-[18px] leading-normal bg-primary text-white rounded-[50px] p-3 h-[45px] flex justify-center items-center max-w-[150px] mt-[-50px] mb-[15px] mx-auto'>Login</h2>
                        <form>
                            <div className='flex flex-col gap-[5px]'>
                                <label htmlFor="username" className='text-textColor'>Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className='rounded-[50px] py-[10px] px-[15px] bg-white text-textColor focus:outline-none border'
                                />
                            </div>
                            <div className='flex flex-col gap-[5px]'>
                                <label htmlFor="password" className='text-textColor'>Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className='rounded-[50px] py-[10px] px-[15px] bg-white text-textColor focus:outline-none border'
                                />
                            </div>
                            <button type="button" onClick={handleLogin} className='bg-primary text-white max-w-[150px] w-full rounded-[50px] h-[45px] font-semibold border-[2px] border-white hover:bg-primary hover:text-white duration-[0.3s] mt-3'>
                                Login
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </>
    );
}

export default IsLoadingHOC(withAuthRedirect(LoginComponent));
