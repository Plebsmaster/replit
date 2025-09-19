# Slide Migration Guide

## Overview
This guide helps you migrate slide components from another platform to this SalonID application. Each slide has a dedicated folder for its assets under `public/img/slide{NUMBER}/`.

## Image Organization Structure
```
public/img/
├── slide1/     # Slide 1 images
├── slide2/     # Slide 2 images (style selection)
├── slide3/     # Slide 3 images (elegant styles)
├── slide4/     # Slide 4 images (elegant1 variants)
├── slide5/     # Slide 5 images (elegant2 variants)
├── slide6/     # Slide 6 images (color selection)
├── slide7/     # Slide 7 images (color palettes)
├── slide8/     # Slide 8 images (if any)
├── slide9/     # Slide 9 images (icon with/without)
├── slide10/    # Slide 10 images (if any - currently uses SVG icons)
├── slide11/    # Slide 11 images (modern styles)
├── slide12/    # Slide 12 images (modern1 variants)
├── slide13/    # Slide 13 images (modern2 variants)
├── slide14/    # Slide 14 images (modern3 variants)
├── slide15/    # Slide 15 images (modern6 variants)
└── slide{N}/   # New slide folders created as needed
```

## Migration Process for New Slides

### Step 1: Prepare the Information
When migrating a slide, provide:
1. **Slide Name/Number**: e.g., "Slide16" or "ProductSelection"
2. **Variables**: Form data fields to store (e.g., `productType`, `packageSize`)
3. **Conditional Logic**: Navigation rules (e.g., "if productType='shampoo' go to slide17, else go to slide18")
4. **Images**: List of images needed (if any)
5. **Similar Slide Reference**: If similar to an existing slide (e.g., "similar to Slide3")

### Step 2: Create Image Folder
```bash
mkdir -p public/img/slide{NUMBER}
```

### Step 3: Add Images
Place all images for the slide in its dedicated folder:
```bash
cp source_images/* public/img/slide{NUMBER}/
```

### Step 4: Create Component
Create the component file in `components/steps/Slide{NUMBER}.tsx`

### Step 5: Update Step Registry
Add the slide to `lib/form/steps.ts`:
```typescript
['slide-{number}', {
  id: 'slide-{number}',
  key: 'slide{Number}Selection',
  title: 'Slide Title',
  schema: slide{Number}Schema,
  componentFile: 'Slide{NUMBER}.tsx',
  showGlobalNext: true/false,
  showGlobalPrev: true/false,
  nextStep: (formData: Partial<FormData>): string => {
    // Conditional logic here
    if (formData.someField === 'value1') {
      return 'slide-17'
    }
    return 'slide-18'
  },
}],
```

### Step 6: Update Schema
Add new fields to `lib/form/schema.ts` if needed:
```typescript
export const slide{Number}Schema = z.object({
  newField: z.string().optional(),
  // Add other fields as needed
})
```

## Handling Conditional Logic

### Simple Next Step
```typescript
nextStep: (formData: Partial<FormData>): string => 'next-slide-id'
```

### Conditional Navigation
```typescript
nextStep: (formData: Partial<FormData>): string => {
  if (formData.style === 'elegant') {
    return 'elegant-options'
  } else if (formData.style === 'modern') {
    return 'modern-options'
  }
  return 'default-next-step'
}
```

### Pointing to Future Slides
The system supports referencing slides that don't exist yet:
```typescript
nextStep: (formData: Partial<FormData>): string => {
  // These slide IDs can reference future slides that will be added later
  if (formData.productType === 'shampoo') {
    return 'shampoo-config' // This slide can be added later
  }
  return 'conditioner-config' // This slide can be added later
}
```

## Image Path Convention
Always use the dedicated slide folder:
```typescript
const items = [
  { 
    key: "option1", 
    label: "Option 1", 
    imageSrc: "/img/slide{NUMBER}/image1.jpg" 
  },
  // More items...
]
```

## Component Template for Similar Slides

If a new slide is similar to an existing one (e.g., Slide3), copy and modify:
1. Copy the existing component file
2. Update the slide number in the filename
3. Update image paths to use the new slide folder
4. Modify text content and labels
5. Update formData field names if different
6. Adjust conditional logic as needed

## Example Migration Request Format

```
Slide Name: Slide16 - Product Selection
Variables: 
- productType: string (shampoo/conditioner/mask)
- packageSize: string (small/medium/large)

Conditional Logic:
- If productType = 'shampoo' -> go to slide17
- If productType = 'conditioner' -> go to slide18
- If productType = 'mask' -> go to slide19

Images:
- shampoo.jpg
- conditioner.jpg
- mask.jpg

Similar to: Slide3 (uses carousel selection)
```

## Notes
- The system uses XState for navigation, supporting complex conditional flows
- Slides can reference future slide IDs that don't exist yet
- All slides use TypeScript with full type safety
- ResponsiveCarousel component is used for mobile-friendly image selection
- Form data persists across navigation (back/forward)