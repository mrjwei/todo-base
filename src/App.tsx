import React, {useState, useEffect, useRef} from 'react'
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

const filterFuncs: {
  [key: string]: (task: Task) => boolean
} = {
  "all": (task: Task) => true,
  "active": (task: Task) => !task.completed,
  "completed": (task: Task) => task.completed,
}

function App({initialTasks}: PropsInterface) {
  const useCustomState = <T extends unknown>(key: string, initialState: T): [T, (state: T) => void] => {
    const [state, setState] = useState<T>(
      localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : initialState
    )

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state))
    }, [key, state])

    return [state, setState]
  }

  const [tasks, setTasks] = useCustomState("tasks", initialTasks)
  const [filter, setFilter] = useCustomState("filter", "all")
  const listHeadingRef = useRef<null | HTMLHeadingElement>(null)

  function usePrevious(value: any) {
    const ref = useRef<null | any>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevTaskLength = usePrevious(tasks.length)

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current?.focus();
    }
  }, [tasks.length, prevTaskLength])

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
        <FilterButton key="all" name="all" isPressed={"all" === filter} setFilter={() => setFilter("all")} />
        <FilterButton key="active" name="active" isPressed={"active" === filter} setFilter={() => setFilter("active")} />
        <FilterButton key="completed" name="completed" isPressed={"completed" === filter} setFilter={() => setFilter("completed")} />
      </div>
      <h2 id="list-heading" tabIndex={-1} ref={listHeadingRef}>
        {tasks.filter(filterFuncs[filter]).length} {tasks.filter(filterFuncs[filter]).length > 1 ? "tasks" : "task"} remaining
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {tasks.filter(filterFuncs[filter]).map(task => {
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
