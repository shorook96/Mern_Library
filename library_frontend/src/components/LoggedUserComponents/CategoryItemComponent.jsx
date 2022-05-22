import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CategoryItemComponent = ({ data }) => {
  return (
    <>
      <div className="flip-card">
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <Card
              bg={'white'}
              key={'primary'}
              text={'dark'}
              style={{ width: '18rem' }}
              className="mt-5 rounded "
            >
              <Card.Body>
                <Card.Title> {data.categoryName} </Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="flip-card-back">
            <Card
              bg={'white'}
              key={'primary'}
              text={'dark'}
              style={{ width: '18rem' }}
              className="mt-5 rounded "
            >
              <Card.Body>
                <Card.Title>
                  <Link
                    to={`/user/categories/${data.categoryName}/${data._id}/books`}
                    className="btn category-btn btn-success py-3 px-5"
                  >
                    Check Books
                  </Link>
                </Card.Title>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryItemComponent;
