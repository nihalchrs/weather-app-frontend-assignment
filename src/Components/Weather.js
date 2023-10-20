import React, { useEffect, useState } from 'react';
import IsLoadingHOC from '../common/IsLoadingHOC';
import IsLoggedinHOC from '../common/IsLoggedInHOC';
import { toast } from 'react-toastify';
import { validateWeatherFields } from '../utils/utils';
import WeatherTable from './WeatherTable';
import withAuthRedirect from '../common/withAuthRedirect';
import {
    fetchWeatherForCity,
    fetchWeatherHistory,
    updateWeather,
    deleteWeather,
    bulkDeleteWeather
} from '../utils/weatherAPI';

function WeatherComponent(props) {
    const { setLoading } = props;
    const [weatherHistory, setWeatherHistory] = useState([]);
    const [city, setCityName] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [selectedIds, setSelectedIds] = useState([]);
    const [editingItemId, setEditingItemId] = useState(null);
    const [editedValues, setEditedValues] = useState({
        city: '',
        humidity: 0,
        pressure: 0,
        temp: 0,
    });

    const fetchWeatherHistoryData = async () => {
        try {
            const response = await fetchWeatherHistory();
            setWeatherHistory(response.data.data);
        } catch (error) {
            console.error('Error fetching weather history:', error);
        }
    };

    useEffect(() => {
        fetchWeatherHistoryData();
    }, []);

    const handleCheckboxChange = (id) => {
        setSelectedIds((prevSelectedIds) =>
            prevSelectedIds.includes(id)
                ? prevSelectedIds.filter((selectedId) => selectedId !== id)
                : [...prevSelectedIds, id]
        );
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleButtonClick();
        }
    };
    const handleButtonClick = async () => {
        setLoading(true);
        try {
            if (!city) {
                setLoading(false);
                toast.error('City name is required');
            } else {
                const response = await fetchWeatherForCity(city);
                setLoading(false);
                if (response.data.status === true) {
                    toast.success('Weather data added successfully!');
                    setCityName('');
                    fetchWeatherHistoryData();
                }
            }
        } catch (error) {
            setLoading(false);
            toast.error(error.response?.data?.message || 'City name may not be available.');
            console.error('Error fetching weather data:', error);
        }
    };


    const handleSaveEdit = async (id) => {
        const { isValid, errors } = validateWeatherFields(editedValues);
        if (!isValid) {
            setValidationErrors(errors);
            return;
        }
        try {
            const response = await updateWeather(id, { "city": editedValues.city });
            console.log(`Weather data with ID ${id} updated successfully`);
            setEditingItemId(null);
            setEditedValues({
                city: '',
                humidity: 0,
                pressure: 0,
                temp: 0,
            });
            toast.success(response.data.message);
            fetchWeatherHistoryData();;
        } catch (error) {
            if (error.response.data.error === "no rows updated") {
                toast.error("Nothing has been changed so nothing updated");
            } else {
                toast.error(`City name may not be available.`);
            }
            console.error(`Error updating weather data with ID ${id}:`, error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            try {
                const response = await deleteWeather(id);
                toast(response.data.message);
                console.log(`Weather data with ID ${id} deleted successfully`);
                fetchWeatherHistoryData();;
            } catch (error) {
                toast.error(`Error deleting weather data with ID ${id}: ${error.message}`);
                console.error(`Error deleting weather data with ID ${id}:`, error);
            }
        }
    };

    const handleBulkDelete = async () => {
        if (window.confirm('Are you sure you want to delete selected records?')) {
            try {
                const response = await bulkDeleteWeather(selectedIds);
                toast(response.data.message);
                console.log('Bulk delete operation successful');
                fetchWeatherHistoryData();
                setSelectedIds([]);
            } catch (error) {
                toast.error(`Error performing bulk delete operation: ${error.message}`);
                console.error('Error performing bulk delete operation:', error);
            }
        }
    };

    const handleEdit = (id) => {
        const itemToEdit = weatherHistory.find((item) => item.id === id);
        if (itemToEdit) {
            setEditingItemId(id);
            setEditedValues({
                city: itemToEdit.city,
                humidity: parseInt(itemToEdit.humidity),
                pressure: parseInt(itemToEdit.pressure),
                temp: parseFloat(itemToEdit.temp),
            });
        }
    };
    const isMultipleSelected = selectedIds.length > 1;

    const handleCancelEdit = () => {
        setEditingItemId(null);
        setEditedValues({
            city: '',
            humidity: 0,
            pressure: 0,
            temp: 0,
        });
        setValidationErrors({});
    };
    return (
        <>
            <div className='container mx-auto pt-[50px]'>
                <div className='search--weather flex gap-[5px] items-center justify-center'>
                    <input
                        type='text'
                        placeholder='Search City'
                        value={city}
                        onChange={(e) => setCityName(e.target.value)}
                        className='rounded-[50px] py-[10px] px-[15px] bg-lightGray text-textColor focus:outline-none placeholder:text-textColor h-[45px]'
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleButtonClick} className='bg-primary text-white max-w-[150px] w-full rounded-[50px] h-[45px] font-semibold border-[2px] border-primary hover:bg-white hover:text-primary duration-[0.3s]'>Get Weather</button>
                </div>

                {selectedIds.length > 1 && (
                    <div className='flex w-full mt-3 max-w-[1000px] mx-auto justify-end'>
                        <button onClick={handleBulkDelete} className='bg-red-600 text-white max-w-[150px] w-full rounded-[50px] h-[45px] font-semibold border-[2px] border-red-600 hover:bg-white hover:text-red-600 duration-[0.3s]'>Bulk Delete</button>
                    </div>
                )}
                <WeatherTable
                    weatherHistory={weatherHistory}
                    selectedIds={selectedIds}
                    editingItemId={editingItemId}
                    editedValues={editedValues}
                    handleCheckboxChange={handleCheckboxChange}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    isMultipleSelected={isMultipleSelected}
                    handleSaveEdit={handleSaveEdit}
                    handleCancelEdit={handleCancelEdit}
                    setEditedValues={setEditedValues}
                />
            </div>
        </>
    );
}

export default IsLoadingHOC(IsLoggedinHOC(withAuthRedirect(WeatherComponent)));
