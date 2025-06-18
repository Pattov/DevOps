import React from 'react';
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileText, TestTube } from 'lucide-react';

interface TreeNodeProps {
  id: string;
  name: string;
  type: 'testplan' | 'testsuite' | 'testcase';
  level: number;
  selected: boolean;
  expanded?: boolean;
  hasChildren?: boolean;
  state?: 'Active' | 'Inactive';
  priority?: number;
  onToggle?: (id: string) => void;
  onSelect: (id: string, type: 'testplan' | 'testsuite' | 'testcase') => void;
  children?: React.ReactNode;
}

export const TreeNode: React.FC<TreeNodeProps> = ({
  id,
  name,
  type,
  level,
  selected,
  expanded = false,
  hasChildren = false,
  state,
  priority,
  onToggle,
  onSelect,
  children
}) => {
  const getIcon = () => {
    switch (type) {
      case 'testplan':
        return <TestTube className="w-4 h-4 text-blue-600" />;
      case 'testsuite':
        return expanded ? 
          <FolderOpen className="w-4 h-4 text-yellow-600" /> : 
          <Folder className="w-4 h-4 text-yellow-600" />;
      case 'testcase':
        return <FileText className="w-4 h-4 text-green-600" />;
    }
  };

  const getStateColor = () => {
    if (state === 'Inactive') return 'text-gray-400';
    return 'text-gray-900';
  };

  const getPriorityBadge = () => {
    if (type !== 'testcase' || !priority) return null;
    
    const colors = {
      1: 'bg-red-100 text-red-800',
      2: 'bg-yellow-100 text-yellow-800',
      3: 'bg-green-100 text-green-800',
      4: 'bg-blue-100 text-blue-800'
    };

    return (
      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800'}`}>
        P{priority}
      </span>
    );
  };

  return (
    <div className="select-none">
      <div 
        className={`flex items-center py-1 px-2 hover:bg-gray-50 cursor-pointer rounded ${
          selected ? 'bg-blue-50 border-l-2 border-blue-500' : ''
        }`}
        style={{ paddingLeft: `${level * 20 + 8}px` }}
      >
        {hasChildren && (
          <button
            onClick={() => onToggle?.(id)}
            className="mr-1 p-1 hover:bg-gray-200 rounded"
          >
            {expanded ? 
              <ChevronDown className="w-3 h-3" /> : 
              <ChevronRight className="w-3 h-3" />
            }
          </button>
        )}
        
        {!hasChildren && <div className="w-5" />}
        
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onSelect(id, type)}
          className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        
        {getIcon()}
        
        <span className={`ml-2 text-sm ${getStateColor()}`}>
          {name}
        </span>
        
        {getPriorityBadge()}
        
        {state === 'Inactive' && (
          <span className="ml-2 px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
            Inactive
          </span>
        )}
      </div>
      
      {expanded && children && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
};