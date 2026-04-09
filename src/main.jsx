import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  render() {
    if (this.state.hasError) {
      return React.createElement('div', {
        style: {
          padding: '40px',
          fontFamily: 'monospace',
          background: '#0a0a0a',
          color: '#ff4444',
          minHeight: '100vh'
        }
      },
        React.createElement('h2', { style: { color: '#ff6666', marginBottom: 16 } }, 'Erro ao carregar o app'),
        React.createElement('pre', { style: { whiteSpace: 'pre-wrap', fontSize: 13, color: '#ffaaaa' } },
          this.state.error && this.state.error.toString()
        ),
        React.createElement('pre', { style: { whiteSpace: 'pre-wrap', fontSize: 11, color: '#888', marginTop: 16 } },
          this.state.error && this.state.error.stack
        )
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(ErrorBoundary, null,
    React.createElement(App, null)
  )
)
