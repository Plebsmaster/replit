/**
 * Google Apps Script Web App for SalonID Design Form Submissions
 *
 * IMPORTANT: This file is meant to be deployed in Google Apps Script (script.google.com),
 * NOT run in the Next.js environment. The lint errors for SpreadsheetApp and ContentService
 * are false positives - these are global objects available in Google Apps Script.
 *
 * Setup Instructions:
 * 1. Go to script.google.com and create a new project
 * 2. Replace the default code with this script
 * 3. Create a new Google Sheet and copy its ID from the URL
 * 4. Replace 'YOUR_GOOGLE_SHEET_ID_HERE' with your actual sheet ID
 * 5. Deploy as web app with execute permissions set to "Anyone"
 * 6. Copy the web app URL and add it to your environment variables as GOOGLE_SCRIPT_URL
 */

// Global objects available in Google Apps Script environment:
// - SpreadsheetApp: Google Sheets API
// - ContentService: HTTP response service

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents)

    // Open your Google Sheet by ID (replace with your actual sheet ID)
    const SHEET_ID = "1k_HDnnlGh9nqVSL6aPwH1fpHFMuqYspbLfhh07S9XlM"
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet()

    // If this is the first submission, add headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "First Name",
        "Last Name",
        "Email",
        "Phone",
        "Style",
        "Ingredients",
        "Agree Terms",
        "Subscribe Newsletter",
      ])
    }

    // Add the form data as a new row
    sheet.appendRow([
      data.timestamp,
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.style,
      data.ingredients,
      data.agreeTerms,
      data.subscribeNewsletter,
    ])

    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: "Data saved successfully",
      }),
    ).setMimeType(ContentService.MimeType.JSON)
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: "Error: " + error.toString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON)
  }
}
