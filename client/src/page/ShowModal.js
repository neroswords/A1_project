import React, { Component } from "react";
import { Modal, Button } from "semantic-ui-react";
export default class Confirm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Modal>
          <Modal.Header>Summary</Modal.Header>
          <Modal.Content>
            <p>{this.props.message}</p> {/* Here Success Message should Come */}
          </Modal.Content>
          <Modal.Actions>
            <Button negative onCLick={this.props.close}>
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}
