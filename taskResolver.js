let tasks = [
  {
    id: '1',
    title: 'Frontend React',
    description: 'UI React',
    completed: false,
    duration: 5,
  },
  {
    id: '2',
    title: 'Backend Node',
    description: 'API Express',
    completed: false,
    duration: 3,
  },
];

const taskResolver = {
  Query: {
    task: (_, { id }) => tasks.find(t => t.id === id),
    tasks: () => tasks,
  },

  Mutation: {
    addTask: (_, { title, description, completed, duration }) => {
      const task = {
        id: String(tasks.length + 1),
        title,
        description,
        completed,
        duration,
      };
      tasks.push(task);
      return task;
    },

    completeTask: (_, { id }) => {
      const task = tasks.find(t => t.id === id);
      if (task) task.completed = true;
      return task;
    },

    changeDescription: (_, { id, description }) => {
      const task = tasks.find(t => t.id === id);
      if (task) task.description = description;
      return task;
    },

    deleteTask: (_, { id }) => {
      const index = tasks.findIndex(t => t.id === id);
      if (index === -1) return null;

      const deleted = tasks.splice(index, 1);
      return deleted[0];
    },
  },
};

module.exports = taskResolver;