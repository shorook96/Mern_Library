import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { Link, NavLink } from 'react-router-dom';
const SideBar = () => {
  return (
    <div className="d-flex mt-5 side-bar ">
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <Link to="" className="text-decoration-none text-white">
            Home
          </Link>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fa-solid fa-book-bookmark" title="All">
                All
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="" activeClassName="activeClicked" title="Read">
              <CDBSidebarMenuItem icon="book">Read</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              to=""
              activeClassName="activeClicked"
              title="Currently Reading"
            >
              <CDBSidebarMenuItem icon="fa-solid fa-book-open-reader">
                Currently Reading
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="" activeClassName="activeClicked" title="Want To Read">
              <CDBSidebarMenuItem icon="fa-solid fa-book-open">
                Want To Read
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter className="text-center">
          <div className="p-3">Sidebar Footer</div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default SideBar;
