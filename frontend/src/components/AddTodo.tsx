import React, { useState } from "react";
import { Send, Info } from "lucide-react";

export const AddTodo: React.FC = () => {
  const [sampleMessage, setSampleMessage] = useState("Buy groceries");

  const handleSampleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSampleMessage(e.target.value);
  };

  return (
    <div className="card p-6 mb-6">
      <h2 className="text--xl mb-4 flex flex--center flex--gap-2">
        <Send size={20} />
        Add New Todo
      </h2>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex flex--center flex--gap-2 mb-2">
          <Info size={16} className="text--primary" />
          <span className="font-semibold text--primary">How to add todos:</span>
        </div>
        <p className="text--sm text--muted mb-3">
          Send a message to add a new todo item to your list.
        </p>
        <div className="space-y-2 text--sm">
          <div>
            <span className="font-medium">Message:</span>
            <input
              type="text"
              value={sampleMessage}
              onChange={handleSampleChange}
              className="input ml-2 text--sm"
              style={{ width: "200px", display: "inline-block" }}
              placeholder="Your todo message"
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4 className="font-semibold mb-2">System Behavior:</h4>
        <ul className="text--sm text--muted space-y-1">
          <li>• New todos are stored in Redis cache first</li>
          <li>• When Redis has 50+ items, they're moved to MongoDB</li>
          <li>• All todos are displayed here in real-time</li>
          <li>• Use the refresh button to see new todos</li>
        </ul>
      </div>
    </div>
  );
};
