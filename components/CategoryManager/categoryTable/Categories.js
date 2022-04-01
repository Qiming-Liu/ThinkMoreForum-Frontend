import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Avatar, TableBody, TableRow, TableCell, Toolbar } from '@mui/material';
import styled from 'styled-components';
import CategoryForm from './CategoryForm';
import useTable from '../useTable';
import * as categoryServices from '../../../services/Public';
import { putCategories } from '../../../services/Category';
import Controls from '../controls/Controls';
import Popup from '../Popup';
import Notification from '../Notification';
import ConfirmDialog from '../ConfirmDialog';

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
  {
    id: 'headImgUrl',
    disablePadding: true,
    label: 'headImgUrl',
    disableSorting: true,
  },
  { id: 'title', label: 'Category Title', disableSorting: true },
  { id: 'description', label: 'Description', disableSorting: true },
  { id: 'color', label: 'Color', disableSorting: true },
  { id: 'postCount', label: 'postCount', disableSorting: true },
  { id: 'actions', label: 'Actions', disableSorting: true },
];

const Category = () => {
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [records, setRecords] = useState(null);
  // eslint-disable-next-line no-unused-vars
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

  const { TblContainer, TblHead, recordsAfterPagingAndSorting } = useTable(
    records,
    headCells,
    filterFn,
  );

  const edit = async (category) => {
    const updateCategories = (updatedCategory, oldRecords) => {
      const newCategoryID = updatedCategory.id || updatedCategory.fakeID;
      return oldRecords.map((x) => {
        const newXID = x.id || x.fakeID;
        if (newXID === newCategoryID) {
          return {
            ...updatedCategory,
            pinPost: { id: updatedCategory.pinPost },
          };
        }
        return x;
      });
    };
    const newCategories = updateCategories(category, records);
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
  };

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    const tempData = Array.from(records);
    const [sourceData] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, sourceData);
    setRecords(tempData);
  };

  const add = (category) => {
    const formattedCategory = {
      ...category,
      pinPost: { id: category.pinPost },
    };
    setRecords((prevState) => [...prevState, formattedCategory]);
    setRecordForEdit(null);
    setOpenPopup(false);
  };
  const handleSaveChanges = () => {
    const formattedRecords = records.map((x) => {
      const y = x;
      if (y.color === null || y.color === '') delete y.color;
      if (y.description === null || y.description === '') delete y.description;
      if (!y.pinPost || y.pinPost.id === '' || y.pinPost.id === null)
        delete y.pinPost;
      if (y.id === null || y.id === '') delete y.id;
      if (y.headImgUrl === null || y.headImgUrl === '') delete y.headImgUrl;
      delete y.fakeID;
      return y;
    });
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    putCategories(formattedRecords);
  };

  if (records === null) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Toolbar>
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
                          <TableCell>
                            <Avatar src={item.headImgUrl} sx={{ mr: 2 }} />
                          </TableCell>
                          <TableCell>{item.title}</TableCell>
                          <TableCell>{item.description}</TableCell>
                          <TableCell
                            style={{
                              background: item.color,
                              color: '#ffffff',
                            }}
                          >
                            {item.color}
                          </TableCell>
                          <TableCell>{item.postCount}</TableCell>
                          <TableCell>
                            <Controls.ActionButton
                              color="primary"
                              onClick={() => {
                                openInPopup(item);
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </Controls.ActionButton>
                            <Controls.ActionButton
                              color="secondary"
                              onClick={() => {
                                setConfirmDialog({
                                  isOpen: true,
                                  title: 'Are you sure to delete this record?',
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
        <SavBtn
          text="Save All Changes."
          variant="outlined"
          onClick={() => {
            setConfirmDialog({
              isOpen: true,
              title: 'Are you sure to save all changes?',
              subTitle: "You can't undo this operation",
              onConfirm: () => {
                handleSaveChanges();
              },
            });
          }}
        />
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
