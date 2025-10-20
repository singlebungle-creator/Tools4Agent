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
				<li><a href='/tools/ticketCalculator'>식권 계산기</a></li>
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
	survey: () => {
		var tmp=`
			<script src="/lib/survey.js"></script>
			<table>
				<tr>
					<th scope='col'>1천</th>
					<td><button onclick="increase(document.getElementById('one_th'))">△</td>
					<th scope='col'>5천</th>
					<td><button onclick="increase(document.getElementById('five_th'))">△</td>
					<th scope='col'>1만</th>
					<td><button onclick="increase(document.getElementById('ten_th'))">△</td>
					<th scope='col'>5만</th>
					<td><button onclick="increase(document.getElementById('fifty_th'))">△</td>
					<td scope='col' colspan='2'><button onclick='getResult()'>ENTER</button></td>
				</tr>
				<tr>
					<td><input type="text" id='one_th'></td>
					<td><button onclick="decrease(document.getElementById('one_th'))">▽</td>
					<td><input type="text" id='five_th'></td>
					<td><button onclick="decrease(document.getElementById('five_th'))">▽</td>
					<td><input type="text" id='ten_th'></td>
					<td><button onclick="decrease(document.getElementById('ten_th'))">▽</td>
					<td><input type="text" id='fifty_th'></td>
					<td><button onclick="decrease(document.getElementById('fifty_th'))">▽</td>
				</tr>

				<tr>
					<th scope='col' colspan='2'>총액</th>
					<th scope='col' colspan='2'>거스름돈</th>
					<th scope='col' colsapn='2'>단가</th>
					<th scope='col' colspan='2'>수급자 수</th>
					<td><button onclick="increase(document.getElementById('recipient'))">△</td>
				</tr>
				<tr>
					<td colspan='2'><input type="text" id="total"></td>
					<td colspan='2'><input type="text" id="remain" value=100000></td>
					<td colspan='2'><input type="text" id="unitPrice" value=3000></td>
					<td><input type="text" id="recipient"></td>
					<td><button onclick="decrease(document.getElementById('recipient'))">▽</td>
				</tr>
				<tr>
					<td colspan='5'><textarea style='width:350px; height:80px;' id='display'></textarea></td>
				</tr>
				<tr>
					<td colspan='5'><input type='text' id='result'></td>
				</tr>
			</table>
			`;
		return tmp;
	},
	list: (_list) => {
		var tmp=`<ul>`;
		_list.forEach(element => {
			tmp+=`<li><a href="/notice/${element}">${element}</a></li>\n`;
		});
		return tmp+=`</ul>`;
	}
}
