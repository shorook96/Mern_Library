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
    <div className="d-flex side-bar  ">
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <Link to="" className="text-decoration-none text-white">
            Home
          </Link>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="">
              <CDBSidebarMenuItem icon="fa-solid fa-book-bookmark" title="All">
                All
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="" title="Read">
              <CDBSidebarMenuItem icon="book">Read</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="" title="Currently Reading">
              <CDBSidebarMenuItem icon="fa-solid fa-book-open-reader">
                Currently Reading
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="" title="Want To Read">
              <CDBSidebarMenuItem icon="fa-solid fa-book-open">
                Want To Read
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default SideBar;
