module.exports={
	html:(_title, _control, _body) => {
		return `<!DOCTYPE html>
		<html>
		<head>
			<title>Agent - ${_title}</title>
			<meta charset='utf-8'>
		</head>
		<body>
			<h1><a href='/'>Tools4Agent</a></h1>
			<div>
			<ul>
			<li><a href='/notice'>공지사항</a></li>
			<li>도구
			<ul>
				<li><a href='/tools/ticketCalculator'>
				식권 계산기</a></li>
				<li><a href='/tools/survey'>설문조사</a></li>
				<li><a href='/tools/fileUpload'>파일 업로드</a></li>
			</ul>
			</li>
			<li>바로가기
			<ul>
			<li><a href='/shortcuts/menu'>식단표</a></li>
			<li><a href='/shortcuts/timetable'>시간표</a></li>
			<li><a href='/shortocuts/weather'>일기예보</a></li>
			</ul>
			</li>
			</ul>
			</div>
			${_control}
			${_body}
		</body>
		</html>
		`;
	},
	list: (_list) => {
		var tmp=`<ul>`;
		_list.forEach(element => {
			tmp+=`<li><a href="/notice/${element}">${element}</a></li>\n`;
		});
		return tmp+=`</ul>`;
	}
}
