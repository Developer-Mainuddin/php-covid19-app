document.querySelector("#gen").addEventListener("click",function(){
	
	//PASS Generate
		document.querySelector("#myProgress").style.width="170px";
 document.querySelector("#myBar").setAttribute("style","width:100%;background:green;color:black");
 document.querySelector("#strength").innerHTML = "Strong";
  document.querySelector("#strength").style.color= "white";
	
	doGenerate();
	
	
	
	//PASS Generate
	
	
	
});

document.querySelector("#pwd").addEventListener("keyup",function(){
		document.querySelector("#myProgress").style.width="170px";
	var pass = this.value;
    if(pass===""){
			document.querySelector("#myProgress").style.width="0px";
	}
	function scorePassword(pass) {
    var score = 0;
    if (!pass)
        return score;

    // award every unique letter until 5 repetitions
    var letters = new Object();
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    var variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

    variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score);
}


if( scorePassword(pass) < 30){

 document.querySelector("#myBar").setAttribute("style","width: "+scorePassword(pass)+"%;background:red");
 document.querySelector("#strength").innerHTML = "Weak";
  document.querySelector("#strength").style.color= "black";
	
}else if( scorePassword(pass) < 60 && scorePassword(pass) > 30){

 document.querySelector("#myBar").setAttribute("style","width: "+scorePassword(pass)+"%;background:yellow;color:black");
 document.querySelector("#strength").innerHTML = "Good";
 document.querySelector("#strength").style.color= "black";
	
}else if( scorePassword(pass) > 80){

 document.querySelector("#myBar").setAttribute("style","width:100%;background:green;color:black");
 document.querySelector("#strength").innerHTML = "Strong";
  document.querySelector("#strength").style.color= "white";
	
}
		
})


document.querySelector("#gen").addEventListener("click",function(){
	
	//Generate Password Function
function generatePassword(upper, lower, number, symbol, length){
    let generatedPassword = "";

    const typesCount = upper + lower + number + symbol;

    //console.log(typesCount);

    const typesArr = [{upper}, {lower}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    if(typesCount === 0) {
        return '';
    }

    for(let i=0; i<length; i+=typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);


    return finalPassword;
}
	
})



//RegExp
/**
document.querySelector("#emailBox").addEventListener("input",function(){
	
	var getMail = this.value;
	
	    var  re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var result =  re.test(String(getMail).toLowerCase());
	
	if(result === false){
	document.querySelector("#mailError").innerHTML = "Invalid Email";
	}else{
		document.querySelector("#mailError").innerHTML = "";
	}
	
});**/







