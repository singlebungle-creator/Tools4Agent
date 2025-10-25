var getTotal=()=> {
	var tmp=1000*document.getElementById('one_th').value+5000*document.getElementById('five_th').value+10000*document.getElementById('ten_th').value+50000*document.getElementById('fifty_th').value;
	document.getElementById('total').value=tmp;
};

var getResult=()=> {
	getTotal();
	var total=document.getElementById('total').value;
	var result=(total-100000)/3000;
	var display=` ${total}
-100000
--------
 ${total-100000} = ${result} x 3000`;
	document.getElementById('display').value=display;
	document.getElementById('result').value=result+Number(document.getElementById('recipient').value);

};


var increase=(n)=> {
	n.value++;
};
var decrease=(n)=> {
	n.value--;
};
