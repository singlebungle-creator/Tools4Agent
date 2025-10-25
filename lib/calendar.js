var monthList=[["January",31], ["February",28],[ "March",31], ["April",30], ["May",31], ["June",30], ["July",31], ["August",31], ["September",30], ["October",31], ["November",30], ["December",31]];
var dayList=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var today=new Date();

var currentYear=today.getFullYear();
var getFirst=() => {
	var today=new Date();
	var firstDay=(today.getDay()-(today.getDate()-1)%7+7)%7;
	return firstDay;
}
var setCurrentMonth=(_month, _first)=> {
	if (_month<0) {
		currentYear--;
	} else if (_month>11) {
		currentYear++;
	}
	document.getElementById('currentMonth').name=(_month+12)%12;
	document.getElementById('currentMonth').innerText=monthList[(_month+12)%12][0];
	document.getElementById('currentFirst').innerText=_first;
}

var prevMonth=() => {
	setCurrentMonth(document.getElementById('currentMonth').name-1, (7+document.getElementById('currentFirst').innerText-monthList[(document.getElementById('currentMonth').name+11)%12][1]%7)%7);
	document.getElementById('calendar').innerHTML=drawCalendar(document.getElementById('currentMonth').name, document.getElementById('currentFirst').innerText);
	document.getElementById('currentYear').innerText=currentYear;
}

var nextMonth=() => {
	setCurrentMonth(document.getElementById('currentMonth').name+1,(document.getElementById('currentFirst').innerText+monthList[document.getElementById('currentMonth').name][1]%7)%7);
	document.getElementById('calendar').innerHTML=drawCalendar(document.getElementById('currentMonth').name, document.getElementById('currentFirst').innerText);
	document.getElementById('currentYear').innerText=currentYear;
}

var writeSchedule=(_date) => {
	document.getElementById(`thisMonth_${_date}`).innerHTML=`
	<form action='/calendar/schedule' method='POST'>
		<input style="width:90%" type='text' name='content'>
		<input type="hidden" name='y' value='${document.getElementById('currentYear').innerText}'>
		<input type="hidden" name='m' value='${document.getElementById('currentMonth').name+1}'>
		<input type="hidden" name='d' value='${_date}'>
		<input type='submit'>
	</form>
	`;
}

var drawCalendar=(_month, _first) => {
	var tmp=`
	<table style="width:50%; aspect-ratio:1; table-layout: fixed; border:1px solid black">
		<tr>\n`;

	dayList.forEach(day => {
		tmp+=`<th scope='col'>${day.substr(0,3)}</th>\n`;
	});
	tmp+=`</tr>\n`;
	var lastMonthCount=monthList[(_month+11)%12][1]+1-_first;
	var dateCount=1;
	var nextMonthCount=1;
	for (var i=0;i<6;i++) {
		tmp+=`<tr class="date">\n`;
		dayList.forEach(day => {
			if ((i===0)&&(dayList.indexOf(day)<_first)) {
				tmp+=`<td class="lastMonth">${lastMonthCount}</td>\n`;
				lastMonthCount++;
			}
			else {
				if (dateCount<=monthList[_month][1]) {
					tmp+=`<td class="thisMonth" id='thisMonth_${dateCount}'><button onclick='writeSchedule(${dateCount})'>${dateCount}</button>`;
					var fileName=`${document.getElementById('currentYear').innerText}_${_month+1}_${dateCount}`;

					if (document.getElementById(fileName)) {
						tmp+=`<p>${document.getElementById(fileName).innerText}</p>`;
					}
					tmp+=`</td>\n`;
					dateCount++;
				}
				else {
					tmp+=`<td class="nextMonth">${nextMonthCount}</td>\n`;
					nextMonthCount++;
				}
			}
		});
	}
	tmp+=`</div>\n`;
	return tmp+`</tr>\n`;
}

