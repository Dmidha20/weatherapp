import React, { useEffect, useState } from "react";
import './css/style.css';

export default function Weather() {
    const [data, setData] = useState('');
    const [search, setSearch] = useState('Delhi');
    useEffect(() => {

        let api_key = "61514916fa6afe13e7d8e805c044cbd1";

        const weatherDetails = async () => {
            try {
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${api_key}`;
                const response = await fetch(apiUrl);
                const resJson = await response.json();
                setData(resJson.main);
            }
            catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }
        weatherDetails();

    }, [search])


    return (
        <>
            <div className="container">
            <div className="header">
                <h3>Weather App</h3>
            </div>
                <div className="inputarea">
                    <input type="search" placeholder="Enter City Name" className="inputfield" onChange={(event) => { setSearch(event.target.value) }} />
                </div>
                <div className="weather-img">
                    <img src="clear-sky.png" alt="weatherimage" className="weatherimg" />
                </div>
                {!data ? (
                    <p className="errormsg">No Data found</p>
                ) :
                    (<div className="info">
                        <h2>
                            {search}
                        </h2>
                        <h1 >
                            {data.temp}°C
                        </h1>
                        <h3>
                            Min:{data.temp_min}°C | Max: {data.temp_max}°C
                        </h3>
                        <div className="details">
                            <div className="col">
                                <img src="humidity.png" alt="" />
                                <div>
                                    <p> {data.humidity}<br />
                                        Humidity </p>
                                </div>
                            </div>
                            <div className="col">
                                <img src="haze.png" alt="" />
                                <div>
                                    <p>{data.feels_like}°C <br />
                                        feels-like</p>

                                </div>
                            </div>

                        </div>
                    </div>
                    )
                }

            </div>
        </>
    )
}