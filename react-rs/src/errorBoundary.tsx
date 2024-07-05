import React, { Component, ErrorInfo } from "react";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
}

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
    console.log(this.state.hasError);
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
