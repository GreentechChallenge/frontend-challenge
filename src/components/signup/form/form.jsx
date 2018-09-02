import React from "react";
import { challenges } from "./mock";
import styles from "./form.module.css";
import { GoogleSearch } from "../../../shared/google/autoComplete";
import { validName, validPhone, validEmail, isNotNull, validDate } from "../../../shared/form/validation";

export default class SignupForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            challenges: [],
            searchaddress: [],
            searchPreview: "",
            error: {}
        };

        this.handleSearchOpen = this.handleSearchOpen.bind(this);
        this.handleSearchClose = this.handleSearchClose.bind(this);
        this.changeaddress = this.changeaddress.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        challenges.then((response) => {
            this.setState({ challenges: response });

        }).catch(() => {

        });
    }

    getClassError(isValid) {

        if (!isValid) {
            return "invalid";
        }
    }



    changeaddress(e) {
        this.setState({
            address: e.target.textContent
        });
        this.handleSearchClose();
    }

    handleChange(e) {

        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    clearErrors() {
        this.setState({
            error: {}
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.clearErrors();
        this.validationForm();

    }

    validationForm() {
        this.setState({
            error: {
                name: this.getClassError(validName(this.state.name)),
                phone: this.getClassError(validPhone(this.state.phone)),
                email: this.getClassError(validEmail(this.state.email)),
                date: this.getClassError(validDate(this.state.date)),
                challenge: this.getClassError(isNotNull(this.state.challenge)),
                company: this.getClassError(isNotNull(this.state.company)),
                address: this.getClassError(isNotNull(this.state.address)),
                vat: this.getClassError(isNotNull(this.state.vat)),
                description: this.getClassError(isNotNull(this.state.description)),
                website: this.getClassError(isNotNull(this.state.website)),
                video: this.getClassError(isNotNull(this.state.video))
            }
        });
    }

    handleOnBlurValidation(e) {
        let { name, value } = e.target;

        let validation = isNotNull;

        switch (name) {
            case "name": validation = validName;
                break;
            case "phone": validation = validPhone;
                break;
            case "email": validation = validEmail;
                break;
            case "date": validation = validDate;
                break;
        }

        let errors = { ...this.state.error, ...{ [name]: this.getClassError(validation(value)) } };

        this.setState({
            error: errors
        });
    }

    handleKeyDownSearch(e) {
        const { selectionStart, value } = e.target;
        const { searchPreview } = this.state;


        if (selectionStart === value.length) {
            if (searchPreview.length > 0) {
                if (e.key === "ArrowRight") {

                    this.setState({
                        address: searchPreview
                    });
                    this.handleSearchClose();
                }

                if (e.key === "Tab") {

                    e.preventDefault();
                    this.setState({
                        address: searchPreview
                    });
                    this.handleSearchClose();
                }
            }

        }
    }


    async handleSearchOpen(e) {


        const firstSearch = (e.length > 0) ? e[0].description : "";

        const searchElement = await e.map((address) => {
            return (
                <li key={address.id}
                    onMouseDown={this.changeaddress} >
                    {address.description}
                </li >);
        });


        this.setState({
            searchaddress: searchElement,
            searchPreview: this.state.address + firstSearch.slice(this.state.address.length)
        });


    }


    handleSearchClose() {
        this.setState({
            searchaddress: [],
            searchPreview: ""
        });
    }


    render() {
        return (
            <form className="col-2 mx-auto" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Select a Challenge</label>
                    <select
                        name="challenge"
                        value={this.state.challenge}
                        onChange={(e) => this.handleChange(e)}
                        onBlur={(e) => this.handleOnBlurValidation(e)}
                        className={this.state.error.challenge + " input-block"} >
                        <option
                            disabled
                            selected
                            hidden
                        >
                            Select a Challenge
                        </option>
                        {this.state.challenges.map(challenge =>
                            <option
                                key={challenge.id}
                                value={challenge.id}
                            >
                                {challenge.title}
                            </option>
                        )}
                    </select>
                </div>

                <div className="form-group">
                    <label>Name of contact person</label>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        onBlur={(e) => this.handleOnBlurValidation(e)}
                        name="name"
                        type="text"
                        className={this.state.error.name + " input-block"}
                        placeholder="Name of contact person"
                        value={this.state.name} />
                </div>

                <div className="form-group">
                    <label>Phone number (incl. country code) of contact person</label>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        onBlur={(e) => this.handleOnBlurValidation(e)}
                        name="phone"
                        type="text"
                        className={this.state.error.phone + " input-block"}
                        placeholder="Phone number (incl. country code) of contact person"
                        value={this.state.phone} />
                </div>

                <div className="form-group">
                    <label>Email of contact person</label>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        onBlur={(e) => this.handleOnBlurValidation(e)}
                        name="email"
                        value={this.state.email}
                        type="text"
                        className={this.state.error.email + " input-block"}
                        placeholder="Email of contact person"
                    />
                </div>

                <div className="form-group">
                    <label>Company registration name</label>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        onBlur={(e) => this.handleOnBlurValidation(e)}
                        name="company"
                        type="text"
                        value={this.state.company}
                        className={this.state.error.company + " input-block"}
                        placeholder="Company registration name"
                    />
                </div>

                <div className="form-group">
                    <label>Date of Incorporation</label>
                    <input
                        onChange={(e) => this.handleChange(e)}
                        onBlur={(e) => this.handleOnBlurValidation(e)}
                        name="date"
                        type="text"
                        value={this.state.date}
                        className={this.state.error.date + " input-block"}
                        placeholder="Date of Incorporation" />
                </div>

                <div className="form-group" >
                    <label>Company address</label>

                    <div className="auto-complete" >
                        <input
                            type="text"
                            className="input-block  autocomplete"
                            disabled
                            value={this.state.searchPreview}
                        />

                        <GoogleSearch
                            input={<input type="text" value={this.state.address}></input>}
                            onOpen={this.handleSearchOpen} onClose={this.handleSearchClose}
                            onBlur={(e) => {
                                this.handleSearchClose();
                                this.handleOnBlurValidation(e);
                            }}
                            name="address"
                            onChange={(e) => this.handleChange(e)}
                            onKeyDown={(e) => this.handleKeyDownSearch(e)}
                            className={styles.inputSearch + "  input-block autocomplete " + this.state.error.address}
                            placeholder="Company address"


                        />
                    </div>

                    {(this.state.searchaddress.length > 0) ?
                        <span className="dropmenu" >
                            <ul>
                                {this.state.searchaddress}
                            </ul>
                        </span>
                        : null}
                </div>

                <div className="form-group">
                    <label>VAT number (Company registration number)</label>
                    <input
                        name="vat"
                        onChange={(e) => this.handleChange(e)}
                        onBlur={(e) => this.handleOnBlurValidation(e)}
                        value={this.state.vat}
                        type="text"
                        className={this.state.error.vat + " input-block"}
                        placeholder="VAT number (Company registration number)" />
                </div>

                <div className="form-group">
                    <label>Short description of the company</label>
                    <textarea
                        name="description"
                        onChange={(e) => this.handleChange(e)}
                        onBlur={(e) => this.handleOnBlurValidation(e)}
                        value={this.state.description}
                        className={this.state.error.description + " input-block " + styles.textarea}
                        placeholder="Short description of the company" />
                </div>

                <div className="form-group">
                    <label>Link to company website</label>
                    <input
                        name="website"
                        onChange={(e) => this.handleChange(e)}
                        onBlur={(e) => this.handleOnBlurValidation(e)}
                        value={this.state.website}
                        type="text"
                        className={this.state.error.website + " input-block"}
                        placeholder="Link to company website" />
                </div>

                <div className="form-group">
                    <label>Link to product/service video (Youtube, Vimeo, etc.)</label>
                    <input
                        name="video"
                        onChange={(e) => this.handleChange(e)}
                        onBlur={(e) => this.handleOnBlurValidation(e)}
                        value={this.state.video}
                        type="text"
                        className={this.state.error.video + " input-block"}
                        placeholder="Link to product/service video (Youtube, Vimeo, etc.)" />
                </div>

                <button className="button-center"> Apply </button>

            </form>
        );
    }
}