import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs"

const Weekday = styled.ul`
  list-style: none;
  color: white;
  display: flex;
  flex-direction: row;
  gap: 25px;
  cursor: pointer;
  margin-top: 10px;

  li:hover, .active {
    color: rgb(247, 196, 18);
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 5px;
  }

`;

const Boxes = styled.ul`
    list-style: none;
    display: flex;
    align-items: center;

    .box-icons {
        font-size: 20px;
    }

    .box-icons:hover {
        cursor: pointer;
        color: rgb(247, 196, 18);
    }
`;

const Box = styled.div`
  height: 100px;
  width: 100px;
  background-color: rgb(40, 39, 81);
  border-radius: 20px;
  margin: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 15px;

  p {
    display: flex;
    gap: 5px;
    align-items: start;
  }

  span {
    color: rgb(247, 196, 18);
    font-size: 12px;
    align-items: start;
  }
`;

const BoxTop = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: end;
    gap: 5px;

    .time {
        font-weight: 100;
        text-transform: uppercase;
    }

    img {
        height: 70px;
    }
`;

const Infos = styled.div`
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 10px;
`;
    
const Info = styled.div`
    height: 75px;
    width: 75px;
    background-color: rgb(40, 39, 81);
    border-radius: 15px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    h6 {
        font-size: 14px;
        font-weight: 400;
        text-decoration: underline;
        text-underline-offset: 5px;
    }

    p {
        text-align: start;
        font-size: 18px;
    }

`;

const Sub = styled.div`
    height: 120px;
    width: auto;
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
    background-color: rgb(40, 39, 81);
    border-radius: 15px;
    margin: 25px auto;
`;

const WeatherTimeline = ( { submittedLocation } ) => {
    const [today, setToday] = useState("")
    const [tomorrow, setTomorrow] = useState("")
    const [nextDays, setNextDays] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedDay, setSelectedDay] = useState(null);
    const [location, setLocation] = useState("")
    const [subscription, setSubscription] = useState(true)

    // default location
   if(submittedLocation === "") {
    submittedLocation = 'Berlin';
   }


    useEffect(() => {
        getData();
    }, [submittedLocation])

    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${submittedLocation}&days=3`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e8ecc1aaa1msha02f8c02f148d1ep17353bjsncdad97be0765',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    const getData = async () => {
        try {
            const response = await fetch(url, options);
            const result = await response.json();
            setToday(result.forecast.forecastday[0]);
            setTomorrow(result.forecast.forecastday[1]);
            setSelectedDay(result.forecast.forecastday[0]);
        } catch (error) {
            console.error(error);
        }
    }

    const handlePrevClick = () => {
        if (currentIndex > 0) {
          setCurrentIndex((prevIndex) => prevIndex - 1);
        } else {
            setCurrentIndex((prevIndex) => prevIndex -1);
        }

        if(currentIndex === -10 ) {
            setCurrentIndex(-10)
        }
      };
    
      const handleNextClick = () => {
        if (currentIndex < tomorrow.hour.length - 3) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        }

        if(currentIndex === 12){
            setCurrentIndex(12)
        }

      };

      const getTimeLabel = (index) => {
        const hour = index + 10;
        const timeLabel = hour >= 12 ? " pm" : " am";
        const formattedHour = hour > 12 ? hour - 12 : hour;
        return `${formattedHour}${timeLabel}`;
      };

      const handleToday = () => {
        setSubscription(true)
        setSelectedDay(today)
      }

      const handleTomorrow = () => {
        setSubscription(true)
        setSelectedDay(tomorrow)
      }

      const handleNextDays = () => {
        setSubscription(false);
      }


  return (
    <>
      <Weekday>
      <li className={selectedDay === today && (subscription) ? "active" : ""} onClick={handleToday}>Today</li>
      <li className={selectedDay === tomorrow && (subscription) ? "active" : ""} onClick={handleTomorrow}>Tomorrow</li>
      <li className={!subscription ? "active" : ""} onClick={handleNextDays}>Next 7 Days</li>
      </Weekday>
      {!today && !tomorrow && !nextDays ? (
        <div>Loading...</div>
      ) : (
        <div>
        {subscription ? (
          <Boxes>
            <BsChevronCompactLeft className="box-icons" onClick={handlePrevClick}/>
            <Box>
              <BoxTop>
                {selectedDay.hour && <img src={selectedDay.hour[currentIndex + 10].condition.icon} />}
                <p className="time">
                    {getTimeLabel(currentIndex)}
                </p>
              </BoxTop>
              <p>
                {selectedDay.hour && selectedDay.hour[currentIndex + 10].temp_c} <span>° C</span>
              </p>
            </Box>
            <Box>
              <BoxTop>
                {selectedDay.hour && <img src={selectedDay.hour[currentIndex + 11].condition.icon} />}
                <p className="time">
                    {getTimeLabel(currentIndex + 1)}
                </p>
              </BoxTop>
              <p>
                {selectedDay.hour && selectedDay.hour[currentIndex + 11].temp_c} <span>° C</span>
              </p>
            </Box>
            <BsChevronCompactRight className="box-icons" onClick={handleNextClick} />
          </Boxes>
            ) : (
                <Sub>Need subscription</Sub>
            )}
          <Infos>
            <Info>
              <h6>Sunset</h6>
              <p>{selectedDay.astro.sunrise}</p>
            </Info>
            <Info>
              <h6>Humidity</h6>
              <p>{selectedDay.day.avghumidity} %</p>
            </Info>
            <Info>
              <h6>Rain</h6>
              <p>{selectedDay.day.daily_chance_of_rain} %</p>
            </Info>
          </Infos>
        </div> 
      )}
    </>
  );
};

export default WeatherTimeline;
