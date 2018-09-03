import React from "react";
import styles from "./success.module.css";


class Success extends React.Component {

    render() {
        return (
            <div className="text-center text-bold">
                <p>We have received your Interest Form for <br />Green Tech Challenge </p>
                <hr className={"mx-auto " + styles.hr} />
                <p>Thank you!</p>
            </div>

        );
    }
}

export default Success;