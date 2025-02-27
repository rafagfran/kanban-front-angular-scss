export type TaskType = {
  id: string;
  title: string;
  description: string;
};
export type ColumnType = {
  title: string;
  tasks: TaskType[];
};

export const MOCK_DATA: ColumnType[] = [
  {
    title: 'Backlog',
    tasks: [
      {
        id: '1',
        title:
          'asaasasaasasaas asaasasaas asaasasaasasaas asaasasaas asaasasaasasaas asaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaasasaas',
        description:
          'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      },
      {
        id: '2',
        title: 'Define project scope',
        description: 'Establish project boundaries and key deliverables.',
      },
    ],
  },
  {
    title: 'To Do',
    tasks: [
      {
        id: '3',
        title: 'Design UI mockups',
        description:
          'Create initial wireframes and high-fidelity designs for approval.',
      },
      {
        id: '4',
        title: 'Write API documentation',
        description: 'Ensure clear and concise API guidelines.',
      },
      {
        id: '5',
        title: 'Set up database',
        description: 'Define schema and relationships for core entities.',
      },
      {
        id: '17',
        title: 'Plan sprint tasks',
        description: 'Organize backlog items into upcoming sprints.',
      },
      {
        id: '18',
        title: 'Define user roles',
        description: 'Establish permission levels and access controls.',
      },
    ],
  },
  {
    title: 'In Progress',
    tasks: [
      {
        id: '6',
        title: 'Develop authentication',
        description: 'Implement login and registration with JWT.',
      },
    ],
  },
  {
    title: 'Review',
    tasks: [
      {
        id: '9',
        title: 'Code review for authentication',
        description: 'Ensure security best practices and clean code.',
      },
      {
        id: '10',
        title: 'Test API endpoints',
        description: 'Verify correct responses and error handling.',
      },
      {
        id: '21',
        title: 'Check accessibility compliance',
        description: 'Ensure WCAG standards are met in the UI.',
      },
      {
        id: '22',
        title: 'Review database schema',
        description: 'Validate table structures and relationships.',
      },
    ],
  },
  {
    title: 'Testing',
    tasks: [
      {
        id: '11',
        title: 'Write unit tests',
        description: 'Increase test coverage for core functions.',
      },
      {
        id: '12',
        title: 'Perform UI testing',
        description: 'Check responsiveness and cross-browser compatibility.',
      },
      {
        id: '23',
        title: 'Load testing',
        description: 'Simulate high traffic to assess system performance.',
      },
      {
        id: '24',
        title: 'Security testing',
        description: 'Identify vulnerabilities and security risks.',
      },
    ],
  },
  {
    title: 'Done',
    tasks: [
      {
        id: '13',
        title: 'Project setup',
        description:
          'Configured repository, CI/CD pipeline, and basic dependencies.',
      },
      {
        id: '14',
        title: 'Initial requirements gathering',
        description: 'Compiled user needs and system constraints.',
      },
      {
        id: '25',
        title: 'Set up development environment',
        description: 'Installed dependencies and configured tools.',
      },
      {
        id: '26',
        title: 'Deploy initial version',
        description: 'Pushed the first working release to production.',
      },
    ],
  },
];
