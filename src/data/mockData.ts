import { TestPlan } from '../types';

export const mockTestPlans: TestPlan[] = [
  {
    id: 'tp-1',
    name: 'Web Application Test Plan',
    state: 'Active',
    expanded: false,
    selected: false,
    testSuites: [
      {
        id: 'ts-1',
        name: 'Authentication Tests',
        type: 'StaticTestSuite',
        expanded: false,
        selected: false,
        testCases: [
          {
            id: 'tc-1',
            name: 'Login with valid credentials',
            state: 'Active',
            priority: 1,
            selected: false
          },
          {
            id: 'tc-2',
            name: 'Login with invalid credentials',
            state: 'Active',
            priority: 2,
            selected: false
          },
          {
            id: 'tc-3',
            name: 'Password reset functionality',
            state: 'Active',
            priority: 2,
            selected: false
          }
        ]
      },
      {
        id: 'ts-2',
        name: 'UI Tests',
        type: 'StaticTestSuite',
        expanded: false,
        selected: false,
        testCases: [
          {
            id: 'tc-4',
            name: 'Navigation menu functionality',
            state: 'Active',
            priority: 2,
            selected: false
          },
          {
            id: 'tc-5',
            name: 'Form validation',
            state: 'Active',
            priority: 1,
            selected: false
          }
        ],
        childSuites: [
          {
            id: 'ts-3',
            name: 'Mobile UI Tests',
            type: 'StaticTestSuite',
            expanded: false,
            selected: false,
            testCases: [
              {
                id: 'tc-6',
                name: 'Responsive design validation',
                state: 'Active',
                priority: 2,
                selected: false
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'tp-2',
    name: 'API Test Plan',
    state: 'Active',
    expanded: false,
    selected: false,
    testSuites: [
      {
        id: 'ts-4',
        name: 'REST API Tests',
        type: 'StaticTestSuite',
        expanded: false,
        selected: false,
        testCases: [
          {
            id: 'tc-7',
            name: 'GET endpoint validation',
            state: 'Active',
            priority: 1,
            selected: false
          },
          {
            id: 'tc-8',
            name: 'POST endpoint validation',
            state: 'Active',
            priority: 1,
            selected: false
          },
          {
            id: 'tc-9',
            name: 'Authentication headers',
            state: 'Active',
            priority: 2,
            selected: false
          }
        ]
      }
    ]
  },
  {
    id: 'tp-3',
    name: 'Performance Test Plan',
    state: 'Inactive',
    expanded: false,
    selected: false,
    testSuites: [
      {
        id: 'ts-5',
        name: 'Load Tests',
        type: 'StaticTestSuite',
        expanded: false,
        selected: false,
        testCases: [
          {
            id: 'tc-10',
            name: 'Concurrent user load test',
            state: 'Active',
            priority: 1,
            selected: false
          }
        ]
      }
    ]
  }
];