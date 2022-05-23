import { useState } from 'react';
import React from 'react';
import AdminNavBar from './AdminNavBar';
import ItemsPanel from './ItemsPanel';


const adminSubPanelsIDs = {
    categories: 0,
    books: 1,
    authors: 2
}


const idToSubpanelName = ['category', 'book', 'author']

export default function ({logOut}){
    const [activeSubPanelID, setActiveSubPanelID] = useState(adminSubPanelsIDs.categories);

    const handleSubPanelChange = (tabID) => {setActiveSubPanelID(tabID)};

    return (
        <>
            <AdminNavBar logOut = {logOut} activeSubPanelID = {activeSubPanelID} changeTab = {handleSubPanelChange} />
            <br />
            <div className='container'>
                <ItemsPanel activeSubPanel = {idToSubpanelName[activeSubPanelID]}/>
            </div>
        </>
    )
}