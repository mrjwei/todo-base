import React, { useState, useRef, useEffect } from "react"

interface TaskPropsInterface {
  id: string
  name: string
  completed: boolean
  onChange: (id: string) => void
  onClickDelete: (id: string) => void
  onClickSave: (id: string, data: any) => void
}

export const Task = ({id, name, completed, onChange, onClickDelete, onClickSave}: TaskPropsInterface) => {
  const [editable, setEditable] = useState(false)
  const [nameValue, setNameValue] = useState(name)
  const editFieldRef = useRef<null | HTMLInputElement>(null)
  const editButtonRef = useRef<null | HTMLButtonElement>(null)

  useEffect(() => {
    if (editable) {
      editFieldRef.current?.focus()
    } else {
      editButtonRef.current?.focus()
    }
  }, [editable])

  const toggleCheck = () => {
    onChange(id)
  }

  const handleClickDelete = () => {
    onClickDelete(id)
  }

  const handleClickSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onClickSave(id, {name: nameValue})
    setNameValue("")
    setEditable(false)
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const target = event.target as HTMLInputElement
    setNameValue(target.value)
  }

  const handleClickEdit = () => {
    setEditable(true)
    setNameValue(name)
  }

  const Edit = (
    <form
      className="stack-small"
      onSubmit={handleClickSave}
    >
      <label htmlFor="name">Name</label>
      <input
        ref={editFieldRef}
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={nameValue}
        onChange={handleChange}
      />
      <div className="btn-group">
        <button type="submit" className="btn btn__primary todo-edit">Save</button>
        <button type="button" className="btn todo-cancel" onClick={() => setEditable(false)}>Cancel</button>
      </div>
    </form>
  )

  return (
    <li className="todo stack-small">
      <div className="c-cb">
        <input
          id={id}
          type="checkbox"
          checked={completed}
          onChange={toggleCheck}
        />
        <label className="todo-label" htmlFor={id}>
          {name}
        </label>
      </div>
      <div className="btn-group">
        <button
          ref={editButtonRef}
          type="button"
          className="btn"
          onClick={handleClickEdit}
        >
          Edit <span className="visually-hidden">{name}</span>
        </button>
        <button
          type="button"
          className="btn btn__danger"
          onClick={handleClickDelete}
        >
          Delete <span className="visually-hidden">{name}</span>
        </button>
      </div>
      {editable && Edit}
    </li>
  )
}

