import React, { Component } from "react";

class ImageToggle extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      url: ""
    };
    // console.log('ImageToggle props', props);
    this.state = this.initialState;
  }

  /*    handleChange = event => {
        const { name, value } = event.target;

        this.setState({
            [name] : value
        });
    }
*/

  getFormClass() {
    return this.props.className;
  }

  render() {
    const { imageurl } = this.props;
    // console.log(this.props);
    const cssImage = this.getFormClass();
    // console.log('render cssImage', cssImage);
    // console.log('imageUrl', imageUrl);
    return (
      <div className={cssImage}>
        <img
          style={{ height: "400px" }}
          src={process.env.PUBLIC_URL + "/images/" + imageurl}
          alt=""
        />
      </div>
    );
  }
}

export default ImageToggle;
