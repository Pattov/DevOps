export interface TestCase {
  id: string;
  name: string;
  state: 'Active' | 'Inactive';
  priority: number;
  selected?: boolean;
  description?: string;
  preconditions?: string;
  steps?: string;
  expectedResult?: string;
  variables?: string[];
  tags?: string[];
  automationStatus?: 'Automated' | 'Not Automated' | 'Planned';
  lastExecuted?: string;
  outcome?: 'Passed' | 'Failed' | 'Blocked' | 'Not Executed';
}

export interface TestSuite {
  id: string;
  name: string;
  type: 'StaticTestSuite' | 'DynamicTestSuite' | 'RequirementTestSuite';
  testCases: TestCase[];
  childSuites?: TestSuite[];
  selected?: boolean;
  expanded?: boolean;
  description?: string;
}

export interface TestPlan {
  id: string;
  name: string;
  state: 'Active' | 'Inactive';
  testSuites: TestSuite[];
  selected?: boolean;
  expanded?: boolean;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export interface SelectionState {
  selectedTestPlans: string[];
  selectedTestSuites: string[];
  selectedTestCases: string[];
}

export interface ExportSettings {
  printDesign: 'detailed' | 'summary' | 'compact' | 'custom';
  includeUnexecutedCases: boolean;
  fieldsToInclude: {
    description: boolean;
    preconditions: boolean;
    steps: boolean;
    expectedResult: boolean;
    variables: boolean;
    tags: boolean;
    priority: boolean;
    automationStatus: boolean;
    lastExecuted: boolean;
    outcome: boolean;
  };
  testOrder: 'original' | 'alphabetical' | 'priority' | 'status';
  groupBy: 'none' | 'suite' | 'priority' | 'status';
}