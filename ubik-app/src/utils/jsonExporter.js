/**
 * Utility functions for exporting data to JSON files
 */

/**
 * Downloads data as a JSON file to the user's computer
 * @param {Object|Array} data - The data to be saved as JSON
 * @param {string} filename - The name of the file (without extension)
 */
export const downloadAsJson = (data, filename = 'data') => {
  try {
    // Convert data to JSON string with formatting
    const jsonString = JSON.stringify(data, null, 2);
    
    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // Create a temporary URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.json`;
    
    // Trigger the download
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    console.log(`Data successfully exported to ${filename}.json`);
    return true;
  } catch (error) {
    console.error('Error exporting data to JSON:', error);
    return false;
  }
};

/**
 * Saves data to a backend API endpoint
 * @param {Object|Array} data - The data to be saved
 * @param {string} endpoint - The API endpoint URL
 * @param {string} filename - Optional filename for server-side storage
 */
export const saveToServer = async (data, endpoint, filename = 'data.json') => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filename: filename,
        data: data,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Data successfully saved to server:', result);
    return result;
  } catch (error) {
    console.error('Error saving data to server:', error);
    throw error;
  }
};

/**
 * Copies JSON data to clipboard
 * @param {Object|Array} data - The data to be copied
 */
export const copyJsonToClipboard = async (data) => {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    await navigator.clipboard.writeText(jsonString);
    console.log('Data copied to clipboard');
    return true;
  } catch (error) {
    console.error('Error copying data to clipboard:', error);
    return false;
  }
};
