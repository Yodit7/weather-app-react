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

const WeatherTimeline = () => {

    const [data, setData] = useState("")
    const [today, setToday] = useState("")
    const [tomorrow, setTomorrow] = useState("")
    const [nextDays, setNextDays] = useState("")

    useEffect(() => {
        getData()
    }, [])

    const url = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q=London&days=3';
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
        } catch (error) {
            console.error(error);
        }
    }


  return (
<>
      <Weekday>
        <li className="active">Today</li>
        <li>Tomorrow</li>
        <li>Next 7 Days</li>
      </Weekday>
      {!today && !tomorrow ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Boxes>
            <BsChevronCompactLeft className="box-icons" />
            <Box>
              <BoxTop>
                {tomorrow.hour && <img src={tomorrow.hour[10].condition.icon} />}
                <p className="time">10 am</p>
              </BoxTop>
              <p>
                {tomorrow.hour && tomorrow.hour[10].temp_c} <span>° C</span>
              </p>
            </Box>
            <Box>
              <BoxTop>
                {tomorrow.hour && <img src={tomorrow.hour[11].condition.icon} />}
                <p className="time">11 am</p>
              </BoxTop>
              <p>
                {tomorrow.hour && tomorrow.hour[11].temp_c} <span>° C</span>
              </p>
            </Box>
            <BsChevronCompactRight className="box-icons" />
          </Boxes>
          <Infos>
            <Info>
              <h6>Sunset</h6>
              <p>{today.astro.sunrise}</p>
            </Info>
            <Info>
              <h6>Humidity</h6>
              <p>{today.day.avghumidity} %</p>
            </Info>
            <Info>
              <h6>Rain</h6>
              <p>{today.day.daily_chance_of_rain} %</p>
            </Info>
          </Infos>
        </div>
      )}
    </>
  );
};

export default WeatherTimeline;
