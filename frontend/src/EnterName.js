import React from "react";
class EnterName extends React.Component {
  render() {
    return (
      <div className="Enter Name">
        <form>
          <input type="text" id="name" name="name" placeholder="Enter your name" />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default EnterName;
