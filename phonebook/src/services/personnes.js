import axios from 'axios'

const baseUrl = '/api/persons'

const getTous = () => {
  const requete = axios.get(baseUrl)
  return requete.then(reponse => reponse.data)
}

const creer = (nouvelObjet) => {
  const requete = axios.post(baseUrl, nouvelObjet)
  return requete.then(reponse => reponse.data)
}

const supprimer = (id) => {
  const requete = axios.delete(`${baseUrl}/${id}`)
  return requete.then(reponse => reponse.data)
}

const mettreAJour = (id, nouvelObjet) => {
  const requete = axios.put(`${baseUrl}/${id}`, nouvelObjet)
  return requete.then(reponse => reponse.data)
}

export default { getTous, creer, supprimer, mettreAJour }