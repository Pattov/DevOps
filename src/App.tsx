import React, { useState } from 'react';
import { TestPlanTree } from './components/TestPlanTree';
import { SelectionSummary } from './components/SelectionSummary';
import { mockTestPlans } from './data/mockData';
import { SelectionState, ExportSettings, TestPlan, TestSuite, TestCase } from './types';

function App() {
  const [selection, setSelection] = useState<SelectionState>({
    selectedTestPlans: [],
    selectedTestSuites: [],
    selectedTestCases: []
  });

  const handleSelectionChange = (newSelection: SelectionState) => {
    setSelection(newSelection);
  };

  const getSelectedData = () => {
    const selectedData = {
      testPlans: [] as TestPlan[],
      testSuites: [] as TestSuite[],
      testCases: [] as TestCase[]
    };

    // Get selected test plans
    selectedData.testPlans = mockTestPlans.filter(tp => 
      selection.selectedTestPlans.includes(tp.id)
    );

    // Get selected test suites
    const findTestSuites = (suites: TestSuite[]): TestSuite[] => {
      const found: TestSuite[] = [];
      suites.forEach(suite => {
        if (selection.selectedTestSuites.includes(suite.id)) {
          found.push(suite);
        }
        if (suite.childSuites) {
          found.push(...findTestSuites(suite.childSuites));
        }
      });
      return found;
    };

    mockTestPlans.forEach(tp => {
      selectedData.testSuites.push(...findTestSuites(tp.testSuites));
    });

    // Get selected test cases
    const findTestCases = (suites: TestSuite[]): TestCase[] => {
      const found: TestCase[] = [];
      suites.forEach(suite => {
        found.push(...suite.testCases.filter(tc => 
          selection.selectedTestCases.includes(tc.id)
        ));
        if (suite.childSuites) {
          found.push(...findTestCases(suite.childSuites));
        }
      });
      return found;
    };

    mockTestPlans.forEach(tp => {
      selectedData.testCases.push(...findTestCases(tp.testSuites));
    });

    return selectedData;
  };

  const sortTestCases = (testCases: TestCase[], order: ExportSettings['testOrder']): TestCase[] => {
    const sorted = [...testCases];
    
    switch (order) {
      case 'alphabetical':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'priority':
        return sorted.sort((a, b) => a.priority - b.priority);
      case 'status':
        return sorted.sort((a, b) => {
          const statusOrder = { 'Passed': 1, 'Failed': 2, 'Blocked': 3, 'Not Executed': 4 };
          return (statusOrder[a.outcome || 'Not Executed'] || 5) - (statusOrder[b.outcome || 'Not Executed'] || 5);
        });
      default:
        return sorted;
    }
  };

  const filterTestCases = (testCases: TestCase[], includeUnexecuted: boolean): TestCase[] => {
    if (includeUnexecuted) return testCases;
    return testCases.filter(tc => tc.outcome && tc.outcome !== 'Not Executed');
  };

  const handleExport = (settings: ExportSettings) => {
    console.log('Exportando con configuración:', settings);
    
    const selectedData = getSelectedData();
    let testCasesToExport = selectedData.testCases;
    
    // Filter unexecuted cases if needed
    testCasesToExport = filterTestCases(testCasesToExport, settings.includeUnexecutedCases);
    
    // Sort test cases
    testCasesToExport = sortTestCases(testCasesToExport, settings.testOrder);
    
    // Group test cases if needed
    let groupedData: any = testCasesToExport;
    if (settings.groupBy !== 'none') {
      const groups: { [key: string]: TestCase[] } = {};
      
      testCasesToExport.forEach(tc => {
        let groupKey = '';
        switch (settings.groupBy) {
          case 'priority':
            groupKey = `Prioridad ${tc.priority}`;
            break;
          case 'status':
            groupKey = tc.outcome || 'Sin Ejecutar';
            break;
          case 'suite':
            // Find the suite this test case belongs to
            const suite = selectedData.testSuites.find(ts => 
              ts.testCases.some(tcase => tcase.id === tc.id)
            );
            groupKey = suite ? suite.name : 'Sin Suite';
            break;
        }
        
        if (!groups[groupKey]) {
          groups[groupKey] = [];
        }
        groups[groupKey].push(tc);
      });
      
      groupedData = groups;
    }
    
    // Filter fields based on settings
    const processTestCase = (tc: TestCase) => {
      const processed: any = {
        id: tc.id,
        name: tc.name,
        state: tc.state
      };
      
      Object.entries(settings.fieldsToInclude).forEach(([field, include]) => {
        if (include && tc[field as keyof TestCase] !== undefined) {
          processed[field] = tc[field as keyof TestCase];
        }
      });
      
      return processed;
    };
    
    const exportData = {
      timestamp: new Date().toISOString(),
      settings: settings,
      selection: selection,
      data: {
        testPlans: selectedData.testPlans.map(tp => ({
          id: tp.id,
          name: tp.name,
          state: tp.state,
          description: tp.description,
          startDate: tp.startDate,
          endDate: tp.endDate
        })),
        testSuites: selectedData.testSuites.map(ts => ({
          id: ts.id,
          name: ts.name,
          type: ts.type,
          description: ts.description
        })),
        testCases: settings.groupBy === 'none' 
          ? groupedData.map(processTestCase)
          : Object.entries(groupedData).reduce((acc, [group, cases]) => {
              acc[group] = (cases as TestCase[]).map(processTestCase);
              return acc;
            }, {} as any)
      },
      summary: {
        testPlansCount: selectedData.testPlans.length,
        testSuitesCount: selectedData.testSuites.length,
        testCasesCount: testCasesToExport.length,
        filteredCasesCount: selectedData.testCases.length - testCasesToExport.length
      }
    };
    
    // Generate filename based on settings
    const designSuffix = settings.printDesign !== 'detailed' ? `-${settings.printDesign}` : '';
    const orderSuffix = settings.testOrder !== 'original' ? `-${settings.testOrder}` : '';
    const exportFileDefaultName = `azure-devops-export${designSuffix}${orderSuffix}-${new Date().toISOString().split('T')[0]}.json`;
    
    // Download file
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    const message = settings.includeUnexecutedCases 
      ? `¡Exportación completada! Se han exportado ${testCasesToExport.length} casos de prueba.`
      : `¡Exportación completada! Se han exportado ${testCasesToExport.length} casos de prueba (${exportData.summary.filteredCasesCount} casos sin ejecutar fueron excluidos).`;
    
    alert(message);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Azure DevOps Test Plan Selector
          </h1>
          <p className="text-gray-600">
            Selecciona y exporta Test Plans, Test Suites y Test Cases de Azure DevOps con opciones avanzadas de configuración
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