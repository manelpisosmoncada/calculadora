$(document).ready(function(){

	$("#capital").blur(function(){
		//num = parseFloat(capital.value.replace(/[^0-9-,]/g, ''));
		num = parseFloat(capital.value);
		$(this).val(formatMoney(num));
		Calculate();
	});

	$("#interest").blur(function(){
		num = parseFloat(interest.value);
		$(this).val(formatMoney(num, 2, "%"));
		Calculate();
	});

	$("#years").blur(function(){
		Calculate();
	});

	$("#payment").blur(function(){
		Calculate();
	});

	$("#fixCapital").click(function(){
		$(this).toggleClass('open');
		$("#fixPayment").toggleClass('open');
		if ($("#capital").attr("disabled")) {
			$("#capital").removeAttr("disabled");
			$("#payment").attr("disabled", "disabled")
		} else {
			$("#capital").attr("disabled", "disabled");
			$("#payment").removeAttr("disabled");
    }
	});

	$("#fixPayment").click(function(){
		$(this).toggleClass('open');
		$("#fixCapital").toggleClass('open');
		if ($("#payment").attr("disabled")) {
			$("#payment").removeAttr("disabled");
			$("#capital").attr("disabled", "disabled");
		} else {
			$("#payment").attr("disabled", "disabled");
			$("#capital").removeAttr("disabled");
    }
	});

});

function Calculate() {
	var Capital = parseFloat(capital.value.replace(/[^0-9-,]/g, ''));
	var Interest = parseFloat(interest.value);
	var Months = parseFloat(years.value) * 12;

	payment.value = formatMoney(Payment(Capital, Months, Interest));
	total.value = formatMoney((parseFloat(payment.value.replace(/[^0-9-,]/g, '')) * Months).toFixed(2));
	total_interest.value = formatMoney((parseFloat(total.value.replace(/[^0-9-,]/g, '')) - Capital).toFixed(2));
}

function Payment(Amount, Months, Interest){
	var result = 0;

	if(Interest == 0){
		result = Amount / Months;
	}
	else {
		Interest = Interest/100/12;
		i_to_m = Math.pow((Interest + 1), Months);
		p =  Amount * ((Interest * i_to_m) / (i_to_m - 1));
		result = p.toFixed(2);
	}
	return result;
}

function Capital(Payment, Months, Interest){
	var result = 0;

	if(Interest == 0){
		result = Amount / Months;
	}
	else {
		Interest = Interest/100/12;
		i_to_m = Math.pow((Interest + 1), Months);
		p =  Amount * ((Interest * i_to_m) / (i_to_m - 1));
		result = p.toFixed(2);
	}
	return result;
}

function formatMoney(amount, places, symbol, thousand, decimal){
	places = !isNaN(places = Math.abs(places)) ? places : 2;
	symbol = symbol !== undefined ? symbol : "€";
	thousand = thousand || ".";
	decimal = decimal || ",";
	var number = amount, 
	    negative = number < 0 ? "-" : "",
	    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
	    j = (j = i.length) > 3 ? j % 3 : 0;
	return negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "") + " " + symbol;
};
