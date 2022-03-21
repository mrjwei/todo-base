import React, {useState} from "react"

interface Task {
  id: string
  name: string
  completed: boolean
}

interface PropsInterface {
  onSubmit: (name: string) => void
}

export const Form = ({onSubmit}: PropsInterface) => {
  const [name, setName] = useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit(name)
    setName("")
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const target = event.target as HTMLInputElement
    setName(target.value)
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  )
}

