function validateFormOnSubmit() {
	var reason = "";

	reason = validateUsername(document.loginForm.j_username);
	if (reason != "") {
		alert("Formato de dados inv�lido:\n" + reason);
		return false;
	}

	reason = validatePassword(document.loginForm.j_password);
	if (reason != "") {
		alert("Formato de dados inv�lido:\n" + reason);
		return false;
	}

	if (document.loginForm.cAnswer) reason = validateCaptcha(document.loginForm.cAnswer);
	if (reason != "") {
		alert("Formato de dados inv�lido:\n" + reason);
		return false;
	}
	return true;
}

function validateUsername(fld) {
	var error = "";
	var ER = /^[a-z][a-z0-9\\-]{2,49}$/;

	if (!ER.test(fld.value)) {
		error = 'O login dever� ter no m�nimo 3 e no m�ximo 50 caracteres.\nS� poder� conter letras min�sculas, n�meros, pontos e h�fens.\nO primeiro caracter dever� ser, obrigatoriamente, uma letra.\n';
	}

	if (error == "") {
		fld.style.background = 'White';
	} else {
		fld.focus();
		fld.style.background = 'Yellow';
	}
	return error;
}

function validatePassword(fld) {
	var error = "";
	if (fld.value == "") {
		error = 'A senha n�o pode ser nula.\n';
	}

	if (error == "") {
		fld.style.background = 'White';
	} else {
		fld.focus();
		fld.style.background = 'Yellow';
	}

	return error;
}

function validateCaptcha(fld) {
	var error = "";
	var ER = /^[0-9]{4}$/;
	
	if (!ER.test(fld.value)) {
		error = 'O c�digo CAPTCHA deve conter 4 n�meros.\n';
	}

	if (error == "") {
		fld.style.background = 'White';
	} else {
		fld.focus();
		fld.style.background = 'Yellow';
	}
	
	return error;
}

function checkCapsLock(e) {
	//Author: Aditya Acharya
	var charKeyCode = e.keyCode ? e.keyCode : e.which;
	var shiftKey = e.shiftKey ? e.shiftKey : ((charKeyCode == 16) ? true : false);
	if (((charKeyCode >= 65 && charKeyCode <= 90) && !shiftKey) || ((charKeyCode >= 97 && charKeyCode <= 122) && shiftKey)) {
		document.getElementById('box_login_capslock').style.display = 'inherit';
	} else {
		document.getElementById('box_login_capslock').style.display = 'none';
	}
}

function reloadCaptchaImage() {
	document.getElementById('box_captcha_image').src = "/idp/images/captcha.png?" + Math.random();
	document.getElementById('box_captcha_answer').value = "";
}

function loginFieldFocus() {
	document.loginForm.j_username.focus();
}

function captchaFieldFocus() {
	document.loginForm.cAnswer.focus();
}

function submitButtonFocus() {
	document.loginForm.submit.focus();
}

function captchaPlayAudio() {
	try {
		var audioElement = document.createElement('audio');
		audioElement.setAttribute('src', '/idp/audio/captcha.wav?' + Math.random());
		audioElement.play();
	}
	catch (e) {
		window.open('/idp/audio/captcha.wav?' + Math.random(),'_blank');
	}
}

function checkPopupBlocker() {
    var popup = window.open('','','width=1,height=1,left=0,top=0,scrollbars=no');
    if (popup) {
        return false;
    } else {
        popup.close();
        return true;
    }
}