import { useState, useCallback } from 'react'
import { message } from 'antd'
import OneMapService from 'utils/OneMapService'

const usePostalCodeLookup = (form, countryList) => {
  const [loading, setLoading] = useState(false)

  const lookupPostalCode = useCallback(async (postalCode) => {
    if (!postalCode || postalCode.length !== 6) {
      return
    }

    setLoading(true)
    
    try {
      const result = await OneMapService.searchByPostalCode(postalCode)
      
      if (result.success) {
        const addressData = OneMapService.formatSingaporeAddress(result.data)
        
        // Get Singapore country ID
        const singaporeId = OneMapService.getSingaporeCountryId(countryList)
        
        // Update form fields
        const updates = {
          latitude: addressData.latitude.toString(),
          longitude: addressData.longitude.toString(),
        }

        // Set block number if available and field exists
        if (addressData.block_number) {
          updates.block_number = addressData.block_number
        }

        // Set country to Singapore if found
        if (singaporeId) {
          updates.country = singaporeId
        }

        // Set street name/number if available
        if (addressData.street_name) {
          // Check which field name is used in the form
          const currentValues = form.getFieldsValue()
          if ('street_name' in currentValues) {
            updates.street_name = addressData.street_name
          } else if ('street_number' in currentValues) {
            updates.street_number = addressData.street_name
          }
        }

        form.setFieldsValue(updates)
        
        message.success('Address details loaded successfully')
        
        return {
          success: true,
          data: result.data,
          formattedData: addressData
        }
      } else {
        message.warning(result.error || 'Location not found for this postal code')
        return { success: false, error: result.error }
      }
    } catch (error) {
      console.error('Postal code lookup error:', error)
      message.error('Failed to lookup postal code')
      return { success: false, error: error.message }
    } finally {
      setLoading(false)
    }
  }, [form, countryList])

  return {
    lookupPostalCode,
    loading
  }
}

export default usePostalCodeLookup