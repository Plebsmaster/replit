import { render, screen, act } from "@testing-library/react"
import { FormProvider, useFormData } from "@/components/form/FormProvider"

// Test component to access context
function TestComponent() {
  const { formData, updateFormData } = useFormData()
  
  return (
    <div>
      <span data-testid="email">{formData.email}</span>
      <button 
        onClick={() => updateFormData({ email: "test@example.com" })}
        data-testid="update-email"
      >
        Update Email
      </button>
    </div>
  )
}

describe("FormProvider", () => {
  it("should provide initial form data", () => {
    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>
    )

    expect(screen.getByTestId("email")).toHaveTextContent("")
  })

  it("should update form data", () => {
    render(
      <FormProvider>
        <TestComponent />
      </FormProvider>
    )

    act(() => {
      screen.getByTestId("update-email").click()
    })

    expect(screen.getByTestId("email")).toHaveTextContent("test@example.com")
  })

  it("should throw error when used outside provider", () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {})
    
    expect(() => {
      render(<TestComponent />)
    }).toThrow("useFormData must be used within a FormProvider")

    consoleSpy.mockRestore()
  })
})