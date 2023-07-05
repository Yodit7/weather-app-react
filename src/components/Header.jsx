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


const SearchIcon = styled(MdEditLocationAlt)`
  font-size: 1.5rem;
  cursor: pointer;
  color: rgb(247, 196, 18);

  .search-icon:hover {
    color: white;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownContent = styled.div`
  position: absolute;
  top: 150%;
  right: 0;
  margin-right: 5px;
  width: 318px;
  padding: 1rem;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(5px);
`;

const DropdownForm = styled.form`
  display: flex;
  align-items: center;
`;

const DropdownInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 15px;
`;

const DropdownButton = styled.button`
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: rgb(247, 196, 18);
  color: rgb(27,28,72);
  border: none;
  cursor: pointer;
  border-radius: 15px;

  :hover {
    font-weight: 400;
  }
`;


const Header = ( {onLocationSubmit }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [locationInput, setLocationInput] = useState("");
 
    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const handleLocationChange = (event) => {
        setLocationInput(event.target.value);
    };
    
    const handleLocationSubmit = (event) => {
        event.preventDefault();
        
        onLocationSubmit(locationInput)
        
        setLocationInput("");
        setIsDropdownOpen(false);
    };


    return (
        <Container>
            <Title>Weather Forecast</Title>
            <DropdownContainer>
                <SearchIcon className="search-icon" onClick={toggleDropdown} />
                {isDropdownOpen && (
                <DropdownContent>
                    <DropdownForm onSubmit={handleLocationSubmit}>
                    <DropdownInput
                        type="text"
                        value={locationInput}
                        onChange={handleLocationChange}
                        placeholder="Enter a new location"
                    />
                    <DropdownButton type="submit">Submit</DropdownButton>
                    </DropdownForm>
                </DropdownContent>
            )}
        </DropdownContainer>
        </Container>
    )
}

export default Header;