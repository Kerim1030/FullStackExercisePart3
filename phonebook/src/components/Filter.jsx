const Filter = ({ showFilter, setShowFilter }) => {
  return (
    <div>
      filter shown with <input value={showFilter} onChange={(event) => setShowFilter(event.target.value)} />
    </div>
  )
}

export default Filter