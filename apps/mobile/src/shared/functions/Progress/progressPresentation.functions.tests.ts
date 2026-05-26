import { buildProgressPresentation, formatProgressVolumeKg } from './progressPresentation.functions'

describe('progressPresentation.functions', () => {
  it('formats large volume values compactly', () => {
    expect(formatProgressVolumeKg(48200)).toBe('48.2k')
    expect(formatProgressVolumeKg(500)).toBe('500')
  })

  it('builds stat cards and weekly chart data from metrics', () => {
    const presentation = buildProgressPresentation({
      metrics: {
        workoutsCompletedThisMonth: 3,
        totalVolumeKg: 1192.5,
        currentStreakDays: 2,
        personalRecordsCount: 4,
        weeklyVolume: [
          { dayKey: 'mon', volumeKg: 0 },
          { dayKey: 'tue', volumeKg: 480 },
          { dayKey: 'wed', volumeKg: 312.5 },
          { dayKey: 'thu', volumeKg: 0 },
          { dayKey: 'fri', volumeKg: 0 },
          { dayKey: 'sat', volumeKg: 0 },
          { dayKey: 'sun', volumeKg: 400 }
        ]
      },
      labels: {
        workouts: 'Workouts',
        volume: 'Volume',
        streak: 'Streak',
        prs: 'PRs',
        workoutsHint: 'This month',
        volumeHint: 'kg logged',
        streakHint: 'days',
        prsHint: 'all time',
        weeklyDays: {
          mon: 'M',
          tue: 'T',
          wed: 'W',
          thu: 'T',
          fri: 'F',
          sat: 'S',
          sun: 'S'
        }
      }
    })

    expect(presentation.stats[0].value).toBe('3')
    expect(presentation.stats[1].value).toBe('1.2k')
    expect(presentation.stats[2].value).toBe('2')
    expect(presentation.weeklyVolume[1]).toEqual({ id: 'tue', label: 'T', value: 480 })
  })
})
