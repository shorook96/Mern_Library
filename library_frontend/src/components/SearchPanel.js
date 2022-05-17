import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UseAuth } from './Helpers/Auth';
import userlogo from '../assets/userimages/userlogo.png';

// import { MDBCol, MDBIcon } from 'mdb-react-ui-kit';

const SearchPanel = () => {
  const { user } = UseAuth();
  const [filteredData, setFilteredData] = useState([]);
  const [searchField, setSearchField] = useState('');
  useEffect(() => {
    if (!searchField) {
      return setFilteredData([]);
    }

    axios
      .get(
        `http://localhost:5000/user/${user.userInfo.id}/search/${searchField}`,
        {
          headers: {
            authorization: user.userInfo.authorization,
          },
        }
      )
      .then((response) => {
        console.log('before');
        setFilteredData(response.data);
        console.log(response.data);
      })
      .catch((error) => {});
  }, [searchField]);

  return (
    <div className="d-flex ">
      <form className="input-group ">
        <input
          type="search"
          className="form-control form-rounded m-auto "
          placeholder="Search...."
          aria-label="Search"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          onBlur={(e) => setFilteredData([])}
        />
        {filteredData.length > 0 ? (
          <div className="d-flex  dropdown-menu  mt-5 w-100">
            {filteredData[0].map((field, index) => {
              return (
                <div key={index} className="dropdown-item w-100 p-1">
                  <Link to="" className="w-100 p-0">
                    <span className="search-name"> {field.bookName}</span>
                    <img
                      src={field.photo}
                      width={30}
                      height={30}
                      className="search-img"
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        ) : null}
      </form>
    </div>
  );
};

export default SearchPanel;
