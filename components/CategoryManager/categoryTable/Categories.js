import React, { useState, useEffect } from 'react';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Search } from '@material-ui/icons';
import {
  Paper,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from '@mui/material';
import styled from 'styled-components';
import CategoryForm from './CategoryForm';
import useTable from '../useTable';
import * as categoryServices from '../../../services/Category';
import Controls from '../controls/Controls';
import Popup from '../Popup';
import Notification from '../Notification';
import ConfirmDialog from '../ConfirmDialog';

const CategoriesPaper = styled(Paper)`
  margin: 40px;
  padding: 20px;
`;

const SearchInput = styled(Controls.Input)`
  width: 75%;
`;

const NewButton = styled(Controls.Button)`
  position: relative;
  left: 15px;
  right: 10px;
  width: 25%;
  align-items: right;
`;

const SavBtn = styled(Controls.Button)`
  width: 100%;
`;

const headCells = [
  { id: 'order', disablePadding: true, label: 'Order', disableSorting: true },
  { id: 'title', label: 'Category Title', disableSorting: true },
  { id: 'description', label: 'Description', disableSorting: true },
  { id: 'color', label: 'Color', disableSorting: true },
  { id: 'pin_post_id', label: 'pin_post_id', disableSorting: true },
  { id: 'actions', label: 'Actions', disableSorting: true },
];

const Category = () => {
  // const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  // const [singleRecord, setSingleRecord] = useState(recordForEdit);
  // false = add, true = edit
  const [records, setRecords] = useState(null);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  useEffect(() => {
    const getCategory = async () => {
      const { data: categoriesInfo } =
        await categoryServices.getAllCategories();
      setRecords(categoriesInfo);
    };
    getCategory();
  }, []);

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  });

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(records, headCells, filterFn);

  const handleSearch = (e) => {
    const { target } = e;
    setFilterFn({
      fn: (items) => {
        if (target.value === '') return items;
        return items.filter((x) =>
          x.title.toLowerCase().includes(target.value),
        );
      },
    });
  };

  const edit = async (category) => {
    // categoryServices.updateCategory(category);
    // else categoryServices.updateEmployee(category);
    // resetForm();
    const updateCategories = (updatedCategory, oldRecords) => {
      const newCategoryID = updatedCategory.id || updatedCategory.fakeID;
      console.log('newCategoryID', newCategoryID);
      return oldRecords.map((x) => {
        const newXID = x.id || x.fakeID;
        if (newXID === newCategoryID) {
          return updatedCategory;
        }
        return x;
      });
    };
    const newCategories = updateCategories(category, records);
    // const { data: categoriesInfo } = await categoryServices.getAllCategories();
    setRecords(newCategories);
    setRecordForEdit(null);
    setOpenPopup(false);
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };

  const onDelete = async (title) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    setRecords(records.filter((x) => x.title !== title));
    console.log(records);
  };

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    const tempData = Array.from(records);
    const [sourceData] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, sourceData);
    setRecords(tempData);
  };

  const add = (category) => {
    setRecords((prevState) => [...prevState, category]);
    setRecordForEdit(null);
    // resetForm();
    setOpenPopup(false);
  };
  const handleSaveChanges = () => {
    const formattedRecords = records.map((x) => {
      const y = x;
      delete y.fakeID;
      return y;
    });
    // formattedRecords.map((x) => {
    //   categoryServices.putCategory(x.title, x.description, x.color);
    //   return x;
    // });
    categoryServices.putCategories(formattedRecords);
    console.log(formattedRecords);
  };

  if (records === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <CategoriesPaper>
          <Toolbar>
            <SearchInput
              label="Search Category"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
            <NewButton
              text="Add Category"
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => {
                setOpenPopup(true);
                setRecordForEdit(null);
              }}
            />
          </Toolbar>
          <TblContainer>
            <TblHead />
            <Droppable droppableId="droppable-1">
              {(provided) => (
                <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                  {recordsAfterPagingAndSorting().map((item, index) => {
                    if (item.id) {
                      console.log(item.id);
                    }
                    return (
                      <Draggable
                        key={item.id || item.fakeID}
                        draggableId={item.id || item.fakeID}
                        index={index}
                      >
                        {(provider) => (
                          <TableRow
                            key={item.id || item.fakeID}
                            {...provider.draggableProps}
                            ref={provider.innerRef}
                          >
                            <TableCell {...provider.dragHandleProps}>
                              <DragHandleIcon />
                            </TableCell>
                            <TableCell>{item.title}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.color}</TableCell>
                            <TableCell>{item.pin_post_id}</TableCell>
                            <TableCell>
                              <Controls.ActionButton
                                color="primary"
                                onClick={() => {
                                  openInPopup(item);
                                }}
                              >
                                <EditOutlinedIcon fontSize="small" />
                              </Controls.ActionButton>
                              <Controls.ActionButton
                                color="secondary"
                                onClick={() => {
                                  setConfirmDialog({
                                    isOpen: true,
                                    title:
                                      'Are you sure to delete this record?',
                                    subTitle: "You can't undo this operation",
                                    onConfirm: () => {
                                      onDelete(item.title);
                                    },
                                  });
                                }}
                              >
                                <CloseIcon fontSize="small" />
                              </Controls.ActionButton>
                            </TableCell>
                          </TableRow>
                        )}
                      </Draggable>
                    );
                  })}
                </TableBody>
              )}
            </Droppable>
          </TblContainer>
          <TblPagination />
          <SavBtn
            text="Save All Changes."
            variant="outlined"
            // className={classes.savBtn}
            onClick={handleSaveChanges}
          />
        </CategoriesPaper>
      </DragDropContext>
      <Popup
        title="Category Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <CategoryForm
          recordForEdit={recordForEdit}
          addOrEdit={recordForEdit ? edit : add}
          records={records}
          setRecordForEdit={setRecordForEdit}
        />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};
export default Category;
