const express=require('express');
const router=express.Router();
const multer=require('multer');
const path=require('path');
const fs=require('fs');

const template=require('../lib/template.js');

router.use(express.static('../data/fileUpload'));

try {
	fs.readdirSync('./data/fileUpload');
	console.log('./data/fileUpload 폴더가 있습니다');
} catch(err) {
	console.error('./data/fileUpload 폴더가 없습니다. 폴더를 생성합니다.');
	fs.mkdirSync('data/fileUpload');
}

const upload=multer({
	storage: multer.diskStorage({
		destination: (req,file,done) => {
			done(null,'./data/fileUpload');
		},
		filename: (req,file,done) => {
			const ext=path.extname(file.originalname);
			console.log(`ext: ${ext}`);
			done(null, Date.now()+path.basename(file.originalname, ext)+ext);
		}
	}),
	limits: { fileSize: 5*1024*1024 }
});

router.get('/', (req,res) => {
	fs.readdir('./data/fileUpload', (err, filelist) => {
		var list=template.fileList(filelist);
		var title='파일 공유';
		var html=template.html(title,`
		<a href='/tools/fileUpload/upload'>업로드</a>
		`,list);
	res.send(html);
	});
});

router.get('/upload', (req,res) => {
	var title='업로드';
	var html=template.html(title,'',template.uploadFile);
	res.send(html);
});

router.post('/upload', upload.array('files'), (req,res,next) => {
	res.redirect('/tools/fileUpload');
});

router.get('/download/:fileName', (req,res,next) => {
	var fileName=path.parse(req.params.fileName).base;
	res.download(`./data/fileUpload/${fileName}`,`${fileName}`);
});

router.get('/delete/:fileName', (req,res,next) => {
	var fileName=path.parse(req.params.fileName).base;
	fs.unlink(`data/fileUpload/${fileName}`, (err) => {
		if (err) throw err;
		res.redirect('/tools/fileUpload');
	});
});
module.exports=router;
