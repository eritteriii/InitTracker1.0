import React, {Component}from 'react';
import {Col,Form} from "react-bootstrap";

class GameSelect extends Component {
    render() {
        return (
            <div className="col-8 offset-2">
                <h2>Join the fray!</h2>
                <Form>
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label column={6}>Character Name</Form.Label>
                        <Form.Control type="Character" placeholder="Character" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword">
                        <Form.Label column={6}>Initiative Roll</Form.Label>
                        <Form.Control type="Initiative" placeholder="Initiative" />
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label column={6}>Find Your Game</Form.Label>
                        <Form.Control as="select">
                            <option>Choose...</option>
                            <option>...</option>
                        </Form.Control>
                    </Form.Group>
                    <button id="join-button" className="btn btn-outline-secondary" type="button">Join</button>
                </Form>
            </div>
        );
    }
}

export default GameSelect;