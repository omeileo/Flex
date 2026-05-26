import { getThemeColors, themeIdentity, themePalettes } from '@shared/styles/StyleConstants'

describe('StyleConstants theme tokens', () => {
  it('maps each theme mode to a distinct palette with shadow color', () => {
    expect(getThemeColors('light').accent).toBe(themePalettes.light.accent)
    expect(getThemeColors('dark').background).toBe(themePalettes.dark.background)
    expect(getThemeColors('pink').accentMuted).toBe(themePalettes.pink.accentMuted)
    expect(getThemeColors('dark').shadowColor).toBe('#000000')
  })

  it('keeps modality accents shared across themes for workout recognition', () => {
    const light = getThemeColors('light')
    const dark = getThemeColors('dark')

    expect(light.accentStrength).toBe(dark.accentStrength)
    expect(light.accentEnergy).toBe('#22C55E')
  })

  it('documents visual intent for each theme mode', () => {
    expect(themeIdentity.pink.label).toBe('Gym Girlie')
    expect(themeIdentity.dark.tagline).toContain('Charcoal')
  })
})
