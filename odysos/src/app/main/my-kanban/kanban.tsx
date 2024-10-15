"use client";

import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Definiere den Typ für Tasks
interface Task {
  id: string;
  content: string;
}

// Definiere den Typ für eine Spalte
interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

// Definiere den Typ für den Zustand
interface State {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
}

const initialData: State = {
  tasks: {
    '1': { id: '1', content: 'Task 1' },
    '2': { id: '2', content: 'Task 2' },
    '3': { id: '3', content: 'Task 3' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['1', '2', '3'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2'],
};

// Task-Komponente als draggable Item
const Task = ({ task, index }: { task: Task; index: number }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '16px',
        marginBottom: '8px',
        backgroundColor: 'blue',
        border: '1px solid #ccc',
      }}
    >
      {task.content}
    </div>
  );
};

// Column-Komponente als droppable Ziel
const Column = ({ column, tasks }: { column: Column; tasks: Task[] }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'TASK',
    drop: (item: { id: string; index: number }) => {
      console.log(`Dropped task ${item.id} in column ${column.id}`);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        margin: '8px',
        border: '1px solid lightgrey',
        borderRadius: '4px',
        width: '220px',
        minHeight: '100px',
        backgroundColor: isOver ? 'lightblue' : 'white',
      }}
    >
      <h3 style={{ padding: '8px' }}>{column.title}</h3>
      {tasks.map((task, index) => (
        <Task key={task.id} task={task} index={index} />
      ))}
    </div>
  );
};

export default function SimpleKanbanBoard() {
  const [state, setState] = useState<State>(initialData);

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex' }}>
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </div>
    </DndProvider>
  );
}