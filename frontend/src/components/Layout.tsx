import React from "react";
import { RefreshCw } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  onRefresh?: () => void;
  loading?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  onRefresh,
  loading,
}) => {
  return (
    <div className="min-h-screen py-8">
      <div className="container">
        <div className="card p-8">
          <div className="flex flex--between flex--center mb-6">
            <div>
              <h1 className="text--3xl mb-2">📝 Notes App</h1>
              <p className="text--muted">
                Add notes via Socket.io (/add topic) or view all your notes here
              </p>
            </div>
            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={loading}
                className="btn btn--secondary"
              >
                <RefreshCw
                  size={16}
                  className={loading ? "loading-spinner" : ""}
                />
                Refresh
              </button>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
