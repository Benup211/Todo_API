const router=require('express').Router();
const {verifyToken}=require('../src/utils/authToken');
const {todoList,todoCreate,todoDelete,todoUpdate}=require('./controller');

router.get('/all',verifyToken,todoList);
router.post('/create',verifyToken,todoCreate);
router.delete('/delete/:id',verifyToken,todoDelete);
router.patch('/update/:id',verifyToken,todoUpdate);

module.exports=router;