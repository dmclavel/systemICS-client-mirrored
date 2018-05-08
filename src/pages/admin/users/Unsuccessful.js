import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';

class ErrorMessage extends Component {
    render() {
        return (
            <Message
                error
                header="Error!"
                content="Unsuccessful. Please put appropriate values."
                icon="delete"
            />
        );
    }
}

export default ErrorMessage;
