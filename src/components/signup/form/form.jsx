import React from "react";
import { challanges } from "./mock";
import styles from "./form.module.css";
import { GoogleSearch } from "../../../shared/google/autoComplete";

export default class SignupForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            challanges: [],
            searchCity: [],
            searchPreview: "",
            city: ""
        };

        this.handleSearchOpen = this.handleSearchOpen.bind(this);
        this.handleSearchClose = this.handleSearchClose.bind(this);
        this.changeCity = this.changeCity.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        challanges.then((response) => {
            this.setState({ challanges: response });

        }).catch(() => {

        });
    }


    changeCity(e) {
        this.city = e.target.textContent;
        this.setState({
            city: this.city
        });
        this.handleSearchClose();
    }

    handleChange(e) {

        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleKeyDownSearch(e) {
        const { selectionStart, value } = e.target;
        const { searchPreview } = this.state;


        if (selectionStart === value.length) {
            if (e.key === "ArrowRight") {
                this.setState({
                    city: searchPreview
                });
                this.handleSearchClose();
            }
        }

        if (e.key === "Tab") {
            if (searchPreview.length > 0) {
                e.preventDefault();
                this.setState({
                    city: searchPreview
                });
                this.handleSearchClose();
            }
        }


    }


    async handleSearchOpen(e) {


        const firstSearch = (e.length > 0) ? e[0].description : "";

        const searchElement = await e.map((city) => {
            return (
                <li key={city.id}
                    onMouseDown={this.changeCity} >
                    {city.description}
                </li >);
        });


        this.setState({
            searchCity: searchElement,
            searchPreview: this.state.city + firstSearch.slice(this.state.city.length)
        });


    }


    handleSearchClose() {
        this.setState({
            searchCity: [],
            searchPreview: ""
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

                <div className="form-group" >
                    <label>Company address</label>

                    <div className="auto-complete" >
                        <input type="text" className="input-block  autocomplete" disabled value={this.state.searchPreview} />

                        <GoogleSearch
                            input={<input type="text" ref={(input) => this.city = input} value={this.state.city}></input>}
                            onOpen={this.handleSearchOpen} onClose={this.handleSearchClose}
                            onBlur={this.handleSearchClose}
                            name="city"
                            onChange={(e) => this.handleChange(e)}
                            onKeyDown={(e) => this.handleKeyDownSearch(e)}
                            className={styles.inputSearch + "  input-block autocomplete"}
                            placeholder="Company address"


                        />
                    </div>

                    {(this.state.searchCity.length > 0) ?
                        <span className="dropmenu" >
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