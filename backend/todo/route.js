const router=require('express').Router();
const {verifyToken}=require('../src/utils/authToken');
const {todoList,todoCreate,todoDelete,todoUpdate,todoOngoing,todoCompleted}=require('./controller');

router.get('/all',verifyToken,todoList);
router.get('/ongoing',verifyToken,todoOngoing);
router.get('/completed',verifyToken,todoCompleted);
router.post('/create',verifyToken,todoCreate);
router.delete('/delete/:id',verifyToken,todoDelete);
router.patch('/update/:id',verifyToken,todoUpdate);

module.exports=router;