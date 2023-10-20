import { toast } from 'react-toastify';

export const validateWeatherFields = (editedValues) => {
    let errors = {};

    if (!editedValues.city.trim() || editedValues.city.trim().length <= 3) {
        errors.city = "City name should be greater than 3 characters";
        toast.error(errors.city);
    }
    if (editedValues.humidity < 0 || editedValues.humidity > 100) {
        errors.humidity = "Humidity should be between 0 and 100";
        toast.error(errors.humidity);
    }
    if (editedValues.pressure <= 0) {
        errors.pressure = "Pressure should be a positive value";
        toast.error(errors.pressure);
    }
    if (editedValues.temp < -273.15) {
        errors.temp = "Temperature should not be below absolute zero (-273.15°C)";
        toast.error(errors.temp);
    }

    return {
        isValid: Object.keys(errors).length === 0,  // If no errors, isValid will be true
        errors: errors
    };
};


export const validateForm = (formData) => {
    const { username, email, password, dob } = formData;
    const errors = {};

    if (!username) {
        errors.username = 'Username is required.';
    }

    if (!email) {
        errors.email = 'Email is required.';
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.email = 'Please enter a valid email address.';
        }
    }

    if (!password) {
        errors.password = 'Password is required.';
    } else if (password.length < 6) {
        errors.password = 'Password length should be greater than 6.';
    }

    if (!dob) {
        errors.dob = 'Date of birth is required.';
    } else {
        // You can add date validation logic here if needed
    }

    if (Object.keys(errors).length === 0) {
        return { isValid: true };
    } else {
        return { isValid: false, errors };
    }
};
