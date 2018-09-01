import React from "react";
import { challanges } from "./mock";
import styles from "./form.module.css";
import Geosuggest from 'react-geosuggest';
import { GoogleSearch } from "../../../shared/google/autoComplete";

export default class SignupForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            challanges: []
        }
    }

    componentWillMount() {
        challanges.then((response) => {
            this.setState({ challanges: response })

        }).catch((err) => {
            console.error(err);
        })



    }

    handleSearch(e) {

    }


    render() {
        return (
            <form className="col-2 mx-auto">
                <div className="form-group">
                    <label>Select a Challange</label>
                    <select className="input-block">
                        <option defaultValue="" disabled hidden>Select a Challange</option>
                        {this.state.challanges.map(challange =>
                            <option key={challange.id} value={challange.id}>{challange.title}</option>
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
                    <label>Email of contact person</label>
                    <input className="input-block" placeholder="Email of contact person" />
                </div>

                <div className="form-group">
                    <label>Company registration name</label>
                    <input className="input-block" placeholder="Company registration name" />
                </div>

                <div className="form-group">
                    <label>Date of Incorporation</label>
                    <input className="input-block" placeholder="Date of Incorporation" />
                </div>

                <div className="form-group">
                    <label>Company address</label>
                    <GoogleSearch input={<input ref={(input) => this.search = input}></input>} onOpen={this.handleSearch} onClose={this.handleSearch} className="input-block" placeholder="Company address" >

                    </GoogleSearch>


                </div>

                <div className="form-group">
                    <label>VAT number (Company registration number)</label>
                    <input className="input-block" placeholder="VAT number (Company registration number)" />
                </div>

                <div className="form-group">
                    <label>Short description of the company</label>
                    <textarea className={"input-block " + styles.textarea} placeholder="Short description of the company" />
                </div>

                <div className="form-group">
                    <label>Link to company website</label>
                    <input className="input-block" placeholder="Link to company website" />
                </div>

                <div className="form-group">
                    <label>Link to product/service video (Youtube, Vimeo, etc.)</label>
                    <input className="input-block" placeholder="Link to product/service video (Youtube, Vimeo, etc.)" />
                </div>

                <button className="button-center"> Apply </button>

            </form>
        )
    }
}