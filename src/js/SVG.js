import React, { Component } from 'react';

const svg = {
    iamport : 'M3.75,3.31h0a.14.14,0,0,1,0,.17l-.21.2a.1.1,0,0,1-.16,0,.12.12,0,0,1,0-.17l.2-.2a.14.14,0,0,1,.17,0',
}

class SVG extends Component {
    render() {
        return(
            <svg
                x="0px" y="0px"
                width={this.props.width ? this.props.width : "auto"}
                height={this.props.height ? this.props.height : "auto"}
                viewBox="0 0 645.698 136.753">
                <path
                fill={this.props.color}
                d={svg[this.props.name]}
                />
            </svg>
        );
    }
}

export default SVG;