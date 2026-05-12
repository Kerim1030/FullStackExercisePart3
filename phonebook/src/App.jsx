import { useState, useEffect } from 'react'
import FormulairePersonne from './components/FormulairePersonne'
import Filtre from './components/Filtre'
import Personnes from './components/Personnes'
import personneService from './services/personnes'
import Notification from './components/Notification'

const App = () => {
  const [personnes, setPersonnes] = useState([])
  const [nouveauNom, setNouveauNom] = useState('')
  const [nouveauNumero, setNouveauNumero] = useState('')
  const [filtre, setFiltre] = useState('')
  const [message, setMessage] = useState(null)

  const tousAfficher = filtre === ''
    ? personnes
    : personnes.filter(p => p.name.toLowerCase().includes(filtre.toLowerCase()))

  const ajouterPersonne = (event) => {
    event.preventDefault()

    if (personnes.some(p => p.name === nouveauNom)) {
      if (!window.confirm(`${nouveauNom} est déjà dans le répertoire, remplacer l'ancien numéro ?`)) {
        return
      }
      const personne = personnes.find(p => p.name === nouveauNom)
      const personneModifiee = { ...personne, number: nouveauNumero }
      personneService
        .mettreAJour(personne.id, personneModifiee)
        .then(reponse => {
          setPersonnes(personnes.map(p => p.id !== personne.id ? p : reponse))
          setNouveauNom('')
          setNouveauNumero('')
        })
        .catch(() => {
          setMessage(`${nouveauNom} a déjà été supprimé du serveur`)
          setTimeout(() => setMessage(null), 5000)
          setPersonnes(personnes.filter(p => p.id !== personne.id))
        })
      return
    }

    const nouvellePersonne = {
      name: nouveauNom,
      number: nouveauNumero
    }

    personneService
      .creer(nouvellePersonne)
      .then(reponse => {
        setPersonnes(personnes.concat(reponse))
        setNouveauNom('')
        setNouveauNumero('')
        setMessage(`${nouveauNom} ajouté`)
        setTimeout(() => setMessage(null), 5000)
      })
      .catch(erreur => {
        setMessage(erreur.response.data.error)
        setTimeout(() => setMessage(null), 5000)
      })
  }

  const gererSuppression = (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette personne ?')) {
      return
    }
    personneService
      .supprimer(id)
      .then(() => {
        setPersonnes(personnes.filter(p => p.id !== id))
      })
  }

  useEffect(() => {
    personneService
      .getTous()
      .then(reponse => {
        setPersonnes(reponse)
      })
  }, [])

  return (
    <div>
      <h2>Répertoire téléphonique</h2>
      <Notification message={message} />
      <Filtre filtre={filtre} setFiltre={setFiltre} />
      <h3>Ajouter un nouveau</h3>
      <FormulairePersonne
        ajouterPersonne={ajouterPersonne}
        nouveauNom={nouveauNom}
        setNouveauNom={setNouveauNom}
        nouveauNumero={nouveauNumero}
        setNouveauNumero={setNouveauNumero}
      />
      <h3>Numéros</h3>
      <Personnes tousAfficher={tousAfficher} gererSuppression={gererSuppression} />
    </div>
  )
}

export default App