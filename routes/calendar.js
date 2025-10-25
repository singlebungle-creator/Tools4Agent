const express=require('express');
const router=express.Router();
const fs=require('fs');

const template=require('../lib/template.js');

router.get('/', (req,res) => {
	var fileDict={};
	fs.readdir('./data/calendar', (err, filelist) => {
		if (err) throw err;
		filelist.forEach(title => {
			fileDict[title]=fs.readFileSync(`./data/calendar/${title}`,'utf-8')
		});
		var title="달력";
		var html=template.html(title, '', template.calendar(fileDict));
		res.send(html);
	});
});

router.post('/schedule', (req,res) => {
	var post=req.body;
	var y=post.y;
	var m=post.m;
	var d=post.d;
	var title=`${y}_${m}_${d}`
	fs.writeFile(`data/calendar/${title}`,post.content, 'utf-8', (err) => {
		if (err) throw err;
		res.redirect('/calendar');
	});
});

module.exports=router;
