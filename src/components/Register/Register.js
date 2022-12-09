import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      message: "",
    };
  }
  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };
  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };
  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };
  onSubmitRegister = async () => {
    let { email, password, name } = this.state;
    if (!email || !password || !name) {
      return;
    }
    if (password.length < 6) {
      return;
    }
    let res = await fetch("https://smart-brain-postgresql-production.up.railway.app/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
      }),
    });
    let json = await res.json();
    if (res.status === 202) {
      this.setState({
        message: `${json.message}!!`,
      });
    } else {
      this.props.loadUser(json);
      this.props.onRouteChange("signin");
    }
    setTimeout(() => {
      this.setState({
        message: "",
      });
    }, 2000);
    // console.log(this.state);
  };

  handleSubmit(e) {
    e.preventDefault();
    // console.log("You clicked submit.");
  }

  render() {
    return (
      <article className="formMobile br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <form className="measure " onSubmit={this.handleSubmit}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f4" htmlFor="name">
                  Name
                </label>
                <input
                  className="b--black pa2 input-reset ba bg-transparent hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  required
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f4" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="b--black pa2 input-reset ba bg-transparent hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  required
                  onChange={this.onEmailChange}
                />
                <p>{this.state.message}</p>
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f4" htmlFor="password">
                  Password
                </label>
                <input
                  className="b--black pa2 input-reset ba bg-transparent hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  required
                  onChange={this.onPasswordChange}
                  minLength="6"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib"
                type="submit"
                value="Register"
                onClick={this.onSubmitRegister}
              />
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default Register;
