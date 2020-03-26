import React from "react"

class Player extends React.Component{
    

    render(){
        return (
            <span className="Player">
                <img src={require("./player1.jpg")} alt={this.props.name} height="200" width="200"/>

            </span>
        )
    }
}


export default Player;