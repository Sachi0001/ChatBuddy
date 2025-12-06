import React from 'react'
import { Link } from 'react-router-dom'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log error details for debugging
    console.error('Error caught by boundary:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-error text-2xl mb-4">
                Oops! Something went wrong
              </h2>
              
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-20 w-20 text-error mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>

              <p className="text-base-content/70 mb-6">
                We're sorry for the inconvenience. The application encountered an unexpected error.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="collapse collapse-arrow bg-base-200 w-full mb-4">
                  <summary className="collapse-title text-sm font-medium">
                    Error Details (Dev Mode)
                  </summary>
                  <div className="collapse-content text-left">
                    <p className="text-xs text-error font-mono break-all mb-2">
                      {this.state.error.toString()}
                    </p>
                    <pre className="text-xs bg-base-300 p-2 rounded overflow-auto max-h-40">
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </div>
                </details>
              )}

              <div className="card-actions flex-col w-full gap-2">
                <button 
                  onClick={this.handleReset} 
                  className="btn btn-primary w-full"
                >
                  Try Again
                </button>
                <Link to="/" className="btn btn-ghost w-full">
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary