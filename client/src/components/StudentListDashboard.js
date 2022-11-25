import * as React from 'react';
import {
  Box,
  Grid,
  Button,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  TextField,
} from '@mui/material';
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
  addStudent,
  allStudents,
  deleteStudent,
  studentById,
  updateStudent,
} from '../actions';
import { useNavigate } from 'react-router-dom';

const StudentListDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, currentStudent } = useSelector(
    (state) => state.BasicReducer
  );
  const [openModal, setOpenModal] = React.useState({
    addEditModal: false,
    resultModule: false,
    deleteModal: false,
  });
  const [formData, setFormData] = React.useState();
  const [deleteID, setDeleteID] = React.useState();

  React.useEffect(() => {
    dispatch(allStudents());
  }, []);

  const handleOpen = (type, id) => {
    setDeleteID(id);
    dispatch(studentById(id));
    setOpenModal({ ...openModal, [type]: true });
  };
  const handleClose = (type) => {
    setOpenModal({ ...openModal, [type]: false });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (type) => {
    dispatch(addStudent(formData, navigate));
    dispatch(allStudents());
    setOpenModal({ ...openModal, [type]: false });
  };

  const handleDelete = (type) => {
    dispatch(deleteStudent(deleteID));
    setOpenModal({ ...openModal, [type]: false });
  };

  return (
    <Box sx={{ p: 6 }}>
      <Box className='list-header'>
        <Typography variant='h5' gutterBottom fontSize='36px'>
          Student List
        </Typography>
        <Box>
          <Button
            variant='outlined'
            color='secondary'
            onClick={(e) => handleOpen('addEditModal')}
            sx={{ fontSize: 'x-large' }}>
            <AiOutlinePlus />
          </Button>
          <Button
            variant='outlined'
            color='secondary'
            onClick={(e) => handleOpen('resultModule')}
            className='ml10'>
            Manage Result
          </Button>
        </Box>
      </Box>
      <Card sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 210px)' }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {['Roll Number', 'Student Name', 'email', ''].map((column) => (
                  <TableCell key={column} style={{ minWidth: column.minWidth }}>
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {students &&
                students.map((row) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={row._id}>
                      <TableCell>{row.rollnumber} </TableCell>
                      <TableCell>
                        {`${row.firstname} ${row.lastname}`}{' '}
                      </TableCell>
                      <TableCell>{row.email} </TableCell>
                      <TableCell
                        align='right'
                        sx={{
                          fontSize: 'x-large',
                          p: '16px 8px 8px',
                        }}>
                        <AiOutlineEdit
                          onClick={(e) => handleOpen('addEditModal', row._id)}
                        />
                        <AiOutlineDelete
                          className='ml10'
                          onClick={(e) => handleOpen('deleteModal', row._id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Modal
        open={openModal.addEditModal}
        onClose={(e) => handleClose('addEditModal')}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'>
        <Box className='modal-style' sx={{ maxWidth: 500 }}>
          <Grid>
            <Typography variant='h6' gutterBottom>
              Student Detail
            </Typography>
            <Grid container columnSpacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id='standard-basic'
                  label='Roll Number'
                  variant='standard'
                  name='rollnumber'
                  onChange={handleChange}
                  value={currentStudent.rollnumber}
                  fullWidth
                />
                <TextField
                  id='standard-basic'
                  label='First Name'
                  variant='standard'
                  name='firstname'
                  onChange={handleChange}
                  value={currentStudent.firstname}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id='standard-basic'
                  label='Last Name'
                  variant='standard'
                  name='lastname'
                  value={currentStudent.lastname}
                  onChange={handleChange}
                  fullWidth
                />
                <TextField
                  id='standard-basic'
                  label='E-mail'
                  variant='standard'
                  name='email'
                  value={currentStudent.email}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
            </Grid>
            <Box display='flex' justifyContent='end' mt={3}>
              <Button
                variant='outlined'
                onClick={(e) => handleClose('addEditModal')}>
                Cancel
              </Button>
              <Button
                variant='contained'
                className='ml10'
                onClick={(e) => handleSubmit('addEditModal')}>
                Save
              </Button>
            </Box>
          </Grid>
        </Box>
      </Modal>
      <Modal
        open={openModal.deleteModal}
        onClose={(e) => handleClose('deleteModal')}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'>
        <Box className='modal-style' sx={{ maxWidth: 500 }}>
          <Grid>
            <Grid>
              <Typography variant='h6' gutterBottom>
                Are you sure want to delete?
              </Typography>
              <Box display='flex' justifyContent='end' mt={3}>
                <Button
                  variant='outlined'
                  onClick={(e) => handleClose('deleteModal')}>
                  Cancel
                </Button>
                <Button
                  variant='contained'
                  className='ml10'
                  onClick={(e) => handleDelete('deleteModal')}>
                  Delete
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal
        open={openModal.resultModule}
        onClose={(e) => handleClose('resultModule')}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'>
        <Box className='modal-style' sx={{ maxWidth: 500 }}>
          <Grid>
            <Grid>
              <FormControl variant='standard' sx={{ mb: 3, minWidth: 200 }}>
                <InputLabel id='demo-simple-select-standard-label'>
                  Select student name
                </InputLabel>
                <Select
                  labelId='demo-simple-select-standard-label'
                  id='demo-simple-select-standard'
                  fullWidth>
                  {students?.map((data) => (
                    <MenuItem
                      value={
                        data._id
                      }>{`${data.firstname} ${data.lastname}`}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              <Typography variant='h6' gutterBottom>
                Enter marks based on subject
              </Typography>
              <Grid container columnSpacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id='standard-basic'
                    label='Maths'
                    variant='standard'
                    name='maths'
                    fullWidth
                  />
                  <TextField
                    id='standard-basic'
                    label='English'
                    variant='standard'
                    name='english'
                    fullWidth
                  />
                  <TextField
                    id='standard-basic'
                    label='Hindi'
                    variant='standard'
                    name='hindi'
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id='standard-basic'
                    label='Science'
                    variant='standard'
                    name='science'
                    fullWidth
                  />
                  <TextField
                    id='standard-basic'
                    label='Gujarati'
                    variant='standard'
                    name='gujarati'
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Box display='flex' justifyContent='end' mt={3}>
                <Button
                  variant='outlined'
                  onClick={(e) => handleClose('resultModule')}>
                  Cancel
                </Button>
                <Button variant='contained' className='ml10'>
                  Save
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
};

export default StudentListDashboard;
