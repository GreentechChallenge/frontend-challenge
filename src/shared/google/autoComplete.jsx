import React from "react";

export class GoogleSearch extends React.Component {

    constructor(props) {
        super(props);
        this.service = new window.google.maps.places.AutocompleteService();
    }

    onChange(e) {
        const { types = ["(cities)"] } = this.props;

        if (e.target.value) {
            this.service.getPlacePredictions({ input: e.target.value, types }, (predictions, status) => {
                if (status === "OK" && predictions && predictions.length > 0) {
                    this.props.onOpen(predictions);
                } else {
                    this.props.onClose();
                }
            });
        } else {
            this.props.onClose();
        }
    }

    componentDidMount() {
        if (this.props.input.value) {
            this.placeService = new window.google.maps.places.PlacesService(this.inputElement.div);
            this.placeService.getDetails({ placeId: this.props.input.value }, (e, status) => {
                if (status === "OK") {
                    this.inputElement.value = e.formatted_address;
                }
            });
        }
    }

    render() {
        return (
            <div>
                {React.cloneElement(this.props.input,
                    {
                        ...this.props,
                        ref: "input",
                        onChange: (e) => {
                            this.onChange(e);
                        }
                    }
                )}
                <div inputRef="div"></div>
            </div>
        );
    }
}