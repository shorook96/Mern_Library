import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { UseAuth } from './Helpers/Auth';

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
    <div className="d-flex flex-column">
      <form className="input-group ">
        <input
          type="search"
          className="form-control form-rounded m-auto "
          placeholder="Search...."
          aria-label="Search"
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        />
        {filteredData.length > 0 ? (
          <ul className="d-flex dropdown-menu">
            {filteredData.map((field, index) => {
              return (
                <li key={index} className="dropdown-item">
                  <Link to="">{field.firstname}</Link>
                </li>
              );
            })}
          </ul>
        ) : null}
      </form>
    </div>
  );
};

export default SearchPanel;
