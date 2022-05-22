import React, { Component } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

function GetAuthors() {
  return fetch('http://localhost:5000/' + 'authors/').then((response) =>
    response.json()
  );
}

class Authors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors: [],
    };
  }

  componentDidMount() {
    GetAuthors().then((data) => {
      console.log(data);
      this.setState({ authors: data });
    });
  }

  render() {
    return (
      <div>
        <div className="card">
          <center>
            <h2 style={{ color: 'gray' }}>Authors Names</h2>

            {this.state.authors.map((author, index) => (
              <div className="thumb" key={index}>
                <Card>
                  <center>
                    {' '}
                    <img
                      style={{ width: 500, height: 410 }}
                      //  src={LOCALHOST+author.photo}
                      src="https://wallpaperaccess.com/full/3525258.jpg"
                      alt="Card image cap"
                    />
                  </center>
                  <CardBody>
                    <CardTitle>
                      <Link to={'/Authors/' + author._id}>
                        <h3> {author.firstname + ' ' + author.lastname} </h3>
                      </Link>
                    </CardTitle>
                  </CardBody>
                </Card>
              </div>
            ))}
          </center>
        </div>
        {/* <Footer></Footer> */}
      </div>
    );
  }
}

export default Authors;
