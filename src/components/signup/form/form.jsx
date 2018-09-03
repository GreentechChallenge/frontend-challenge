import React from "react";
import { challenges } from "./mock";
import styles from "./form.module.css";
import { GoogleSearch } from "../../../shared/google/autoComplete";
import { validName, validPhone, validEmail, isNotNull, validDate } from "../../../shared/form/validation";
import TextArea from "../../../shared/form/text-area";
import { ReactDatez } from "react-datez";
import "react-datez/dist/css/react-datez.css";

export default class SignupForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            challenges: [],
            searchaddress: [],
            searchPreview: "",
            error: {},
            errorMessage: {},
            labels: {}
        };

        this.handleSearchOpen = this.handleSearchOpen.bind(this);
        this.handleSearchClose = this.handleSearchClose.bind(this);
        this.handleClickChangeAddress = this.handleClickChangeAddress.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Life Cicle

    componentDidMount() {
        this.setState({
            challenges: [...challenges.sort(function(a, b) {
                return (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0);
            })]

        });
    }




    // Validation Errors

    getClassError(isValid) {

        if (!isValid) {
            return "invalid";
        }
    }



    clearErrors() {
        this.setState({
            error: {}
        });
    }


    validationForm() {
        this.setState({
            error: {
                name: this.getClassError(validName(this.state.name)),
                phone: this.getClassError(validPhone(this.state.phone)),
                email: this.getClassError(validEmail(this.state.email)),
                challenge: this.getClassError(isNotNull(this.state.challenge)),
                company: this.getClassError(isNotNull(this.state.company)),
                address: this.getClassError(isNotNull(this.state.address)),
                description: this.getClassError(isNotNull(this.state.description)),
                website: this.getClassError(isNotNull(this.state.website))
            },
            errorMessage: {
                name: "Please insert full name",
                phone: "Invalid number, please try only numbers",
                email: "Them email should be like example@example.ex",
                challenge: "This field can not be empty",
                company: "This field can not be empty",
                address: "This field can not be empty",
                description: "This field can not be empty",
                website: "This field can not be empty"
            }
        });
    }

    // Handles


    handleChange(e) {

        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleChangeDate(value) {

        const className = isNotNull(value) ? "visible" : "";
        const labels = { ...this.state.labels, ...{ date: className } };

        this.setState({
            date: value,
            labels: labels
        });

    }


    handleSubmit(e) {
        e.preventDefault();
        this.clearErrors();
        this.validationForm();

    }

    handleClickChangeAddress(e) {
        this.setState({
            address: e.target.textContent
        });
        this.handleSearchClose();
    }

    handleOnChangeLabel(e) {
        const { name, value } = e.target;
        const className = isNotNull(value) ? "visible" : "";
        const labels = { ...this.state.labels, ...{ [name]: className } };

        this.setState({
            labels: labels
        });
    }


    handleOnBlurValidation(e) {
        let { name, value } = e.target;

        let validation = isNotNull;
        let message = "This field can not be empty";

        switch (name) {
            case "name": validation = validName;
                message = "Please insert full name";
                break;
            case "phone": validation = validPhone;
                message = "Invalid number, please try only numbers";
                break;
            case "email": validation = validEmail;
                message = "Them email should be like example@example.ex";
                break;
            case "date": validation = (value) => {
                return !isNotNull(value) || validDate(value);
            };
                break;
        }


        const errors = {
            ...this.state.error, ...{
                [name]: this.getClassError(validation(value))
            }
        };

        const errorsMessage = {
            ...this.state.errorMessage, ...{
                [name]: message
            }
        };

        this.setState({
            error: errors,
            errorMessage: errorsMessage
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
                    onMouseDown={this.handleClickChangeAddress} >
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

    // Render
    render() {
        return (
            <form className="col-2 mx-auto" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className={this.state.labels.challenge}>Select a Challenge</label>
                    <select
                        name="challenge"
                        value={this.state.challenge}
                        onChange={(e) => {
                            this.handleChange(e);
                            this.handleOnChangeLabel(e);
                        }}
                        onBlur={(e) => this.handleOnBlurValidation(e)}
                        className={this.state.error.challenge + " input-block"} >
                        <option
                            disabled
                            selected
                            hidden
                            value=""
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
                    <label className={"error-message " + this.state.error.challenge}>{this.state.errorMessage.challenge}</label>
                </div>

                <div className="form-group">
                    <label className={this.state.labels.name}>Name of contact person</label>
                    <input
                        onChange={(e) => {
                            this.handleChange(e);
                            this.handleOnChangeLabel(e);
                        }}
                        onBlur={(e) => this.handleOnBlurValidation(e)}
                        name="name"
                        type="text"
                        className={this.state.error.name + " input-block"}
                        placeholder="Name of contact person"
                        value={this.state.name} />
                    <label className={"error-message " + this.state.error.name}>{this.state.errorMessage.name}</label>

                </div>

                <div className="form-group">
                    <label className={this.state.labels.phone}>Phone number (incl. country code) of contact person</label>
                    <input
                        onChange={(e) => {
                            this.handleChange(e);
                            this.handleOnChangeLabel(e);
                        }}
                        onBlur={(e) => this.handleOnBlurValidation(e)}
                        name="phone"
                        type="text"
                        className={this.state.error.phone + " input-block"}
                        placeholder="Phone number (incl. country code) of contact person"
                        value={this.state.phone} />
                    <label className={"error-message " + this.state.error.phone}>{this.state.errorMessage.phone}</label>

                </div>

                <div className="form-group">
                    <label className={this.state.labels.email}>Email of contact person</label>
                    <input
                        onChange={(e) => {
                            this.handleChange(e);
                            this.handleOnChangeLabel(e);
                        }}

                        onBlur={(e) => this.handleOnBlurValidation(e)}
                        name="email"
                        value={this.state.email}
                        type="text"
                        className={this.state.error.email + " input-block"}
                        placeholder="Email of contact person"
                    />
                    <label className={"error-message " + this.state.error.email}>{this.state.errorMessage.email}</label>

                </div>

                <div className="form-group form-item-2">
                    <div className="form-item ">
                        <label className={this.state.labels.company}>Company registration name</label>
                        <input
                            onChange={(e) => {
                                this.handleChange(e);
                                this.handleOnChangeLabel(e);
                            }}
                            onBlur={(e) => this.handleOnBlurValidation(e)}
                            name="company"
                            type="text"
                            value={this.state.company}
                            className={this.state.error.company + " input-block"}
                            placeholder="Company registration name"

                        />
                        <label className={"error-message " + this.state.error.company}>{this.state.errorMessage.company}</label>

                    </div>

                    <div className="form-item">
                        <label className={this.state.labels.date}>Date of Incorporation</label>
                        <ReactDatez

                            name="date"
                            handleChange={this.handleChangeDate}
                            value={this.state.date}
                            placeholder="Date of Incorporation"
                            className={this.state.error.date + " input-block " + styles.inputDate}
                            allowPast={true}
                            allowFuture={false}
                            disableInputIcon={true}

                        />

                    </div>
                </div>



                <div className="form-group" >
                    <label className={this.state.labels.address}>Company address</label>

                    <div className="auto-complete" >
                        <input
                            type="text"
                            className="input-block  "
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
                            onChange={(e) => {
                                this.handleChange(e);
                                this.handleOnChangeLabel(e);
                            }}
                            onKeyDown={(e) => this.handleKeyDownSearch(e)}
                            className={styles.inputSearch + "  input-block  " + this.state.error.address}
                            placeholder="Company address"


                        />
                        <label className={"error-message " + this.state.error.address}>{this.state.errorMessage.address}</label>

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
                    <label className={this.state.labels.vat}>VAT number (Company registration number)</label>
                    <input
                        name="vat"
                        onChange={(e) => {
                            this.handleChange(e);
                            this.handleOnChangeLabel(e);
                        }}
                        value={this.state.vat}
                        type="text"
                        className={this.state.error.vat + " input-block"}
                        placeholder="VAT number (Company registration number)" />


                </div>

                <div className="form-group">
                    <label className={this.state.labels.description}>Short description of the company</label>
                    <TextArea
                        name="description"
                        onChange={(e) => {
                            this.handleChange(e);
                            this.handleOnChangeLabel(e);
                        }}

                        onBlur={(e) => this.handleOnBlurValidation(e)}
                        value={this.state.description}
                        className={this.state.error.description + " input-block "}
                        placeholder="Short description of the company" />
                    <label className={"error-message " + this.state.error.description}>{this.state.errorMessage.description}</label>

                </div>

                <div className="form-group">
                    <label className={this.state.labels.website}>Link to company website</label>
                    <input
                        name="website"
                        onChange={(e) => {
                            this.handleChange(e);
                            this.handleOnChangeLabel(e);
                        }}
                        onBlur={(e) => this.handleOnBlurValidation(e)}
                        value={this.state.website}
                        type="text"

                        className={this.state.error.website + " input-block"}
                        placeholder="Link to company website" />
                    <label className={"error-message " + this.state.error.website}>{this.state.errorMessage.website}</label>

                </div>

                <div className="form-group">
                    <label className={this.state.labels.video}>Link to product/service video (Youtube, Vimeo, etc.)</label>
                    <input
                        name="video"
                        onChange={(e) => {
                            this.handleChange(e);
                            this.handleOnChangeLabel(e);
                        }}
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