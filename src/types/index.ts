export interface TestCase {
  id: string;
  name: string;
  state: 'Active' | 'Inactive';
  priority: number;
  selected?: boolean;
}

export interface TestSuite {
  id: string;
  name: string;
  type: 'StaticTestSuite' | 'DynamicTestSuite' | 'RequirementTestSuite';
  testCases: TestCase[];
  childSuites?: TestSuite[];
  selected?: boolean;
  expanded?: boolean;
}

export interface TestPlan {
  id: string;
  name: string;
  state: 'Active' | 'Inactive';
  testSuites: TestSuite[];
  selected?: boolean;
  expanded?: boolean;
}

export interface SelectionState {
  selectedTestPlans: string[];
  selectedTestSuites: string[];
  selectedTestCases: string[];
}