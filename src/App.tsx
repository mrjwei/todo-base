import React, {useState} from 'react'
import {nanoid} from 'nanoid'
import {Task} from 'features/task'
import {Form} from 'features/form'
import {FilterButton} from 'features/button'

interface Task {
  id: string
  name: string
  completed: boolean
}

interface PropsInterface {
  initialTasks: Task[]
}

function App({initialTasks}: PropsInterface) {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState("all")

  const FILTER_MAP: {
    "all": () => boolean
    [key: string]: (task: Task) => boolean
  } = {
    all: () => true,
    active: (task: Task) => !task.completed,
    completed: (task: Task) => task.completed,
  }

  const FILTER_NAMES = Object.keys(FILTER_MAP)

  const addTask = (name: string) => {
    const newTask = {
      id: `task-${nanoid()}`,
      name,
      completed: false
    }
    setTasks([...tasks, newTask])
  }

  const toggleCompleted = (id: string) => {
    const updatedTasks = tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task)
    setTasks(updatedTasks)
  }

  const deleteTask = (id: string) => {
    const updatedTasks = tasks.filter(task => task.id !== id)
    setTasks(updatedTasks)
  }

  const updateTask = (id: string, data: any) => {
    const updatedTasks = tasks.map(task => task.id === id ? {...task, ...data} : task)
    setTasks(updatedTasks)
  }

  return (
    <div className="todoapp stack-large">
      <h1>Todo Base</h1>
      <Form
        onSubmit={addTask}
      />
      <div className="filters btn-group stack-exception">
        {FILTER_NAMES.map(name => {
          return (
            <FilterButton key={name} name={name} isPressed={name === filter} setFilter={setFilter} />
          )
        })}
      </div>
      <h2 id="list-heading">
        {tasks.length} {tasks.length > 1 ? "tasks" : "task"} remaining
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {tasks.filter(FILTER_MAP[filter]).map(task => {
          const {id, name, completed} = task
          return (
            <Task
              key={id}
              id={id}
              name={name}
              completed={completed}
              onChange={toggleCompleted}
              onClickDelete={deleteTask}
              onClickSave={updateTask}
            />
          )
        })}
      </ul>
    </div>
  );
}

export default App;
