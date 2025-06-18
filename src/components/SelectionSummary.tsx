import React, { useState } from 'react';
import { SelectionState, ExportSettings } from '../types';
import { TestTube, Folder, FileText, Download } from 'lucide-react';
import { ExportSettingsComponent } from './ExportSettings';

interface SelectionSummaryProps {
  selection: SelectionState;
  onExport: (settings: ExportSettings) => void;
}

export const SelectionSummary: React.FC<SelectionSummaryProps> = ({ selection, onExport }) => {
  const [showSettings, setShowSettings] = useState(false);
  const [exportSettings, setExportSettings] = useState<ExportSettings>({
    printDesign: 'detailed',
    includeUnexecutedCases: true,
    fieldsToInclude: {
      description: true,
      preconditions: true,
      steps: true,
      expectedResult: true,
      variables: true,
      tags: true,
      priority: true,
      automationStatus: true,
      lastExecuted: true,
      outcome: true
    },
    testOrder: 'original',
    groupBy: 'suite'
  });

  const hasSelection = 
    selection.selectedTestPlans.length > 0 || 
    selection.selectedTestSuites.length > 0 || 
    selection.selectedTestCases.length > 0;

  const handleExport = () => {
    onExport(exportSettings);
  };

  const handleSettingsChange = (newSettings: ExportSettings) => {
    setExportSettings(newSettings);
    
    // Auto-configure fields based on print design
    if (newSettings.printDesign === 'detailed') {
      setExportSettings(prev => ({
        ...newSettings,
        fieldsToInclude: {
          description: true,
          preconditions: true,
          steps: true,
          expectedResult: true,
          variables: true,
          tags: true,
          priority: true,
          automationStatus: true,
          lastExecuted: true,
          outcome: true
        }
      }));
    } else if (newSettings.printDesign === 'summary') {
      setExportSettings(prev => ({
        ...newSettings,
        fieldsToInclude: {
          description: true,
          preconditions: false,
          steps: true,
          expectedResult: true,
          variables: false,
          tags: false,
          priority: true,
          automationStatus: false,
          lastExecuted: false,
          outcome: true
        }
      }));
    } else if (newSettings.printDesign === 'compact') {
      setExportSettings(prev => ({
        ...newSettings,
        fieldsToInclude: {
          description: false,
          preconditions: false,
          steps: true,
          expectedResult: false,
          variables: false,
          tags: false,
          priority: true,
          automationStatus: false,
          lastExecuted: false,
          outcome: true
        }
      }));
    }
  };

  return (
    <div className="bg-white border rounded-lg">
      <div className="p-4 border-b bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-900">Resumen de Selección</h3>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <TestTube className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">
              {selection.selectedTestPlans.length}
            </div>
            <div className="text-sm text-gray-600">Test Plans</div>
          </div>
          
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <Folder className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">
              {selection.selectedTestSuites.length}
            </div>
            <div className="text-sm text-gray-600">Test Suites</div>
          </div>
          
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <FileText className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">
              {selection.selectedTestCases.length}
            </div>
            <div className="text-sm text-gray-600">Test Cases</div>
          </div>
        </div>
        
        <ExportSettingsComponent
          settings={exportSettings}
          onSettingsChange={handleSettingsChange}
          isOpen={showSettings}
          onToggle={() => setShowSettings(!showSettings)}
        />
        
        <button
          onClick={handleExport}
          disabled={!hasSelection}
          className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
            hasSelection
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Download className="w-4 h-4 mr-2" />
          Exportar Selección
        </button>
        
        {!hasSelection && (
          <p className="text-sm text-gray-500 text-center mt-2">
            Selecciona al menos un elemento para exportar
          </p>
        )}
      </div>
    </div>
  );
};