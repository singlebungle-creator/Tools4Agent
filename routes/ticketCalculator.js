const express=require('express');

const template=require('../lib/template.js');

const router=express.Router();

router.get('/', (req,res) => {
	var title='식권계산기';
	var html=template.html(title,'',template.survey());
	res.send(html);
});

module.exports=router;
