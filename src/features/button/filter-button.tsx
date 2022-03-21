import React from "react"

interface PropsInterface {
  name: string
  isPressed: boolean
  filterTasks: React.MouseEventHandler<HTMLButtonElement>
}

export const FilterButton = ({name, isPressed, filterTasks}: PropsInterface) => {
  return (
    <button type="button" className="btn toggle-btn" name={name} aria-pressed={isPressed} onClick={filterTasks}>
      <span className="visually-hidden">Show </span>
      <span>{name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  )
}

