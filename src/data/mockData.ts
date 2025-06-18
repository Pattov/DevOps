import { TestPlan } from '../types';

export const mockTestPlans: TestPlan[] = [
  {
    id: 'tp-1',
    name: 'Web Application Test Plan',
    state: 'Active',
    description: 'Comprehensive testing plan for the web application including UI, functionality, and integration tests.',
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    expanded: false,
    selected: false,
    testSuites: [
      {
        id: 'ts-1',
        name: 'Authentication Tests',
        type: 'StaticTestSuite',
        description: 'Test suite covering all authentication scenarios',
        expanded: false,
        selected: false,
        testCases: [
          {
            id: 'tc-1',
            name: 'Login with valid credentials',
            state: 'Active',
            priority: 1,
            selected: false,
            description: 'Verify that users can successfully log in with valid username and password',
            preconditions: 'User account exists in the system',
            steps: '1. Navigate to login page\n2. Enter valid username\n3. Enter valid password\n4. Click login button',
            expectedResult: 'User is successfully logged in and redirected to dashboard',
            variables: ['username', 'password', 'loginUrl'],
            tags: ['authentication', 'login', 'smoke'],
            automationStatus: 'Automated',
            lastExecuted: '2024-01-10',
            outcome: 'Passed'
          },
          {
            id: 'tc-2',
            name: 'Login with invalid credentials',
            state: 'Active',
            priority: 2,
            selected: false,
            description: 'Verify that login fails with invalid credentials and shows appropriate error message',
            preconditions: 'Login page is accessible',
            steps: '1. Navigate to login page\n2. Enter invalid username\n3. Enter invalid password\n4. Click login button',
            expectedResult: 'Login fails and error message is displayed',
            variables: ['invalidUsername', 'invalidPassword'],
            tags: ['authentication', 'negative', 'security'],
            automationStatus: 'Automated',
            lastExecuted: '2024-01-10',
            outcome: 'Passed'
          },
          {
            id: 'tc-3',
            name: 'Password reset functionality',
            state: 'Active',
            priority: 2,
            selected: false,
            description: 'Test the password reset workflow',
            preconditions: 'User account exists with valid email',
            steps: '1. Click forgot password link\n2. Enter email address\n3. Check email for reset link\n4. Follow reset process',
            expectedResult: 'Password is successfully reset',
            variables: ['email', 'resetToken'],
            tags: ['authentication', 'password', 'email'],
            automationStatus: 'Not Automated',
            lastExecuted: '2024-01-08',
            outcome: 'Not Executed'
          }
        ]
      },
      {
        id: 'ts-2',
        name: 'UI Tests',
        type: 'StaticTestSuite',
        description: 'User interface and user experience testing',
        expanded: false,
        selected: false,
        testCases: [
          {
            id: 'tc-4',
            name: 'Navigation menu functionality',
            state: 'Active',
            priority: 2,
            selected: false,
            description: 'Verify all navigation menu items work correctly',
            preconditions: 'User is logged in',
            steps: '1. Click each menu item\n2. Verify correct page loads\n3. Check menu highlighting',
            expectedResult: 'All menu items navigate to correct pages',
            variables: ['menuItems', 'expectedUrls'],
            tags: ['ui', 'navigation', 'smoke'],
            automationStatus: 'Planned',
            lastExecuted: '2024-01-09',
            outcome: 'Failed'
          },
          {
            id: 'tc-5',
            name: 'Form validation',
            state: 'Active',
            priority: 1,
            selected: false,
            description: 'Test form validation rules and error messages',
            preconditions: 'Form is accessible',
            steps: '1. Submit empty form\n2. Enter invalid data\n3. Verify error messages\n4. Submit valid data',
            expectedResult: 'Validation works correctly with appropriate messages',
            variables: ['formFields', 'validationRules'],
            tags: ['ui', 'validation', 'forms'],
            automationStatus: 'Automated',
            lastExecuted: '2024-01-11',
            outcome: 'Passed'
          }
        ],
        childSuites: [
          {
            id: 'ts-3',
            name: 'Mobile UI Tests',
            type: 'StaticTestSuite',
            description: 'Mobile-specific UI testing',
            expanded: false,
            selected: false,
            testCases: [
              {
                id: 'tc-6',
                name: 'Responsive design validation',
                state: 'Active',
                priority: 2,
                selected: false,
                description: 'Verify responsive design works on different screen sizes',
                preconditions: 'Application supports responsive design',
                steps: '1. Test on mobile device\n2. Test on tablet\n3. Verify layout adapts',
                expectedResult: 'Layout adapts correctly to different screen sizes',
                variables: ['screenSizes', 'breakpoints'],
                tags: ['mobile', 'responsive', 'ui'],
                automationStatus: 'Not Automated',
                lastExecuted: '2024-01-07',
                outcome: 'Blocked'
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
    description: 'API testing including REST endpoints, authentication, and data validation',
    startDate: '2024-02-01',
    endDate: '2024-04-01',
    expanded: false,
    selected: false,
    testSuites: [
      {
        id: 'ts-4',
        name: 'REST API Tests',
        type: 'StaticTestSuite',
        description: 'Testing REST API endpoints',
        expanded: false,
        selected: false,
        testCases: [
          {
            id: 'tc-7',
            name: 'GET endpoint validation',
            state: 'Active',
            priority: 1,
            selected: false,
            description: 'Validate GET endpoints return correct data',
            preconditions: 'API is running and accessible',
            steps: '1. Send GET request\n2. Verify response status\n3. Validate response data',
            expectedResult: 'GET request returns 200 status with correct data',
            variables: ['apiUrl', 'expectedData'],
            tags: ['api', 'get', 'validation'],
            automationStatus: 'Automated',
            lastExecuted: '2024-01-12',
            outcome: 'Passed'
          },
          {
            id: 'tc-8',
            name: 'POST endpoint validation',
            state: 'Active',
            priority: 1,
            selected: false,
            description: 'Validate POST endpoints create data correctly',
            preconditions: 'API accepts POST requests',
            steps: '1. Send POST request with data\n2. Verify response status\n3. Confirm data was created',
            expectedResult: 'POST request creates data and returns 201 status',
            variables: ['postData', 'apiEndpoint'],
            tags: ['api', 'post', 'creation'],
            automationStatus: 'Automated',
            lastExecuted: '2024-01-12',
            outcome: 'Passed'
          },
          {
            id: 'tc-9',
            name: 'Authentication headers',
            state: 'Active',
            priority: 2,
            selected: false,
            description: 'Test API authentication and authorization',
            preconditions: 'Authentication system is configured',
            steps: '1. Send request without auth\n2. Send with invalid auth\n3. Send with valid auth',
            expectedResult: 'Authentication is properly enforced',
            variables: ['authToken', 'apiKey'],
            tags: ['api', 'authentication', 'security'],
            automationStatus: 'Automated',
            lastExecuted: '2024-01-11',
            outcome: 'Not Executed'
          }
        ]
      }
    ]
  },
  {
    id: 'tp-3',
    name: 'Performance Test Plan',
    state: 'Inactive',
    description: 'Performance and load testing scenarios',
    startDate: '2024-03-01',
    endDate: '2024-05-01',
    expanded: false,
    selected: false,
    testSuites: [
      {
        id: 'ts-5',
        name: 'Load Tests',
        type: 'StaticTestSuite',
        description: 'Load and stress testing',
        expanded: false,
        selected: false,
        testCases: [
          {
            id: 'tc-10',
            name: 'Concurrent user load test',
            state: 'Active',
            priority: 1,
            selected: false,
            description: 'Test system performance under concurrent user load',
            preconditions: 'System is deployed and accessible',
            steps: '1. Configure load test\n2. Simulate concurrent users\n3. Monitor performance metrics',
            expectedResult: 'System handles expected load without degradation',
            variables: ['userCount', 'duration', 'endpoints'],
            tags: ['performance', 'load', 'concurrent'],
            automationStatus: 'Planned',
            lastExecuted: '2024-01-05',
            outcome: 'Not Executed'
          }
        ]
      }
    ]
  }
];