import { Component } from "react";
import NotFoundPage from "../pages/NotFoundPage";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return (
        <NotFoundPage providedText="It looks like we're having some technical difficulties. Please try again later." />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
