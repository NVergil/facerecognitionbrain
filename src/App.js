import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import SignIn from "./components/SignIn/SingIn";
import Register from "./components/Register/Register";
import ParticlesBg from "particles-bg";
import { Component, Fragment } from "react";

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignIn: false,
  imgMessage: "",
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
    // console.log(data);
  };
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box });
  };

  imageSendToRecognition = () => {
    this.setState({ imageUrl: this.state.input });
    if (!this.state.input) {
      this.setState({
        imgMessage: "Insert a valid image url",
      });
      return setTimeout(() => {
        this.setState({
          imgMessage: "",
        });
      }, 2000);
    }
    fetch("https://smart-brain-postgresql-production.up.railway.app/imageurl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("https://smart-brain-postgresql-production.up.railway.app/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      // console.log(
      //   response.outputs[0].data.regions[0].region_info.bounding_box
      // );
      .catch((err) => {
        this.setState({
          imgMessage: "Insert a valid image url",
        });
        return setTimeout(() => {
          this.setState({
            imgMessage: "",
          });
        }, 2000);
      });
  };

  onButtonSubmit = () => {
    this.imageSendToRecognition();
  };

  onEnterKeydown = (event) => {
    if (event.key === "Enter") {
      this.imageSendToRecognition();
    }
  };

  onRouteChange = (route) => {
    if (route === "signin") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    return (
      <div className="App">
        <ParticlesBg type="circle" bg={true} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignIn={this.state.isSignIn}
        />
        {this.state.route === "home" ? (
          <Fragment>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
              onEnterKeydown={this.onEnterKeydown}
              imgUrlMessage={this.state.imgMessage}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </Fragment>
        ) : this.state.route === "signin" ? (
          <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
