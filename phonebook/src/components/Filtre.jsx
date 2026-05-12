const Filtre = ({ filtre, setFiltre }) => {
  return (
    <div>
      filtrer par nom <input value={filtre} onChange={(event) => setFiltre(event.target.value)} />
    </div>
  )
}

export default Filtre