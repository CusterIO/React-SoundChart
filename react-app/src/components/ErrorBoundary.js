import React from 'react'

// https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
// Works like a JavaScript catch {} block for components.
// Only class components can be error boundaries.
class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { hasError: false, type: '' }
  }

  componentDidCatch (error, info) {
    // Display fallback UI
    this.setState({ hasError: true, type: error })
    // You can also log the error to an error reporting service
    console.log(error, info)
  }

  render () {
    if (this.state.hasError) {
    // You can render any custom fallback UI
      return (
        <div className="components">
          <h1>Something went wrong.</h1>
          <p>{this.state.type}</p>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
