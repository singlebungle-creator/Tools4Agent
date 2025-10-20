const express=require('express');
const router=express.Router();
const path=require('path');
const fs=require('fs');
const sanitizeHtml=require('sanitize-html');

const template =require('../lib/template.js');

router.get('*splat', (req,res,next) => {
	fs.readdir('./data/notice', (err, filelist) => {
		req.list=filelist;
		next();
	});
});
router.get('/', (req,res) => {
	var list=template.list(req.list);
	var title='공지사항';
	var html=template.html(title,`
	<a href='/notice/create'>글쓰기</a>
	`, list);
	res.send(html);
});

router.get('/create', (req,res) => {
	var title='글쓰기';
	var html=template.html(title, '', `
	<form action'/notice/create', method='POST'>
	<p><input type='text' name='title' placeholder='title'></p>
	<p><textarea name='description' placeholder='description'></textarea></p>
	<p><input type='submit'></p>
	</form>
	`);
	res.send(html);
});

router.post('/create', (req,res) => {
	var post=req.body;
	console.log(post);
	var title=post.title;
	var description=post.description;
	fs.writeFile(`data/notice/${title}`, description, 'utf-8', (err) => {
		if (err) throw err;
		res.redirect(`/notice/${title}`);
	});
});

router.get('/update/:pageId', (req,res) => {
	var filteredId=path.parse(req.params.pageId).base;
	fs.readFile(`data/notice/${filteredId}`, 'utf-8', (err, description) => {
		if (err) throw err;
		var html=template.html(filteredId, `<a href='/notice'>되돌아가기</a>`, `
		<form action='/notice/update/:${filteredId}' method='POST'>
		<input type="hidden" name='id' value='${filteredId}'>
		<p><input type='text' name='title' placeholder='title' value='${filteredId}'></p>
		<p><textarea name='description' placeholder='description'>${description}</textarea></p>
		<p><input type='submit'></p>
		</form>
		`);
		res.send(html);
	});
});

router.post('/update/:pageId', (req,res) => {
	var post=req.body;
	var id=post.id;
	var title=post.title;
	var description=post.description;
	fs.rename(`./data/notice/${id}`, `./data/${title}`, (err) => {
		if (err) throw err;
		fs.writeFile(`data/notice/${title}`, description,'utf-8', (err) => {
			if (err) throw err;
			res.redirect(`/notice/${title}`);
		});
	});
});

router.post('/delete', (req,res) => {
	var post=req.body;
	var id=post.id;
	fs.unlink(`data//notice/${id}`, (err) => {
		if (err) throw err;
		res.redirect('/notice');
	});
});

router.get('/:pageId', (req,res,next) => {
	var filteredId=path.parse(req.params.pageId).base;
	fs.readFile(`data/notice/${filteredId}`, 'utf-8', (err, description) => {
		if (err) next(err); else {
			var sanitizedTitle=sanitizeHtml(req.params.pageId);
			var sanitizedDescription=sanitizeHtml(description);
			var list=template.list(req.list);
			var html=template.html(sanitizedTitle, `<a href='/notice'>되돌아가기</a>
				<a href='/notice/update/${sanitizedTitle}'>수정하기</a>
				<form action='/notice/delete' method='POST'>
				<input type='hidden' name='id' value='${sanitizedTitle}'>
				<input type='submit' value='삭제하기'></form>`, `<h2>${sanitizedTitle}</h2>
				<p>${sanitizedDescription}</p>
				`);
			res.send(html);
		}
	});
});

module.exports=router;
