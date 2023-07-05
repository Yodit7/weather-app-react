import WeatherBox  from './WeatherBox';
import WeatherTimeline from './WeatherTimeline';
import { useState } from 'react';

const Body = ({ submittedLocation }) => {

    return (
        <>
            <WeatherBox submittedLocation={submittedLocation} />
            <WeatherTimeline submittedLocation={submittedLocation} />
        </>
    )
}

export default Body;