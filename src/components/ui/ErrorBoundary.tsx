import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#E3EAEF] flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 max-w-md w-full">
            <div className="flex items-center justify-center mb-4">
              <AlertCircle className="h-12 w-12 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center">
              Algo deu errado
            </h2>
            <p className="text-gray-600 text-center mb-4">
              Ocorreu um erro inesperado. Tente recarregar a página ou entre em
              contato com o suporte.
            </p>
            <div className="flex flex-col space-y-2">
              <button
                onClick={this.handleRetry}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Tentar novamente
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              >
                Recarregar página
              </button>
            </div>
            {import.meta.env.DEV && this.state.error && (
              <details className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-600">
                <summary className="cursor-pointer font-medium">
                  Detalhes do erro (Dev)
                </summary>
                <pre className="mt-2 whitespace-pre-wrap break-words">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
