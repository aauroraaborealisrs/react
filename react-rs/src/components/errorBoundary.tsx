import { Component, ErrorInfo } from "react";
import { Props, State } from "../interfaces";

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error("getDerivedStateFromError caught an error:", error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error: ", error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Вы чет сломали, довольны, уважаемые?</h1>
          <button onClick={() => window.location.reload()}>Обратно</button>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
