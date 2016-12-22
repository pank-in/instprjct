function signup(ctx, next) {
  if (ctx.user) {
    return page.redirect('/profile');
  }

  render('signup');

  const signupForm      = document.forms['signup-form'];
  const errorsContainer = qs('#errors', signupForm);
  const auth            = firebase.auth();
  const signButton      = qs('.btn', signupForm);

  function renderErrors(errors = []) {
   return [].concat(errors).map(err => {
      return `
        <li class="list-group-item list-group-item-danger">
          <span>${err}</span>
        </li>
      `;
    }).join('');
  }

  function showErrors(errors = []) {
    errorsContainer.innerHTML = renderErrors(errors);
    errorsContainer.hidden = false;
  }

  function hideErrors() {
    errorsContainer.hidden = true;
    errorsContainer.innerHTML = '';
  }

  function onUserCreated(user) {
    // const usersRef = firebase.database().ref(`users/${user.uid}`);
    // const userData = pick(user, ['uid', 'email', 'displayName', 'photoURL']);
    // usersRef.set(userData)
    //   .then(() => {
    //     user.sendEmailVerification();
        page('/profile');
    //   });
  }

  function onUserCreationError(error) {
    unsetLoadingState();
    return showErrors(error.message);
  }

  function unsetLoadingState(){
  	signButton.removeAttribute('disabled', 'disabled');
    signupForm.classList.remove('is-loading');
  }

  function setLoadigState(){
  		signButton.setAttribute('disabled', 'disabled');
    	signupForm.classList.add('is-loading');
   }

  function handler(e) {
    const form = e.target;
    const { email, password, password_confirm } = form.elements;
    const errors = [];

    if (email.value.indexOf('@') === -1) {
      errors.push('Email is invalid');
    }

    if (!password.value.length) {
      errors.push('Please enter password');
    } else if (password.value !== password_confirm.value) {
      errors.push('Password is incorrect');
    }

    e.preventDefault();

    if (errors.length) {
      return showErrors(errors);
    }

     setLoadigState();

    hideErrors();
    auth
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(onUserCreated)
      .catch(onUserCreationError);

    
  }

  signupForm.addEventListener('submit', handler);
}
