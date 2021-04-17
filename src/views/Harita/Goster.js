import React, { Component } from "react";
import MyMap from "./Harita";

class Goster extends Component {
    render(){
        return(
            <div>
                <MyMap lat={41.279703} lon={36.336067} zoom={10} />
            </div>
        );
    }
}

export default Goster;
