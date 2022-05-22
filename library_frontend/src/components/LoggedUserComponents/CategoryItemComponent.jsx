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
              className="mt-5 rounded book-card-item "
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
              className="mt-5 rounded book-card-item "
            >
              <Card.Body>
                <Card.Title>
                  <Link
                    to={`/user/categories/${data.categoryName}/${data._id}/books`}
                    className="btn category-btn btn-success btn-category"
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
