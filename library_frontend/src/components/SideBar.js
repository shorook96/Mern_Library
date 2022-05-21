import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { Link, NavLink } from 'react-router-dom';

const SideBar = () => {
  return (
    <>
      <div className="side-bar ">
        <CDBSidebar backgroundColor="#333">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            <Link to="/" className="text-decoration-none text-white ">
              Home
            </Link>
          </CDBSidebarHeader>

          <CDBSidebarContent>
            <CDBSidebarMenu>
              <NavLink
                to="/user/myBooks/All"
                className="side-bar-hover custom-nav-link"
              >
                <CDBSidebarMenuItem
                  icon="fa-solid fa-book-bookmark"
                  title="All"
                >
                  All
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                to="/user/myBooks/Read"
                title="Read"
                className="side-bar-hover custom-nav-link"
              >
                <CDBSidebarMenuItem icon="book">Read</CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                to="/user/myBooks/CurrentlyReading"
                title="Currently Reading"
                className="side-bar-hover custom-nav-link"
              >
                <CDBSidebarMenuItem icon="fa-solid fa-book-open-reader">
                  Currently Reading
                </CDBSidebarMenuItem>
              </NavLink>
              <NavLink
                to="/user/myBooks/WantToRead"
                title="Want To Read"
                className="side-bar-hover custom-nav-link"
              >
                <CDBSidebarMenuItem icon="fa-solid fa-book-open">
                  Want To Read
                </CDBSidebarMenuItem>
              </NavLink>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>
      </div>
    </>
  );
};

export default SideBar;
