import React from 'react';

function WeatherTable(props) {
    const {
        weatherHistory,
        selectedIds,
        editingItemId,
        editedValues,
        handleCheckboxChange,
        handleEdit,
        handleDelete,
        isMultipleSelected,
        setEditedValues,
        handleSaveEdit,
        handleCancelEdit
    } = props;

    return (
        <table className='w-full mt-3 max-w-[1000px] mx-auto'>
            <thead>
                <tr>
                    <th className='text-left bg-primary text-white p-3'></th>
                    <th className='text-left bg-primary text-white p-3'>City</th>
                    <th className='text-left bg-primary text-white p-3'>Humidity</th>
                    <th className='text-left bg-primary text-white p-3'>Pressure</th>
                    <th className='text-left bg-primary text-white p-3'>Temperature</th>
                    <th className='text-left bg-primary text-white p-3'>Edit</th>
                    <th className='text-left bg-primary text-white p-3'>Delete</th>
                </tr>
            </thead>
            <tbody>
                {(weatherHistory === null || weatherHistory.length === 0) ? (
                    <tr className='border-lightText border-b-[3px]'>
                        <td colSpan="7" className='text-textColor text-center p-4'>No history data available.</td>
                    </tr>
                ) : (
                    weatherHistory.map((item) => (
                        <tr key={item.id} className='border-lightText border-b-[1px]'>
                            <td className='p-3 text-textColor'>
                                <div className='relative custom--checkbox'>
                                    <input
                                        type='checkbox'
                                        checked={selectedIds.includes(item.id)}
                                        onChange={() => handleCheckboxChange(item.id)}
                                    />
                                    <span class="checkmark"></span>
                                </div>

                            </td>
                            <td className='p-3 text-textColor'>
                                {editingItemId === item.id ? (
                                    <input
                                        className='border border-black-500 border-[1px] p-2 rounded-[50px] w-[150px]'
                                        type='text'
                                        value={editedValues.city}
                                        onChange={(e) => setEditedValues({ ...editedValues, city: e.target.value })}

                                    />
                                ) : (
                                    item.city
                                )}
                            </td>
                            <td className='p-3 text-textColor'>
                                {/* {editingItemId === item.id ? (
                                    <input
                                        className='border border-black-500 border-[1px] p-2 rounded-[50px] w-[150px]'
                                        type='number'
                                        value={editedValues.humidity}
                                        onChange={(e) => setEditedValues({ ...editedValues, humidity: parseInt(e.target.value) })}

                                    />
                                ) : (
                                    item.humidity
                                )} */}
                                {item.humidity}
                            </td>
                            <td className='p-3 text-textColor'>
                                {/* {editingItemId === item.id ? (
                                    <input
                                        className='border border-black-500 border-[1px] p-2 rounded-[50px] w-[150px]'
                                        type='number'
                                        value={editedValues.pressure}
                                        onChange={(e) => setEditedValues({ ...editedValues, pressure: parseInt(e.target.value) })}

                                    />
                                ) : (
                                    item.pressure
                                )} */}
                                {item.pressure}
                            </td>
                            <td className='p-3 text-textColor'>
                                {/* {editingItemId === item.id ? (
                                    <input
                                        className='border border-black-500 border-[1px] p-2 rounded-[50px] w-[150px]'
                                        type='number'
                                        value={editedValues.temp}
                                        onChange={(e) => setEditedValues({ ...editedValues, temp: parseFloat(e.target.value) })}
                                    />
                                ) : (
                                    item.temp
                                )} */}
                                {item.temp}
                            </td>
                            <td className='p-3 text-textColor w-[150px]'>
                                {editingItemId === item.id ? (
                                    <button onClick={() => handleSaveEdit(item.id)} className='bg-primaryDark text-white max-w-[150px] w-full rounded-[50px] h-[45px] font-semibold border-[2px] border-primaryDark hover:bg-white hover:text-primaryDark duration-[0.3s] mt-3'>Save</button>
                                ) : (
                                    <button
                                        onClick={() => handleEdit(item.id)}
                                        disabled={isMultipleSelected}
                                        className='bg-primaryDark text-white max-w-[150px] w-full rounded-[50px] h-[45px] font-semibold border-[2px] border-primaryDark hover:bg-white hover:text-primaryDark duration-[0.3s] mt-3'
                                    >
                                        Edit
                                    </button>
                                )}
                                {editingItemId === item.id && (
                                    <button onClick={handleCancelEdit} className='bg-red-600 text-white max-w-[150px] w-full rounded-[50px] h-[45px] font-semibold border-[2px] border-red-600 hover:bg-white hover:text-red-600 duration-[0.3s] mt-3'>Cancel</button>
                                )}
                            </td>
                            <td className='p-3 text-textColor w-[150px]'>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    disabled={isMultipleSelected}
                                    className='bg-red-600 text-white max-w-[150px] w-full rounded-[50px] h-[45px] font-semibold border-[2px] border-red-600 hover:bg-white hover:text-red-600 duration-[0.3s] mt-3'
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}

export default WeatherTable;
