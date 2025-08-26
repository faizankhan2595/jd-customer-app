import axios from 'axios'
import { API_BASE_URL } from 'constants/ApiConstant'

class OneMapService {
  static async searchByPostalCode(postalCode) {
    try {
      if (!postalCode || postalCode.length !== 6) {
        throw new Error('Postal code must be exactly 6 digits')
      }

      const response = await axios.get(`${API_BASE_URL}/api/onemap/search`, {
        params: { postalCode }
      })

      if (response.data.success) {
        return {
          success: true,
          data: response.data.data
        }
      } else {
        return {
          success: false,
          error: response.data.message || 'Location not found'
        }
      }
    } catch (error) {
      console.error('OneMap search error:', error)
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to search location'
      }
    }
  }

  static parseAddressComponents(address) {
    if (!address) return {}

    // Split address and try to extract components
    const parts = address.split(' ')
    const components = {}

    // Try to extract block number (usually first number)
    const blockMatch = address.match(/^(\d+)/)
    if (blockMatch) {
      components.block_number = blockMatch[1]
    }

    // Extract road name (everything after block number until "SINGAPORE")
    const roadMatch = address.match(/^\d+\s+(.+?)\s+SINGAPORE/)
    if (roadMatch) {
      components.street_name = roadMatch[1]
    }

    return components
  }

  static formatSingaporeAddress(addressData) {
    const { details } = addressData
    
    return {
      block_number: details.BLK_NO || '',
      street_name: details.ROAD_NAME || '',
      building_name: details.BUILDING && details.BUILDING !== 'NIL' ? details.BUILDING : '',
      postal_code: details.POSTAL || '',
      full_address: details.ADDRESS || '',
      latitude: parseFloat(details.LATITUDE) || 0,
      longitude: parseFloat(details.LONGITUDE) || 0
    }
  }

  static getSingaporeCountryId(countryList) {
    // Look for Singapore in the country list
    const singapore = countryList.find(country => 
      country.name?.toLowerCase().includes('singapore') ||
      country.country_name?.toLowerCase().includes('singapore') ||
      country.code?.toLowerCase() === 'sg'
    )
    return singapore?.id || null
  }
}

export default OneMapService