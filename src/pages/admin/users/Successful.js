import React, { Component } from 'react';
import { Message } from 'semantic-ui-react';

class ErrorMessage extends Component {
    render() {
        return (
            <Message
                success
                positive
                header="Success!"
                content="Student/Faculty successfully added."
                icon="check"
            />
        );
    }
}

export default ErrorMessage;
