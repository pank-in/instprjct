const unlockPaths=[
	'/',
	'/login',
	'/signup'
];

function auth(ctx, next){
	const user=firebase.auth().currentUser;
  if(user) {
  		ctx.user = user.toJSON();
  		return	next();	
  } else  if (!unlockPaths.includes(ctx.pathname)) {
  		page.redirect('/login');
  }
  next();
}
