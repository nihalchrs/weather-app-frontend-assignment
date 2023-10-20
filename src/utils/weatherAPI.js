import { authAxios } from '../config/config';

const API_BASE = process.env.REACT_APP_API_URL;

export const fetchWeatherForCity = async (city) => {
    const apiUrl = `${API_BASE}weather/${city}`;
    return authAxios().get(apiUrl);
};

export const fetchWeatherHistory = async () => {
    const apiUrl = `${API_BASE}weather-history`;
    return authAxios().get(apiUrl);
};

export const updateWeather = async (id, data) => {
    const apiUrl = `${API_BASE}weather/${id}`;
    return authAxios().put(apiUrl, data);
};

export const deleteWeather = async (id) => {
    const apiUrl = `${API_BASE}weather/${id}`;
    return authAxios().delete(apiUrl);
};

export const bulkDeleteWeather = async (ids) => {
    const apiUrl = `${API_BASE}weather/bulk`;
    return authAxios().delete(apiUrl, { data: ids });
};
