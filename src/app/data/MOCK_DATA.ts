export type TaskType = {
  id: string;
  title: string;
  description: string;
};

export type ColumnType = {
  id: string;
  title: string;
  tasks: TaskType[];
};

export const MOCK_DATA: ColumnType[] = [
  {
    id: 'todo',
    title: 'To Do',
    tasks: [
      {
        id: '1',
        title: 'Estudar Angular CDK',
        description: 'Aprender sobre Drag & Drop',
      },
      {
        id: '2',
        title: 'Criar mock de dados',
        description: 'Gerar dados fictícios para testes',
      },
    ],
  },
  {
    id: 'in_progress',
    title: 'In Progress',
    tasks: [
      {
        id: '3',
        title: 'Implementar Kanban',
        description: 'Criar um sistema de board',
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      {
        id: '4',
        title: 'Revisar documentação',
        description: 'Verificar se a documentação está atualizada',
      },
    ],
  },
];
