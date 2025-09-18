# Google Sheets Integration Setup

To connect your form to Google Sheets, follow these steps:

## 1. Create Google Apps Script

1. Go to [script.google.com](https://script.google.com)
2. Create a new project
3. Replace the default code with the following:

\`\`\`javascript
/**
 * Google Apps Script Web App for SalonID Design Form Submissions
 */

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents)

    // Open your Google Sheet by ID (replace with your actual sheet ID)
    const SHEET_ID = "YOUR_GOOGLE_SHEET_ID_HERE"
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
\`\`\`

## 2. Setup Google Sheet

1. Create a new Google Sheet
2. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
3. Replace `YOUR_GOOGLE_SHEET_ID_HERE` in the script with your actual Sheet ID

## 3. Deploy Web App

1. In Google Apps Script, click "Deploy" > "New deployment"
2. Choose type: "Web app"
3. Set execute as: "Me"
4. Set access: "Anyone"
5. Click "Deploy"
6. Copy the web app URL

## 4. Add Environment Variable

Your implementation ID `AKfycbx6NOnKbD6CQsUTZ9P71cllp_jFxSSSbsVB60LpKSoSXc4NdOP84DyNRBf2E1md9qb1Qg` needs to be part of the complete Google Apps Script URL.

Add this to your project environment variables:
- **Variable name:** `GOOGLE_SCRIPT_URL`
- **Value:** `https://script.google.com/macros/s/AKfycbx6NOnKbD6CQsUTZ9P71cllp_jFxSSSbsVB60LpKSoSXc4NdOP84DyNRBf2E1md9qb1Qg/exec`

The complete URL format is: `https://script.google.com/macros/s/[YOUR_IMPLEMENTATION_ID]/exec`

## 5. What Happens After Form Submission

When users complete and submit the form:

1. **Loading State:** The submit button shows "Versturen..." with a spinner
2. **Success:** 
   - Green success message appears: "Form submitted successfully to Google Sheets"
   - After 3 seconds, the form automatically resets and returns to the welcome page
   - Data is saved to your Google Sheet with timestamp and all form fields
3. **Error:** 
   - Red error message appears with specific error details
   - Form remains on the contact step so users can retry
   - Common errors: network issues, Google Apps Script problems, or missing environment variables

## 6. Test the Integration

Submit a test form to verify:
- Data appears correctly in your Google Sheet
- Success message displays properly
- Form resets after successful submission

## Troubleshooting

- **"Network error":** Check your internet connection and try again
- **"Failed to submit":** Verify the GOOGLE_SCRIPT_URL environment variable is set correctly
- **No data in sheet:** Ensure your Google Apps Script is deployed as a web app with "Anyone" access
