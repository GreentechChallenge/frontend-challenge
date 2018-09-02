import React from "react";

export default class TextArea extends React.Component {

    resize(e) {
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    }

    autoGrowTextArea(e) {
        e = e.target;
        console.log(e);
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
                onChange={(e) => {
                    this.resize(e);
                    if (this.props.onChange) {
                        this.props.onChange(e);
                    }
                }}>
                {this.props.children}
            </textarea >
        );
    }
}