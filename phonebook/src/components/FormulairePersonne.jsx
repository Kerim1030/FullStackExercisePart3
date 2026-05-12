const FormulairePersonne = ({ ajouterPersonne, nouveauNom, setNouveauNom, nouveauNumero, setNouveauNumero }) => {
  return (
    <form onSubmit={ajouterPersonne}>
      <div>
        nom : <input value={nouveauNom} onChange={(event) => setNouveauNom(event.target.value)} />
      </div>
      <div>
        numéro : <input value={nouveauNumero} onChange={(event) => setNouveauNumero(event.target.value)} />
      </div>
      <div>
        <button type="submit">ajouter</button>
      </div>
    </form>
  )
}

export default FormulairePersonne