module.exports = class AuthService {
  constructor(userinfo) {
    this.username = userInfo.username;
  }

  async SignUp(userInputData) {
    try {
      console.log('signup code executed');
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async SignIn(email, password) {
    try {
      console.log('signin code executed');
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}