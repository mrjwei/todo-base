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

function App({initialTasks}: PropsInterface) {
  const [tasks, setTasks] = useState(initialTasks)
  const [filteredTasks, setFilteredTasks] = useState(initialTasks)
  const [filter, setFilter] = useState("all")
  const listHeadingRef = useRef<null | HTMLHeadingElement>(null)

  useEffect(() => {
    filterTasks(filter)
  }, [tasks])

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

  const filterTasks = (filter: string) => {
    let tasksAfterFiltering
    if (filter === "active") {
      tasksAfterFiltering = tasks.filter(task => !task.completed)
    } else if (filter === "completed") {
      tasksAfterFiltering = tasks.filter(task => task.completed)
    } else {
      tasksAfterFiltering = tasks
    }
    setFilteredTasks(tasksAfterFiltering)
  }

  return (
    <div className="todoapp stack-large">
      <h1>Todo Base</h1>
      <Form
        onSubmit={addTask}
      />
      <div className="filters btn-group stack-exception">
        <FilterButton key="all" name="all" isPressed={"all" === filter} filterTasks={() => filterTasks("all")} />
        <FilterButton key="active" name="active" isPressed={"active" === filter} filterTasks={() => filterTasks("active")} />
        <FilterButton key="completed" name="completed" isPressed={"completed" === filter} filterTasks={() => filterTasks("completed")} />
      </div>
      <h2 id="list-heading" tabIndex={-1} ref={listHeadingRef}>
        {filteredTasks.length} {filteredTasks.length > 1 ? "tasks" : "task"} remaining
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {filteredTasks.map(task => {
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
