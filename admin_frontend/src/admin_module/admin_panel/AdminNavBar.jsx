export default function AdminNavBar({activeSubPanelID, changeTab, logOut}) {
    const navItems = [
        {tabID: 0, name: 'Categories'},
        {tabID: 1, name: 'Books'},
        {tabID: 2, name: 'Authors'},
        {tabID: 3, name: 'Admins'}
    ];
    const activeTabClasses = 'nav-link active';
    const nonActiveTabClasses = 'nav-link';

    const handleTabClick = (tabID) => {
      changeTab(tabID);
    }

    return (
        <>
            <ul className="nav nav-tabs">
                    {
                        navItems.map((item) => {
                            return (
                                <li className="nav-item navListHover" key = {item.tabID}>
                                    <span className = {activeSubPanelID === item.tabID ? activeTabClasses : nonActiveTabClasses} onClick = {() => handleTabClick(item.tabID)} key = {item.tabID} aria-current="page">{item.name}</span>
                                </li>
                            )
                        })
                    }
                    <button type="button" className="btn btn-dark" onClick={logOut}> Logout </button>
            </ul>
        </>
    );
}