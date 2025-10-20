const express=require('express');
const router=express.Router();

const template=require('../lib/template.js');

router.get('/', (req,res) => {
	var title='Welcome';
	var description='Tools 4 Agent main page';
	var html=template.html(title,'',description);
	res.send(html);
});

module.exports=router;
