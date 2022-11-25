const router = require('express').Router();
const { addAdmin, signIn } = require('../controllers/AdminController');
const { addResult, getResultsAllStudent, getResultOfStudent, updateResult } = require('../controllers/ResultController');
const {addStudent, updateStudent, deleteStudent, getAllStudents, getStudentById } = require('../controllers/StudentController');

router.get('/', async(req,res) => {
    res.send('StudentManagement!')
})
router.post('/add-admin', addAdmin);
router.post('/signin', signIn);
router.post('/add-student', addStudent);
router.get('/list', getAllStudents);
router.get('/:id', getStudentById);
router.put('/update-student/:id', updateStudent);
router.put('/delete-student/:id', deleteStudent);
router.post('/result/add', addResult);
router.get('/result/list', getResultsAllStudent);
router.get('/result/:id', getResultOfStudent);
router.put('/result/:id', updateResult);

module.exports = router