const Personnes = ({ tousAfficher, gererSuppression }) => {
  return (
    <>
      {tousAfficher.map(personne => (
        <p key={personne.name}>
          {personne.name} : {personne.number}{' '}
          <button onClick={() => gererSuppression(personne.id)}>supprimer</button>
        </p>
      ))}
    </>
  )
}

export default Personnes