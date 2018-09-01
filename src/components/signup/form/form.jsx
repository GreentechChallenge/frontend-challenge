import React from "react";
import { challanges } from "./mock";
import styles from "./form.module.css";

export default class SignupForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            challanges: []
        }
    }

    componentWillMount() {
        challanges.then((response) => {
            console.log(response);
            this.setState({ challanges: response })

        }).catch((err) => {
            console.log(err);
        })
    }

    render() {
        return (
            <form className="col-2 mx-auto">
                <div className="form-group">
                    <label>Phone number (incl. country code) of contact person</label>
                    <select className="input-block">
                        <option value="" disabled selected hidden>Select a Challange</option>
                        {this.state.challanges.map(challange =>
                            <option value={challange.id}>{challange.title}</option>
                        )}
                    </select>
                </div>

                <div className="form-group">
                    <label>Name of contact person</label>
                    <input className="input-block" placeholder="Name of contact person" />
                </div>

                <div className="form-group">
                    <label>Phone number (incl. country code) of contact person</label>
                    <input className="input-block" placeholder="Phone number (incl. country code) of contact person" />
                </div>

                <div className="form-group">
                    <label>Phone number (incl. country code) of contact person</label>
                    <input className="input-block" placeholder="Email of contact person" />
                </div>

                <div className="form-group">
                    <label>Phone number (incl. country code) of contact person</label>
                    <input className="input-block" placeholder="Company registration name" />
                </div>

                <div className="form-group">
                    <label>Phone number (incl. country code) of contact person</label>
                    <input className="input-block" placeholder="Date of Incorporation" />
                </div>

                <div className="form-group">
                    <label>Phone number (incl. country code) of contact person</label>
                    <input className="input-block" placeholder="Company address" />
                </div>

                <div className="form-group">
                    <label>Phone number (incl. country code) of contact person</label>
                    <input className="input-block" placeholder="VAT number (Company registration number)" />
                </div>

                <div className="form-group">
                    <label>Phone number (incl. country code) of contact person</label>
                    <textarea className={"input-block " + styles.textarea} placeholder="Short description of the company" />
                </div>

                <div className="form-group">
                    <label>Phone number (incl. country code) of contact person</label>
                    <input className="input-block" placeholder="Link to company website" />
                </div>

                <div className="form-group">
                    <label>Phone number (incl. country code) of contact person</label>
                    <input className="input-block" placeholder="Link to product/service video (Youtube, Vimeo, etc.)" />
                </div>

                <button className="button-center"> Apply </button>

            </form>
        )
    }
}