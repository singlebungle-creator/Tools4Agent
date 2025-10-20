const express=require('express');

const router=express.Router();

const toolsRouter_ticketCalculator=require('./ticketCalculator');
//const toolsRouter_survey=require('survey');
//const toolsRouter_fileUpload('fileUpload');

router.use('/ticketCalculator', toolsRouter_ticketCalculator);
//router.use('/survey', toolsRouter_survey);
//router.use('/fileUpload', toolsRouter_fileUpload);

module.exports=router;
