import { validateEmail, validateName, validatePhone } from "@/lib/utils/form-validation"

describe("Form Validation Utils", () => {
  describe("validateEmail", () => {
    it("should validate correct email addresses", () => {
      expect(validateEmail("test@example.com")).toEqual({ isValid: true })
      expect(validateEmail("user.name+tag@domain.co.uk")).toEqual({ isValid: true })
    })

    it("should reject invalid email addresses", () => {
      expect(validateEmail("")).toEqual({ 
        isValid: false, 
        error: "E-mailadres is verplicht" 
      })
      expect(validateEmail("invalid-email")).toEqual({ 
        isValid: false, 
        error: "Voer een geldig e-mailadres in" 
      })
    })
  })

  describe("validateName", () => {
    it("should validate correct names", () => {
      expect(validateName("John", "Voornaam")).toEqual({ isValid: true })
      expect(validateName("Mary Jane", "Voornaam")).toEqual({ isValid: true })
    })

    it("should reject invalid names", () => {
      expect(validateName("", "Voornaam")).toEqual({ 
        isValid: false, 
        error: "Voornaam is verplicht" 
      })
      expect(validateName("A", "Voornaam")).toEqual({ 
        isValid: false, 
        error: "Voornaam moet minimaal 2 karakters bevatten" 
      })
    })
  })

  describe("validatePhone", () => {
    it("should validate correct phone numbers", () => {
      expect(validatePhone("+31 6 12345678")).toEqual({ isValid: true })
      expect(validatePhone("0612345678")).toEqual({ isValid: true })
      expect(validatePhone("")).toEqual({ isValid: true }) // Optional field
    })

    it("should reject invalid phone numbers", () => {
      expect(validatePhone("123")).toEqual({ 
        isValid: false, 
        error: "Voer een geldig telefoonnummer in" 
      })
      expect(validatePhone("abc123def")).toEqual({ 
        isValid: false, 
        error: "Voer een geldig telefoonnummer in" 
      })
    })
  })
})