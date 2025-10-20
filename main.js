//libraries
const express=require('express');
//const fs=require('fs');
//const url=require('url');
const path=require('path');
//const qs=require('querystring');

//routes&module
const indexRouter=require('./routes/index');
const noticeRouter=require('./routes/notice');
const toolsRouter=require('./routes/tools');

//third-party middlewares
const bodyParser=require('body-parser');

const app=express();
const port=1236;

app.use(bodyParser.urlencoded({extended: false}));

app.use('/lib', express.static(path.join(__dirname, 'lib')));
app.use('/',indexRouter);
app.use('/notice',noticeRouter);
app.use('/tools',toolsRouter);

//app.use((req,res,next) => {
//	res.status(404).send('Sorry cant find that!');
//});

//app.use((err, req,res,next) => {

//	console.error(err.stack);
//	res.status(500).send('Somethign broke!');
//});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
