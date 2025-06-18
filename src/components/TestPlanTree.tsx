import React, { useState } from 'react';
import { TreeNode } from './TreeNode';
import { TestPlan, TestSuite, TestCase, SelectionState } from '../types';

interface TestPlanTreeProps {
  testPlans: TestPlan[];
  onSelectionChange: (selection: SelectionState) => void;
}

export const TestPlanTree: React.FC<TestPlanTreeProps> = ({ testPlans, onSelectionChange }) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [selectedNodes, setSelectedNodes] = useState<SelectionState>({
    selectedTestPlans: [],
    selectedTestSuites: [],
    selectedTestCases: []
  });

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNodes(newExpanded);
  };

  const handleSelect = (id: string, type: 'testplan' | 'testsuite' | 'testcase') => {
    const newSelection = { ...selectedNodes };
    
    switch (type) {
      case 'testplan':
        if (newSelection.selectedTestPlans.includes(id)) {
          newSelection.selectedTestPlans = newSelection.selectedTestPlans.filter(tpId => tpId !== id);
          // Deselect all child suites and cases
          const testPlan = testPlans.find(tp => tp.id === id);
          if (testPlan) {
            testPlan.testSuites.forEach(suite => {
              newSelection.selectedTestSuites = newSelection.selectedTestSuites.filter(tsId => tsId !== suite.id);
              suite.testCases.forEach(testCase => {
                newSelection.selectedTestCases = newSelection.selectedTestCases.filter(tcId => tcId !== testCase.id);
              });
              if (suite.childSuites) {
                deselectChildSuites(suite.childSuites, newSelection);
              }
            });
          }
        } else {
          newSelection.selectedTestPlans.push(id);
          // Auto-select all child suites and cases
          const testPlan = testPlans.find(tp => tp.id === id);
          if (testPlan) {
            testPlan.testSuites.forEach(suite => {
              if (!newSelection.selectedTestSuites.includes(suite.id)) {
                newSelection.selectedTestSuites.push(suite.id);
              }
              suite.testCases.forEach(testCase => {
                if (!newSelection.selectedTestCases.includes(testCase.id)) {
                  newSelection.selectedTestCases.push(testCase.id);
                }
              });
              if (suite.childSuites) {
                selectChildSuites(suite.childSuites, newSelection);
              }
            });
          }
        }
        break;
        
      case 'testsuite':
        if (newSelection.selectedTestSuites.includes(id)) {
          newSelection.selectedTestSuites = newSelection.selectedTestSuites.filter(tsId => tsId !== id);
          // Deselect all child cases and suites
          const suite = findTestSuite(testPlans, id);
          if (suite) {
            suite.testCases.forEach(testCase => {
              newSelection.selectedTestCases = newSelection.selectedTestCases.filter(tcId => tcId !== testCase.id);
            });
            if (suite.childSuites) {
              deselectChildSuites(suite.childSuites, newSelection);
            }
          }
        } else {
          newSelection.selectedTestSuites.push(id);
          // Auto-select all child cases and suites
          const suite = findTestSuite(testPlans, id);
          if (suite) {
            suite.testCases.forEach(testCase => {
              if (!newSelection.selectedTestCases.includes(testCase.id)) {
                newSelection.selectedTestCases.push(testCase.id);
              }
            });
            if (suite.childSuites) {
              selectChildSuites(suite.childSuites, newSelection);
            }
          }
        }
        break;
        
      case 'testcase':
        if (newSelection.selectedTestCases.includes(id)) {
          newSelection.selectedTestCases = newSelection.selectedTestCases.filter(tcId => tcId !== id);
        } else {
          newSelection.selectedTestCases.push(id);
        }
        break;
    }
    
    setSelectedNodes(newSelection);
    onSelectionChange(newSelection);
  };

  const selectChildSuites = (suites: TestSuite[], selection: SelectionState) => {
    suites.forEach(suite => {
      if (!selection.selectedTestSuites.includes(suite.id)) {
        selection.selectedTestSuites.push(suite.id);
      }
      suite.testCases.forEach(testCase => {
        if (!selection.selectedTestCases.includes(testCase.id)) {
          selection.selectedTestCases.push(testCase.id);
        }
      });
      if (suite.childSuites) {
        selectChildSuites(suite.childSuites, selection);
      }
    });
  };

  const deselectChildSuites = (suites: TestSuite[], selection: SelectionState) => {
    suites.forEach(suite => {
      selection.selectedTestSuites = selection.selectedTestSuites.filter(tsId => tsId !== suite.id);
      suite.testCases.forEach(testCase => {
        selection.selectedTestCases = selection.selectedTestCases.filter(tcId => tcId !== testCase.id);
      });
      if (suite.childSuites) {
        deselectChildSuites(suite.childSuites, selection);
      }
    });
  };

  const findTestSuite = (testPlans: TestPlan[], suiteId: string): TestSuite | null => {
    for (const testPlan of testPlans) {
      const found = findTestSuiteRecursive(testPlan.testSuites, suiteId);
      if (found) return found;
    }
    return null;
  };

  const findTestSuiteRecursive = (suites: TestSuite[], suiteId: string): TestSuite | null => {
    for (const suite of suites) {
      if (suite.id === suiteId) return suite;
      if (suite.childSuites) {
        const found = findTestSuiteRecursive(suite.childSuites, suiteId);
        if (found) return found;
      }
    }
    return null;
  };

  const renderTestSuite = (suite: TestSuite, level: number): React.ReactNode => {
    const hasChildren = suite.testCases.length > 0 || (suite.childSuites && suite.childSuites.length > 0);
    const isExpanded = expandedNodes.has(suite.id);
    const isSelected = selectedNodes.selectedTestSuites.includes(suite.id);

    return (
      <TreeNode
        key={suite.id}
        id={suite.id}
        name={suite.name}
        type="testsuite"
        level={level}
        selected={isSelected}
        expanded={isExpanded}
        hasChildren={hasChildren}
        onToggle={toggleExpanded}
        onSelect={handleSelect}
      >
        {isExpanded && (
          <>
            {suite.testCases.map(testCase => (
              <TreeNode
                key={testCase.id}
                id={testCase.id}
                name={testCase.name}
                type="testcase"
                level={level + 1}
                selected={selectedNodes.selectedTestCases.includes(testCase.id)}
                state={testCase.state}
                priority={testCase.priority}
                onSelect={handleSelect}
              />
            ))}
            {suite.childSuites?.map(childSuite => renderTestSuite(childSuite, level + 1))}
          </>
        )}
      </TreeNode>
    );
  };

  return (
    <div className="bg-white border rounded-lg">
      <div className="p-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900">Test Plans</h2>
        <p className="text-sm text-gray-600 mt-1">
          Selecciona los Test Plans, Test Suites y Test Cases que deseas exportar
        </p>
      </div>
      
      <div className="p-2 max-h-96 overflow-y-auto">
        {testPlans.map(testPlan => {
          const hasChildren = testPlan.testSuites.length > 0;
          const isExpanded = expandedNodes.has(testPlan.id);
          const isSelected = selectedNodes.selectedTestPlans.includes(testPlan.id);

          return (
            <TreeNode
              key={testPlan.id}
              id={testPlan.id}
              name={testPlan.name}
              type="testplan"
              level={0}
              selected={isSelected}
              expanded={isExpanded}
              hasChildren={hasChildren}
              state={testPlan.state}
              onToggle={toggleExpanded}
              onSelect={handleSelect}
            >
              {isExpanded && testPlan.testSuites.map(suite => renderTestSuite(suite, 1))}
            </TreeNode>
          );
        })}
      </div>
    </div>
  );
};