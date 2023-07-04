import { styled } from "styled-components";
import { FaLocationDot } from "react-icons/fa6";
import { useState, useEffect } from "react";

const Box = styled.div`
    border-radius: 20px;
    height: 200px;
    width: 100%;
    max-width: 300px;
    color: white;
    background-color: rgb(40, 39, 81);
    padding: 25px;
    margin: 10px 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const Headline = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .large {
        font-size: 20px;
        font-weight: 600;
    }

    .small {
        font-size: 12px;
    }
`;

const Temperature = styled.div`
    display: flex;
    justify-content: space-between;

    p span {
        color: rgb(247, 196, 18);
        font-size: 26px;
        margin-top: 5px;
    }

    .large {
        display: flex;
        align-items: start;
        font-size: 60px;
        font-weight: 600;
        gap: 5px;
    }

    img {
        height: 80px;
        margin-right: 10px;
    }
`;

const Location = styled.p`
    font-size: 1em;
    display: flex;
    gap: 5px;
    align-items: center;

    .icon {
        color: rgb(247, 196, 18);
    }
`;

const WeatherBox = () => {

    const [todayTemp, setTodayTemp] = useState("");
    const [location, setLocation] = useState("");
    const [test, setTest] = useState("")
    const [todayDate, setTodayDate] = useState("");


    useEffect(() => {
        getWeather()
        setTodayDate(getFormattedDate())
    }, [])

    const getFormattedDate = () => {
        const date = new Date();
        const options = { weekday: "long", day: "numeric", month: "long" };
        return date.toLocaleDateString("en-US", options);
      };

    /**
     * get todays temperature
     */
    const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=53.1%2C-0.13';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e8ecc1aaa1msha02f8c02f148d1ep17353bjsncdad97be0765',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    const getWeather = async () =>  {
        try {
        const response = await fetch(url, options);
        const result = await response.json();
        setTest(result)
        setLocation(result.location.name);
        setTodayTemp(result.current.temp_c);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        {!test && !todayTemp && !location ? (
          <div>Loading...</div>
        ) : (
          <Box>
            <Headline>
              <p className="large">Today</p>
              <p className="small">{todayDate}</p>
            </Headline>
            <Temperature>
              <p className="large">
                {todayTemp} <span>° C</span>
              </p>
              {test.current && <img src={test.current.condition.icon} />}
            </Temperature>
            <Location>
              <FaLocationDot className="icon" />
              {location}
            </Location>
          </Box>
        )}
      </>
    )
}

export default WeatherBox;