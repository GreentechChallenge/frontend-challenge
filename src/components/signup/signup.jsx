import React from "react";
import banner from "./../../assets/banner.jpg";
import styles from "./signup.module.css";
import SignupForm from "./form/form";
import ProgressBar from "react-progress-bar-plus";
import "react-progress-bar-plus/dist/react-progress-bar-plus.css";
import Success from "./success/success";


class Signup extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: -1,
            successRender: false
        };

        this.handleSuccessSubmit = this.handleSuccessSubmit.bind(this);
    }


    handleLoading(status) {
        if (status) {
            this.setState({
                loading: 0
            });
        } else {
            this.setState({
                loading: 100
            });
        }
    }

    handleSuccessSubmit() {
        this.setState({
            successRender: true
        });
    }


    render() {
        return (
            <React.Fragment>
                <ProgressBar percent={this.state.loading} autoIncrement={true} spinner={false} />
                <div className="row">
                    <div className="col">
                        <div className={"mx-auto my-3 " + styles.banner}>
                            <img src={banner} alt="Greentech Challenge" />
                        </div>
                        <h1 className="text-center mb-1">Interest form for GREENTECH CHALLENGE</h1>
                        <p>Thank you for your interest in Green Tech Challenge. This is a non-binding Interest Form for participation in GREENTECH CHALLENGE. After submitting, you will receive a direct link to fill out your application through a section of more elaborate questions regarding your company.</p>
                        <p>We look very much forward to reading your application. If you have any questions please do not hesitate to get in touch at <a href="mailto:info@greentechchallenge.eu">info@greentechchallenge.eu</a>.</p>
                        <p>Thank you in advance. </p>

                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        {(!this.state.successRender)
                            ? <SignupForm successSubmit={this.handleSuccessSubmit} onLoading={(status) => this.handleLoading(status)} />
                            : <Success />
                        }
                    </div>
                </div>

            </React.Fragment>

        );
    }
}

export default Signup;