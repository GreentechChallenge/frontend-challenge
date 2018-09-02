import React from "react";

export default class TextArea extends React.Component {

    autoGrowTextArea(e) {
        e = e.target;
        if (e.clientHeight < e.scrollHeight) {
            e.style.height = e.scrollHeight + "px";
            if (e.clientHeight < e.scrollHeight) {
                e.style.height =
                    (e.scrollHeight * 2 - e.clientHeight) + "px";
            }
        }
    }


    render() {


        return (
            <textarea {...this.props}
                style={{ overflow: "hidden" }}
                onKeyUp={(e) => {
                    this.autoGrowTextArea(e);
                    if (this.props.onKeyUp) {
                        this.props.onKeyUp(e);
                    }
                }}>
                {this.props.children}
            </textarea >
        );
    }
}