import axios from 'axios'
import { paiementsExemple } from './paiementsData'

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'

export const getPaiements = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/paiements`)
    return response.data
  } catch (error) {
    console.warn('API indisponible, utilisation des données d\'exemple:', error.message)
    return paiementsExemple
  }
}

export const getPaiementById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/paiements/${id}`)
    return response.data
  } catch (error) {
    console.error(`Erreur lors du chargement du paiement ${id}:`, error)
    throw error
  }
}

export const createPaiement = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/paiements`, data)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la création du paiement:', error)
    throw error
  }
}

export const updatePaiement = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/paiements/${id}`, data)
    return response.data
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du paiement ${id}:`, error)
    throw error
  }
}

export const deletePaiement = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/paiements/${id}`)
    return response.data
  } catch (error) {
    console.error(`Erreur lors de la suppression du paiement ${id}:`, error)
    throw error
  }
}

export const getPaiementsParEtat = async (etat) => {
  try {
    const response = await axios.get(`${BASE_URL}/paiements/etat/${etat}`)
    return response.data
  } catch (error) {
    console.error(`Erreur lors du chargement des paiements (${etat}):`, error)
    throw error
  }
}

export const getPaiementsParEleve = async (eleveId) => {
  try {
    const response = await axios.get(`${BASE_URL}/paiements/eleve/${eleveId}`)
    return response.data
  } catch (error) {
    console.error(`Erreur lors du chargement des paiements de l'élève ${eleveId}:`, error)
    throw error
  }
}

