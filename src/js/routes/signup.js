function signup(){
		render('signup');

 let form = document.getElementById('signup-form');
 let {email, password, password_confirm} = form;

// 1. нет обработки серверных ошибок
// 2. нет обработки успешного создания
// 3. нет инфорормативности при валидации
// 4. 

 form.addEventListener('submit', submitHandler);
 	function submitHandler(e){

 	if ((email.value.indexOf('.')=== -1) || (email.value.indexOf('@')=== -1) || (password.value.length < 6) || (password.value !== password_confirm.value)) {
 		alert("EROOOOOR") ;
 	} else {firebase.auth()};
 	firebase.auth().createUserWithEmailAndPassword(email.value, password.value);

 		e.preventDefault();
 	}
}