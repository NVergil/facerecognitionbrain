import React from "react";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: "",
      signInPassword: "",
      message: "",
      message2: "",
    };
  }
  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };
  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmitSignIn = async () => {
    if (!this.state.signInEmail) {
       this.setState({
        message: "Please enter an email",
      })
      return setTimeout(() => {
        this.setState({
          message: "",
        });
      }, 2000);
    } else if (!this.state.signInPassword) {
      this.setState({
        message2: "Please enter your password",
      });
      return setTimeout(() => {
        this.setState({
          message2: "",
        });
      }, 2000);
    }
    let res = await fetch("https://smart-brain-postgresql-production.up.railway.app/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    });
    let json = await res.json();
    if (json.id) {
      this.props.loadUser(json);
      return this.props.onRouteChange("home");
    }
    if (res.status === 202) {
      this.setState({
        message2: `${json.message}`
      });
    }
    if (res.status === 203) {
      this.setState({
        message: `${json.message}`,
      });
    }
    setTimeout(() => {
      this.setState({
        message: "",
        message2: "",
      });
    }, 2000);
  };
  // console.log(this.state);
  handleSubmit(e) {
    e.preventDefault();
    // console.log("You clicked submit.");
  }
  render() {
    const { onRouteChange } = this.props;
    return (
      <article className="formMobile br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black">
          <form className="measure" onSubmit={this.handleSubmit}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f4" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="b--black pa2 input-reset ba bg-transparent hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
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
                  onChange={this.onPasswordChange}
                />
                <p>{this.state.message2}</p>
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={this.onSubmitSignIn}
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => onRouteChange("register")}
                href="#0"
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </form>
        </main>
      </article>
    );
  }
}

export default SignIn;
