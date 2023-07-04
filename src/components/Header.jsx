import { styled } from "styled-components";
import { MdEditLocationAlt } from "react-icons/md";
import { useState } from "react";

const Container = styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .search-icon {
        font-size: 20px;
        color: rgb(247, 196, 18);
    }

    .search-icon:hover {
        color: white;
        cursor: pointer;
    }

`;

const Title = styled.h6`
    font-size: 1em;
    flex-grow: 1;
    text-align: center;
    font-weight: 400;
`;

const SearchLocation = styled.div`
    
`;

const Header = () => {
    const [clicked, setClicked] = useState(false)


    const editLocation = () => {
        console.log("edit location")
        setClicked(true);
    }

    console.log(clicked)

    return (
        <Container>
            <Title>Weather Forecast</Title>
            <MdEditLocationAlt className="search-icon" onClick={editLocation}/>
            {clicked ? 
            <SearchLocation>
            
            </SearchLocation> : <div></div> }
        </Container>
    )
}

export default Header;