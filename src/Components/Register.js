import React, { useState } from 'react';
import IsLoadingHOC from '../common/IsLoadingHOC';
import { withoutAuthAxios } from '../config/config';
import { toast } from 'react-toastify';
import { validateForm } from '../utils/utils';
import withAuthRedirect from '../common/withAuthRedirect';
import { useNavigate } from 'react-router-dom';

function RegisterComponent(props) {
    const { setLoading } = props;
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        dob: '',
    });
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegister = async () => {
        setLoading(true);

        const validationResult = validateForm(formData); // Call the validateForm function
        // Check if the selected date of birth is in the future
        const selectedDate = new Date(formData.dob);
        const currentDate = new Date();

        if (selectedDate > currentDate) {
            setLoading(false);
            toast.error('Please select a valid date of birth.');
            return;
        }

        if (!validationResult.isValid) {
            setLoading(false);
            // Display error messages from validationResult.errors
            Object.keys(validationResult.errors).forEach((field) => {
                toast.error(validationResult.errors[field]);
            });
            return;
        }
        try {
            const response = await withoutAuthAxios().post(
                `${process.env.REACT_APP_API_URL}register`,
                formData
            );

            setLoading(false);

            if (response.data.status === true) {
                toast.success(response.data.message);
                console.log('Registration successful:', response.data);
                navigate('/')
                // You can also redirect the user to a different page or display a success message
            }
        } catch (error) {
            setLoading(false);
            const errorMessage =
                error.response?.data?.message || 'An unexpected error occurred!';
            toast.error(errorMessage);
            console.error('Error registering:', error);
        }
    };

    return (
        <>
            <div className='w-full pt-[clamp(20px,3vw,50px)]'>
                <div className='flex flex-col w-full items-center pt-[clamp(20px,3vw,50px)]'>
                    <div className='max-w-[350px] w-full mx-auto bg-bgColor rounded-[10px] p-[clamp(15px,2vw,25px)] shadow-lg'>
                        <h2 className='text-[18px] leading-normal bg-primary text-white rounded-[50px] p-3 h-[45px] flex justify-center items-center max-w-[150px] mt-[-50px] mb-[15px] mx-auto'>Register</h2>
                        <form>
                            <div className='flex flex-col gap-[5px] mb-[5px]'>
                                <label className='text-textColor' htmlFor="username">Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className='rounded-[50px] py-[10px] px-[15px] bg-white text-textColor focus:outline-none border'
                                />
                            </div>
                            <div className='flex flex-col gap-[5px] mb-[5px]'>
                                <label className='text-textColor' htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className='rounded-[50px] py-[10px] px-[15px] bg-white text-textColor focus:outline-none border '
                                />
                            </div>
                            <div className='flex flex-col gap-[5px] mb-[5px]'>
                                <label className='text-textColor' htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className='rounded-[50px] py-[10px] px-[15px] bg-white text-textColor focus:outline-none border '
                                />
                            </div>
                            <div className='flex flex-col gap-[5px] mb-[5px]'>
                                <label className='text-textColor' htmlFor="dob">Date of birth:</label>
                                <input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleInputChange}
                                    className='rounded-[50px] py-[10px] px-[15px] bg-white text-textColor focus:outline-none border '
                                />
                            </div>
                            <button type="button" onClick={handleRegister} className='bg-primary text-white w-full rounded-[50px] h-[45px] font-semibold border-[2px] border-white hover:bg-primary hover:text-white duration-[0.3s] mt-3'>
                                Register
                            </button>
                            <p className='mt-2 text-center'>Already registered? <button onClick={() => navigate('/')} type="button" className='text-primary font-semibold'>
                                Sign In.
                            </button></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default IsLoadingHOC(withAuthRedirect(RegisterComponent));
