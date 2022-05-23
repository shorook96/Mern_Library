import { useState, useEffect } from 'react';
import CRUD_services from '../../../services/CRUD_services';
import getItemAttributes from '../../../itemAttributes';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import uploadImage from '../../../services/fileUpload'
const subPanelName = 'book'


export default function BookItem({data, editedItemID, index, closeEditMode, editAction, reloadList}){
    
    const [newItemData, setNewItemData] = useState({...data});
    const [categoriesList, setcategoriesList] = useState([]);
    const [authorList, setAuthorList] = useState([]);
    useEffect(() => {
        if(data._id === editedItemID){
            setNewItemData(data);
        }
    }, [editedItemID]);

    useEffect(() => {
        CRUD_services.getCategories().then((list) => {
            setcategoriesList(list)
        });

        CRUD_services.getAuthors().then((list) => {
            setAuthorList(list)
        });
    }, [])
    

    const deleteAction = async (itemID) => {
        const confirmaed = window.confirm('Do you want to delete item with id = ' + itemID + '?');
        if(!confirmaed){
            //Early return
            return;
        }

        const res = await CRUD_services.deleteBook(itemID);
        if(res.status === 200){
            alert(`Deleted Item with id = ${itemID}`);
        }else{
            alert(res.data.message);
        }
        reloadList();
    }


    const submitEditedItem = async (newItemData) => {
        const newItemDataWithoutId = {};

        getItemAttributes(subPanelName).forEach((attribute) => {
            if(attribute.key !== '_id'){
                newItemDataWithoutId[attribute.key] = newItemData[attribute.key];
            }
        })

        const itemID = newItemData._id;
        try{
            const res = await CRUD_services.updateBook(itemID, newItemDataWithoutId);
            if(res.status === 200){
                reloadList();
                alert('Success');
                closeEditMode();
            }else{
                alert(res.data.message);
            }   
        }catch(error){
            alert(error.response.data.message);
        }
    }

    const updateNewData = (attributeKey, attributeValue) => {
        const temp = {...newItemData};
        temp[attributeKey] = attributeValue;
        setNewItemData(temp);
    }

    const handleEditAction = () => {
        editAction(data._id);
    }
    
    const handleDeleteAction = () => {
        deleteAction(data._id)
    }

    const getAuthorFullName = () => {
        let fullname = '';
        authorList.forEach((author) => {
            if(author._id === newItemData.author){
                fullname = `${author.firstname} ${author.lastname}`;
            }
        });
        return fullname;
    }

    const getCategoryName = () => {
        let categoryName = '';
        categoriesList.forEach((category) => {
            if(category._id === newItemData.category){
                categoryName = category.categoryName;
            }
        });
        return categoryName;
    }

    const getCategoryDropDownList = () => {
        return (
            <DropdownButton
                as={ButtonGroup}
                key={'CategoryDropDownList'}
                id={'CategoryDropDownListID'}
                variant={'secondary'}
                title={getCategoryName()}
            >
                {
                    categoriesList.map((category) => <Dropdown.Item key = {category._id} eventKey="1" onClick={()=>{updateNewData('category', category._id)}} active = {newItemData.category === category._id}>{category.categoryName}</Dropdown.Item>)
                }
                
            </DropdownButton>
        )
    }

    const getAuthorDropDownList = () => {
        return (
            <DropdownButton
                as={ButtonGroup}
                key={'AuthorDropDownList'}
                id={'AuthorDropDownListID'}
                variant={'secondary'}
                title={getAuthorFullName()}
            >
                {
                    authorList.map((author) => <Dropdown.Item key = {author._id} eventKey="1" onClick={()=>{updateNewData('author', author._id)}} active = {newItemData.author === author._id}>{`${author.firstname} ${author.lastname}`}</Dropdown.Item>)
                }
                
            </DropdownButton>
        )
    }

    const handleFileUpload = (url) => {
        updateNewData('photo', url);
    }

    const getRepresentation = () => {
        if(editedItemID === data._id){
            return(

                <tr key={data._id} className="table-warning">
                    <td key={'index'} className='indexCell'>{index + 1}</td>
                    <td key={'id'} className='idCell'>{data._id}</td>
                    
                    <td key={'bookName'} className=''><input type="text" value={newItemData.bookName} onChange={e => updateNewData('bookName', e.target.value)} onKeyDown={(e) => {if(e.key === "Enter") submitEditedItem(newItemData)}}/></td>
                    <td key={'brief'} className=''><input type="text" value={newItemData.brief} onChange={e => updateNewData('brief', e.target.value)} onKeyDown={(e) => {if(e.key === "Enter") submitEditedItem(newItemData)}}/></td>
                    <td key={'photo'} className=''><input type="file" value=""  onChange={(e) => {uploadImage(e.target.files[0], handleFileUpload)}} /></td>
                    <td key={'category'} className=''>{getCategoryDropDownList()}</td>
                    <td key={'author'} className=''>{getAuthorDropDownList()}</td>
                    
                    <td key={'submit'} className='actionButtonCell' style={{textAlign:'center'}}> 
                        <img className="hoverableImage" src="https://cdn-icons-png.flaticon.com/512/5219/5219192.png" alt="submit" width={20} onClick={() => {submitEditedItem(newItemData)}}/>
                    </td>
                    <td key={'cancel'} className='actionButtonCell' style={{textAlign:'center'}}>
                        <img className="hoverableImage" src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" alt="cancel" width={20} onClick={closeEditMode} />
                    </td>
                </tr>
            )
        }else{
            return(
                <tr key={data._id} className={index % 2 == 1 ? "table-secondary" : ""} onDoubleClick={handleEditAction}>
                    <td>{index + 1}</td>
                    {
                        getItemAttributes(subPanelName).map((attribute) => <td key={attribute.key} className='itemCell'>{data[attribute.key]}</td>)
                    }
                    <td key={'edit'} style={{textAlign:'center'}}> 
                        <img className="hoverableImage" src="https://cdn-icons-png.flaticon.com/512/650/650194.png" alt="edit" width={20} onClick={handleEditAction}/>
                    </td>
                    <td key={'delete'} style={{textAlign:'center'}}>
                        <img className="hoverableImage" src="https://cdn-icons-png.flaticon.com/512/3141/3141684.png" alt="delete" width={20} onClick={handleDeleteAction}/>
                    </td>
                </tr>
            )
        }
    }

    return (
        getRepresentation()
    );
}