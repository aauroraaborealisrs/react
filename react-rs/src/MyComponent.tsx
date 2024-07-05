import { Component } from "react";
import { ComponentProps, ComponentState } from "./interfaces";

export default class CustomComponent extends Component<
  ComponentProps,
  ComponentState
> {
  constructor(props: ComponentProps) {
    super(props);
    this.state = {
      hasErrorOccurred: false,
    };
  }

  triggerError = () => {
    this.setState({ hasErrorOccurred: true });
  };

  render() {
    if (this.state.hasErrorOccurred) {
      throw new Error("An (un)expected error occurred!");
    }
    return (
      <div className="error-container">
        <button onClick={this.triggerError} className="error-button">
          Crash everything
        </button>
      </div>
    );
  }
}
