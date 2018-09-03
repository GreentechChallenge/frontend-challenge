import React from "react";
import styles from "./form.module.css";
import { GoogleSearch } from "../../../shared/google/autoComplete";
import { validName, validPhone, validEmail, isNotNull, validDate } from "../../../shared/form/validation";
import TextArea from "../../../shared/form/text-area";
import { ReactDatez } from "react-datez";
import "react-datez/dist/css/react-datez.css";
import { objStrSort } from "../../../shared/object/sort";
import { _CHALLENGES_API } from "../../../environments/endpoint/challenges/challenges";
import { countPropertiesAndNoEmpty } from "../../../shared/object/check";
import { _SIGNUP_CANDIDATE_API } from "../../../environments/endpoint/signup/candidate";

class SignupForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            challenges: [],
            searchaddress: [],
            searchSuggestions: {
                inputPreview: "",
                searchPreview: "",
                suggestions: {
                    currentIndex: -1,
                    itens: []
                }
            },
            searchPreview: "",
            errors: {},
            hasError: 0,
            errorsMessage: {},
            labels: {}
        };

        this.handleSearchOpen = this.handleSearchOpen.bind(this);
        this.handleSearchClose = this.handleSearchClose.bind(this);
        this.handleClickChangeAddress = this.handleClickChangeAddress.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOnBlurValidation = this.handleOnBlurValidation.bind(this);
    }

    // Life Cicle

    componentDidMount() {
        this.getChallenges();

    }

    getChallenges() {
        const tries = 3;
        for (let i = 0; i < tries; i++) {
            fetch(_CHALLENGES_API).then(async(response) => {
                try {
                    const challenges = await response.json();
                    this.setState({
                        challenges: challenges.sort(objStrSort("title"))
                    });
                    i = 3;
                } catch (err) { }
            });
        }
    }



    // Validation Errors

    getClassError(isValid) {

        if (!isValid) {
            return "invalid";
        } else {
            return null;
        }
    }



    clearErrors() {
        this.setState({
            errors: {}
        });
    }


    async validationForm() {
        let isValid = false;
        await this.setState({
            errors: {
                name: this.getClassError(validName(this.state.name)),
                phone: this.getClassError(validPhone(this.state.phone)),
                email: this.getClassError(validEmail(this.state.email)),
                challenge: this.getClassError(isNotNull(this.state.challenge)),
                company: this.getClassError(isNotNull(this.state.company)),
                address: this.getClassError(isNotNull(this.state.address)),
                description: this.getClassError(isNotNull(this.state.description)),
                website: this.getClassError(isNotNull(this.state.website))
            },
            errorsMessage: {
                name: "Please insert full name",
                phone: "Invalid number, please try only numbers",
                email: "Them email should be like example@example.ex",
                challenge: "This field can not be empty",
                company: "This field can not be empty",
                address: "This field can not be empty",
                description: "This field can not be empty",
                website: "This field can not be empty"
            }
        }, () => {
            isValid = (countPropertiesAndNoEmpty(this.state.errors) === 0) ? true : false;
        });
        return isValid;
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


    async handleSubmit(e) {
        e.preventDefault();

        this.props.onLoading(true);
        this.clearErrors();

        const isValid = await this.validationForm();
        if (isValid) {

            const body = {
                challenge: this.state.challenge,
                name: this.state.name,
                phone: this.state.phone,
                email: this.state.email,
                company: this.state.company,
                date: this.state.date,
                address: this.state.address,
                vat: this.state.vat,
                description: this.state.description,
                website: this.state.website,
                video: this.state.video
            };


            await fetch(_SIGNUP_CANDIDATE_API, {
                method: "POST",
                body: JSON.stringify(body),
                headers: new Headers({
                    "Content-type": "application/json; charset=UTF-8"
                })
            }).then(async(response) => {
                try {
                    this.props.successSubmit();
                } catch (e) {
                    this.submitError();
                }
            }).catch(this.submitError);
        }

        this.props.onLoading(false);

    }

    submitError() {
        const errors = {
            ...this.state.errors, ...{
                submit: "Sorry, something went wrong. Please try again"
            }
        };
        this.setState({
            errors: errors
        });
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
            ...this.state.errors, ...{
                [name]: this.getClassError(validation(value))
            }
        };

        const errorsMessage = {
            ...this.state.errorsMessage, ...{
                [name]: message
            }
        };

        this.setState({
            errors: errors,
            errorsMessage: errorsMessage
        });
    }

    handleKeyDownSearch(e) {
        const { selectionStart, value } = e.target;
        const { searchPreview, searchSuggestions } = this.state;
        let { suggestions } = searchSuggestions;


        if (selectionStart === value.length) {
            if (searchPreview.length > 0) {


                if (e.key === "ArrowRight") {
                    e.preventDefault();

                    let i = (suggestions.currentIndex >= 0) ? suggestions.currentIndex : 0;
                    this.setState({
                        address: searchSuggestions.suggestions.itens[i].description
                    });
                    this.handleSearchClose();
                }
            }
        }

        if (searchPreview.length > 0) {

            if (e.key === "Tab" || e.key === "Enter") {
                e.preventDefault();

                let i = (suggestions.currentIndex >= 0) ? suggestions.currentIndex : 0;
                this.setState({
                    address: searchSuggestions.suggestions.itens[i].description
                });
                this.handleSearchClose();
            }

            if (e.key === "Escape") {
                e.preventDefault();
                this.handleSearchClose();
            }


            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
                let i;

                if (e.key === "ArrowDown") {
                    i = suggestions.currentIndex + 1;

                    if (typeof suggestions.itens[i] === "undefined") {
                        i = 0;
                    }
                } else {
                    i = suggestions.currentIndex - 1;

                    if (typeof suggestions.itens[i] === "undefined") {
                        i = suggestions.itens.length - 1;
                    }
                }

                const preview = suggestions.itens[i].description;

                searchSuggestions.searchSuggestions = preview;
                searchSuggestions.suggestions.currentIndex = i;



                this.setState({
                    address: preview,
                    searchPreview: preview,
                    searchSuggestions: searchSuggestions
                });

                this.handleSearchOpen(suggestions.itens, true);
            }
        }
    }


    async handleSearchOpen(e, placeholder = false) {

        let { searchSuggestions } = this.state;

        const firstSearch = (e.length > 0) ? e[0].description : "";

        const searchElement = await e.map((address, key) => {
            return (
                <li key={key}
                    className={(searchSuggestions.suggestions.currentIndex == key) ? "active" : null}
                    onMouseDown={this.handleClickChangeAddress} >
                    {address.description}
                </li >);
        });


        searchSuggestions.suggestions.itens = e;

        this.setState({
            searchSuggestions: searchSuggestions,
            searchaddress: searchElement,
            searchPreview: (!placeholder) ? this.state.address + firstSearch.slice(this.state.address.length) : " "
        });


    }


    handleSearchClose() {
        let { searchSuggestions } = this.state;
        searchSuggestions.suggestions.currentIndex = -1;

        this.setState({
            searchaddress: [],
            searchPreview: "",
            searchSuggestions: searchSuggestions
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
                        className={this.state.errors.challenge + " input-block"} >
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
                    <label className={"error-message " + this.state.errors.challenge}>{this.state.errorsMessage.challenge}</label>
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
                        className={this.state.errors.name + " input-block"}
                        placeholder="Name of contact person"
                        value={this.state.name} />
                    <label className={"error-message " + this.state.errors.name}>{this.state.errorsMessage.name}</label>

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
                        className={this.state.errors.phone + " input-block"}
                        placeholder="Phone number (incl. country code) of contact person"
                        value={this.state.phone} />
                    <label className={"error-message " + this.state.errors.phone}>{this.state.errorsMessage.phone}</label>

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
                        className={this.state.errors.email + " input-block"}
                        placeholder="Email of contact person"
                    />
                    <label className={"error-message " + this.state.errors.email}>{this.state.errorsMessage.email}</label>

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
                            className={this.state.errors.company + " input-block"}
                            placeholder="Company registration name"

                        />
                        <label className={"error-message " + this.state.errors.company}>{this.state.errorsMessage.company}</label>

                    </div>

                    <div className="form-item">
                        <label className={this.state.labels.date}>Date of Incorporation</label>
                        <ReactDatez


                            handleChange={this.handleChangeDate}
                            value={this.state.date}
                            placeholder="Date of Incorporation"
                            className={this.state.errors.date + " input-block " + styles.inputDate}
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
                            onLoading={(status) => this.props.onLoading(status)}
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
                            className={styles.inputSearch + "  input-block  " + this.state.errors.address}
                            placeholder="Company address"


                        />
                        <label className={"error-message " + this.state.errors.address}>{this.state.errorsMessage.address}</label>

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
                        className={this.state.errors.vat + " input-block"}
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
                        className={this.state.errors.description + " input-block " + styles.textarea}
                        placeholder="Short description of the company" />
                    <label className={"error-message " + this.state.errors.description}>{this.state.errorsMessage.description}</label>

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

                        className={this.state.errors.website + " input-block"}
                        placeholder="Link to company website" />
                    <label className={"error-message " + this.state.errors.website}>{this.state.errorsMessage.website}</label>

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
                        className={this.state.errors.video + " input-block"}
                        placeholder="Link to product/service video (Youtube, Vimeo, etc.)" />
                </div>

                <button className="button-center"> Apply </button>
                <p className="error-message invalid text-center mt-1">{this.state.errors.submit}</p>


            </form>
        );
    }
}

export default SignupForm;