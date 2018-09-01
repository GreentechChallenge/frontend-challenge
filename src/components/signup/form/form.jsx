import React from "react";
import { challanges } from "./mock";
import styles from "./form.module.css";
import { GoogleSearch } from "../../../shared/google/autoComplete";

export default class SignupForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            challanges: [],
            searchCity: []
        };

        this.handleSearchOpen = this.handleSearchOpen.bind(this);
        this.handleSearchClose = this.handleSearchClose.bind(this);
        this.changeCity = this.changeCity.bind(this);
    }

    componentDidMount() {
        challanges.then((response) => {
            this.setState({ challanges: response });

        }).catch(() => {

        });
    }

    changeCity(e) {
        this.city = e.target.textContent;
        this.handleSearchClose();
    }

    async handleSearchOpen(e) {

        const searchElement = await e.map((city) => {
            return (
                <li key={city.id}
                    onClick={this.changeCity}>
                    {city.description}
                </li>);
        });

        this.setState({
            searchCity: searchElement
        });


    }

    handleSearchClose() {
        this.setState({
            searchCity: []
        });
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
                    <input type="text" className="input-block" placeholder="Name of contact person" />
                </div>

                <div className="form-group">
                    <label>Phone number (incl. country code) of contact person</label>
                    <input type="text" className="input-block" placeholder="Phone number (incl. country code) of contact person" />
                </div>

                <div className="form-group">
                    <label>Email of contact person</label>
                    <input type="text" className="input-block" placeholder="Email of contact person" />
                </div>

                <div className="form-group">
                    <label>Company registration name</label>
                    <input type="text" className="input-block" placeholder="Company registration name" />
                </div>

                <div className="form-group">
                    <label>Date of Incorporation</label>
                    <input type="text" className="input-block" placeholder="Date of Incorporation" />
                </div>

                <div className="form-group">
                    <label>Company address</label>
                    <GoogleSearch
                        input={<input type="text" ref={(input) => this.city = input}></input>}
                        onOpen={this.handleSearchOpen} onClose={this.handleSearchClose}
                        className={styles.inputSearch + " input-block"}
                        placeholder="Company address"
                        onBlur={this.handleSearchClose}
                    />
                    {(this.state.searchCity.length > 0) ?
                        <span className="dropmenu-content">
                            <ul>
                                {this.state.searchCity}
                            </ul>
                        </span>
                        : null}
                </div>

                <div className="form-group">
                    <label>VAT number (Company registration number)</label>
                    <input type="text" className="input-block" placeholder="VAT number (Company registration number)" />
                </div>

                <div className="form-group">
                    <label>Short description of the company</label>
                    <textarea className={"input-block " + styles.textarea} placeholder="Short description of the company" />
                </div>

                <div className="form-group">
                    <label>Link to company website</label>
                    <input type="text" className="input-block" placeholder="Link to company website" />
                </div>

                <div className="form-group">
                    <label>Link to product/service video (Youtube, Vimeo, etc.)</label>
                    <input type="text" className="input-block" placeholder="Link to product/service video (Youtube, Vimeo, etc.)" />
                </div>

                <button className="button-center"> Apply </button>

            </form>
        );
    }
}