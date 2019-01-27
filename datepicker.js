// Datepicker.open
// Datepicker.close
// Datepicker.getSelected
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
var today = new Date();

function Init(){
	
	var datepicker = document.getElementById('datepicker');
	var dtpContent = document.getElementById('dtp-content');
	var date=document.getElementById('container');
	var month;

	var pickedYear = today.getFullYear();
	var pickedMonth = today.getMonth();
	var pickedDay = today.getDay();

	date.addEventListener('click',handleInputClick);

	function handleInputClick(event){
		var target = event.target;
		var pickTarget = target.innerHTML;
		if(target.tagName==="INPUT"){
			dtpContent.style.display = 'block';
			datepicker.style.boxShadow = '0 0 15px red';
			render();
		}
		else if(target.tagName==="DIV"){
			dtpContent.style.display = 'none';
			datepicker.style.boxShadow = 'none';
			datepicker.value = '';
		}
		else{
			if(pickTarget==='&lt;&lt;'){
				if(pickedMonth===0){
					pickedMonth=11;
					pickedYear--;
				}
				else{
					pickedMonth--;
				}
				render();
			}
			else if(pickTarget==='&gt;&gt;'){
				if(pickedMonth===11){
					pickedMonth=0;
					pickedYear++;
				}
				else{
					pickedMonth++;
				}
				render();
			}
			else if(target.className ==="prevMonthDays"){
				pickedMonth--;
				pickedDay = parseInt(pickTarget);	
				pickNextPrev();
				pickedMonth++;	
			}
			else if(target.className ==="nextMonthDays"){
				pickedMonth++;
				pickedDay = parseInt(pickTarget);	
				pickNextPrev();
				pickedMonth--;
			}
			else if(!isNaN(pickTarget)){
				pickedDay = parseInt(pickTarget);	
				pick();						
			}
		}
	}


	function pick(){
		if(pickedMonth===12){
			datepicker.value = `${pickedDay}.${1}.${pickedYear+1}`;
		}
		else{
			datepicker.value = `${pickedDay}.${pickedMonth+1}.${pickedYear}`;
		}
	}

function pickNextPrev(){
		if((pickedMonth===-1)&(month==="January")){
			datepicker.value = `${pickedDay}.${12}.${pickedYear-1}`;
		}
		else if((pickedMonth===1)&(month==="January")){
			datepicker.value = `${pickedDay}.${2}.${pickedYear}`;
		}
		else{
			pick();
		}
	}


	function render() {
		var weekDays = getWeekDays();
		var monthView = getMonthView();
		month=MONTH_NAMES[pickedMonth];
		var tableHtml = `
			<table width="100%">
				<thead id="tableHead">
					<tr>
						<th class="nextPrev"><<</th>
						<th colspan="5">${month}  ${pickedYear}</th>
						<th class="nextPrev">>></th>
					</tr>
					<tbody>
						${weekDays}
						${monthView}
					</tbody>
				</thead>
			</table>
		`;
		dtpContent.innerHTML = tableHtml;
	}


	function getMonthView(){
		var monthDaysHTML='';
		var monthDays = new Date(pickedYear, pickedMonth+1, 0).getDate();
		var prevMonthDays = new Date(pickedYear, pickedMonth, 0).getDate();
		var nextMonthDays = 1;
		var day = getDay(1, pickedMonth+1, pickedYear)
		for(var i=0,k=1,d=0;i<6;i++){
			monthDaysHTML +='<tr class="monthDaysEmpty">';
			for(var j=0;j<7;j++,d++){
				if(day>0){
					monthDaysHTML+=`<td class="prevMonthDays">${prevMonthDays-day+1}</td>`;
					day--;
				}
				else{
					if(k<=monthDays){
						if((k===today.getDate())&(pickedMonth===today.getMonth())&(pickedYear===today.getFullYear())){
							monthDaysHTML+=`<td class="monthDays" id="today">${k}</td>`;
						}
						else{
							monthDaysHTML+=`<td class="monthDays">${k}</td>`;
						}
						k++;
					}
					else{
						monthDaysHTML+=`<td class="nextMonthDays">${nextMonthDays++}</td>`;
					}

				}
			}
			monthDaysHTML+='</tr>';
		}
		 
		return monthDaysHTML;
	}


	function getWeekDays(){
		var weekdaysHTML = '<tr id="weekdays">';
		var weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
		for(var i=0;i<7;i++){
			weekdaysHTML+=`<td>${weekDays[i]}</td>`;
		}
		weekdaysHTML+='</tr>';
		return weekdaysHTML;
	}
}

function getDay(day,mon,year){
	day=parseInt(day, 10); 
	mon=parseInt(mon, 10); 
	var a=parseInt((14-mon)/12, 10);
	var y=year-a;
	var m=mon+12*a-2;
	var d=(parseInt(day+y+parseInt(y/4, 10)-parseInt(y/100, 10)+parseInt(y/400, 10)+(31*m)/12, 10))%7;
	return d;
   }




document.addEventListener("DOMContentLoaded", function(event) {
	   Init();
});
