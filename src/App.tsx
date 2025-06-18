import React, { useState } from 'react';
import { TestPlanTree } from './components/TestPlanTree';
import { SelectionSummary } from './components/SelectionSummary';
import { mockTestPlans } from './data/mockData';
import { SelectionState } from './types';

function App() {
  const [selection, setSelection] = useState<SelectionState>({
    selectedTestPlans: [],
    selectedTestSuites: [],
    selectedTestCases: []
  });

  const handleSelectionChange = (newSelection: SelectionState) => {
    setSelection(newSelection);
  };

  const handleExport = () => {
    console.log('Exportando selección:', selection);
    
    // Aquí implementarías la lógica de exportación
    // Por ejemplo, generar un archivo JSON, Excel, o llamar a la API de Azure DevOps
    
    const exportData = {
      timestamp: new Date().toISOString(),
      selection: selection,
      summary: {
        testPlansCount: selection.selectedTestPlans.length,
        testSuitesCount: selection.selectedTestSuites.length,
        testCasesCount: selection.selectedTestCases.length
      }
    };
    
    // Simular descarga de archivo JSON
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `azure-devops-export-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    alert('¡Exportación completada! El archivo se ha descargado.');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Azure DevOps Test Plan Selector
          </h1>
          <p className="text-gray-600">
            Selecciona y exporta Test Plans, Test Suites y Test Cases de Azure DevOps
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TestPlanTree 
              testPlans={mockTestPlans}
              onSelectionChange={handleSelectionChange}
            />
          </div>
          
          <div className="lg:col-span-1">
            <SelectionSummary 
              selection={selection}
              onExport={handleExport}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;