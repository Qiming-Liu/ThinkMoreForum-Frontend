import React, { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
// import CloseIcon from '@material-ui/icons/Close';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Search } from '@material-ui/icons';
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
} from '@material-ui/core';
import CategoryForm from './CategoryForm';
// import PageHeader from '../../components/CategoryManager/PageHeader';
import useTable from '../../components/CategoryManager/useTable';
import * as categoryServices from '../../services/categoryService';
import Controls from '../../components/CategoryManager/controls/Controls';
import Popup from '../../components/CategoryManager/Popup';
import Notification from '../../components/CategoryManager/Notification';
import ConfirmDialog from '../../components/CategoryManager/ConfirmDialog';

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  searchInput: {
    width: '75%',
  },
  newButton: {
    position: 'absolute',
    right: '10px',
  },
  savBtn: {
    width: '100%',
  },
}));

const headCells = [
  { id: 'order', disablePadding: true, label: 'Order', disableSorting: true },
  { id: 'title', label: 'Category Title', disableSorting: true },
  { id: 'description', label: 'Description', disableSorting: true },
  { id: 'color', label: 'Color', disableSorting: true },
  { id: 'pin_post_id', label: 'pin_post_id', disableSorting: true },
  { id: 'actions', label: 'Actions', disableSorting: true },
];

const Category = () => {
  const classes = useStyles();
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

  const edit = async (category, resetForm) => {
    // categoryServices.updateCategory(category);
    // else categoryServices.updateEmployee(category);
    resetForm();
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
    setNotify({
      isOpen: true,
      message: 'Submitted Successfully',
      type: 'success',
    });
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
    // categoryServices.deleteCategory(id);
    // const { data: categoriesInfo } = await categoryServices.getAllCategories();
    // setRecords(categoriesInfo);
    // setNotify({
    //   isOpen: true,
    //   message: 'Deleted Successfully',
    //   type: 'error',
    // });
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
        <Paper className={classes.pageContent}>
          <Toolbar>
            <Controls.Input
              label="Search Category"
              className={classes.searchInput}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={handleSearch}
            />
            <Controls.Button
              text="Add Category"
              variant="outlined"
              startIcon={<AddIcon />}
              className={classes.newButton}
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
          <Controls.Button
            text="Save All Changes."
            variant="outlined"
            className={classes.savBtn}
            onClick={handleSaveChanges}
          />
        </Paper>
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
