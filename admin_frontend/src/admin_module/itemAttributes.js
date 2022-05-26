const itemAttributes = {
    category: [  {key: '_id', alias: 'ID'},
                        {key: 'categoryName', alias: 'Category Name'}],


    author: [           {key: '_id', alias: 'ID'},
                        {key: 'firstname', alias: 'First Name'},
                        {key: 'lastname', alias: 'Last Name'},
                        {key: 'DOB', alias: 'DateOfBirth'},
                        {key: 'bio', alias: 'Bio'},
                        {key: 'photo', alias: 'Photo'}],

    book: [            {key: '_id', alias: 'ID'},
                        {key: 'bookName', alias: 'book Name'},
                        {key: 'brief', alias: 'Brief'},
                        {key: 'photo', alias: 'Photo'},
                        {key: 'category', alias: 'Category'},
                        {key: 'author', alias: 'Author'}],

    admin: [            {key: '_id', alias: 'ID'},
                        {key: 'email', alias: 'Email'},
                        {key: 'username', alias: 'username'},
                        {key: 'isActive', alias: 'isActive'}]
}

const getItemAttributes = (subPanelName) => {
    return itemAttributes[subPanelName];
}


export default getItemAttributes;