import React from "react"

interface PropsInterface {
  name: string
  isPressed: boolean
  setFilter: React.MouseEventHandler<HTMLButtonElement>
}

export const FilterButton = ({name, isPressed, setFilter}: PropsInterface) => {
  return (
    <button type="button" className="btn toggle-btn" name={name} aria-pressed={isPressed} onClick={setFilter}>
      <span className="visually-hidden">Show </span>
      <span>{name}</span>
      <span className="visually-hidden"> tasks</span>
    </button>
  )
}

