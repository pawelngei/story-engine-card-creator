type Type = 'agent' | 'anchor' | 'aspect' | 'conflict' | 'engine'

type TypeOption = { label: string, value: Type }

export const typeOptions: TypeOption[] = [
  { label: 'Agent', value: 'agent' },
  { label: 'Engine', value: 'engine' },
  { label: 'Anchor', value: 'anchor' },
  { label: 'Conflict', value: 'conflict' },
  { label: 'Aspect', value: 'aspect' },
]

export const twoSectionCards = ['conflict', 'engine']

export const emptyCard = {
  top: '',
  bottom: '',
  left: '',
  right: '',
  type: 'agent'
}

export const sampleCard = {
  top: 'topText',
  bottom: 'bottomText',
  left: '',
  right: '',
  type: 'engine'
}

export type Quality = 'original' | 'light' | 'minimalist'

export const defaultOptions = {
  displayBacks: false,
  frontQuality: 'original' as Quality,
  backQuality: 'original' as Quality
}

type QualityOption = { label: string, value: Quality }

export const backQualityOptions: QualityOption[] = [
  { label: 'Original', value: 'original' },
  { label: 'Minimalist', value: 'minimalist' }
]

export const frontQualityOptions: QualityOption[] = [
  { label: 'Original', value: 'original' },
  { label: 'Light', value: 'light' },
  { label: 'Minimalist', value: 'minimalist' }
]

export const maxZoom = 1.25
