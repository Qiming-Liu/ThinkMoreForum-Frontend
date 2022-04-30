import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import EditIcon from '@mui/icons-material/Edit';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import CloseIcon from '@mui/icons-material/Close';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import {
  Button,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Stack,
} from '@mui/material';
import useTable from './useTable';
import * as categoryServices from 'services/Public';
import { putCategories } from 'services/Category';
import { categoryRefetch } from 'services/Nextapi';
import ConfirmDialog from './ConfirmDialog';
import CategoryDialog from './CategoryDialog';
import hotToast from 'utils/hotToast';

const headCells = [
  { id: 'order', disablePadding: true, label: 'Order', disableSorting: true },
  {
    id: 'headImg',
    disablePadding: true,
    label: 'headImg',
    disableSorting: true,
  },
  { id: 'title', label: 'Title', disableSorting: true },
  { id: 'description', label: 'Description', disableSorting: true },
  { id: 'color', label: 'Color', disableSorting: true },
  { id: 'actions', label: 'Actions', disableSorting: true },
];

const colorReverse = (oldColor) => {
  oldColor = '0x' + oldColor.replace(/#/g, '');
  let str = '000000' + (0xffffff - oldColor).toString(16);
  return '#' + str.substring(str.length - 6, str.length);
};

const Category = () => {
  const Router = useRouter();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [records, setRecords] = useState(null);
  const filterFn = {
    fn: (items) => {
      return items;
    },
  };

  useEffect(() => {
    const getCategory = async () => {
      const { data: categoriesInfo } =
        await categoryServices.getAllCategories();
      setRecords(categoriesInfo);
    };
    getCategory();
  }, []);

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

  const handleSaveChanges = async (record) => {
    console.log(record);
    const formattedRecords = record.map((x) => {
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
    await putCategories(formattedRecords);
    await categoryRefetch();
    hotToast('success', 'Changes saved successfully');
  };

  const add = async (category) => {
    setRecordForEdit(null);
    setOpenDialog(false);
    const newCategories = [...records, category];
    setRecords(newCategories);
    await handleSaveChanges(newCategories);
    Router.push('/admin/categories');
  };

  const edit = (category) => {
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
    setRecordForEdit(null);
    setOpenDialog(false);
    handleSaveChanges(newCategories);
    setRecords(newCategories);
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenDialog(true);
  };

  const onDelete = (title) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    const newRecords = records.filter((x) => x.title !== title);
    setRecords(newRecords);
    handleSaveChanges(newRecords);
  };

  const handleDragEnd = (e) => {
    if (!e.destination) return;
    const tempData = Array.from(records);
    const [sourceData] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, sourceData);
    setRecords(tempData);
    handleSaveChanges(tempData);
  };

  if (!records) {
    return null;
  }
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mt: 3 }}
      >
        <Button
          variant="contained"
          onClick={() => {
            setOpenDialog(true);
            setRecordForEdit(null);
          }}
        >
          Add Category
        </Button>
      </Stack>
      <TblContainer>
        <TblHead />
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <TableBody ref={provided.innerRef} {...provided.droppableProps}>
                {recordsAfterPagingAndSorting().map((item, index) => {
                  const image = item ? item.headImgUrl : null;
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
                            <div
                              style={{
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                position: 'relative',
                                marginTop: '10px',
                                height: '85px',
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle2">
                              {item.title}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="subtitle2">
                              {item.description}
                            </Typography>
                          </TableCell>
                          <TableCell
                            style={{
                              background: item.color,
                            }}
                          >
                            <Typography
                              color={colorReverse(item.color)}
                              variant="subtitle2"
                            >
                              {item.color}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Button
                              color="primary"
                              onClick={() => {
                                openInPopup(item);
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </Button>
                            <Button
                              color="primary"
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
                            </Button>
                          </TableCell>
                        </TableRow>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </TableBody>
            )}
          </Droppable>
        </DragDropContext>
      </TblContainer>
      <CategoryDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        recordForEdit={recordForEdit}
        addOrEdit={recordForEdit ? edit : add}
        records={records}
        handleSaveChanges={handleSaveChanges}
      />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};
export default Category;
