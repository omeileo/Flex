import { ComputedCycleState, CyclePhase, CycleProfile } from '@shared/types/cycleProfile.types'
import { DateTime } from 'luxon'

export const resolveCyclePhase = (
  cycleDay: number,
  avgPeriodLengthDays: number,
  avgCycleLengthDays: number
): CyclePhase => {
  if (cycleDay <= avgPeriodLengthDays) {
    return 'menstruation'
  }

  const follicularEnd = Math.min(13, Math.floor(avgCycleLengthDays * 0.46))
  const ovulationEnd = Math.min(16, Math.floor(avgCycleLengthDays * 0.57))

  if (cycleDay <= follicularEnd) {
    return 'follicular'
  }

  if (cycleDay <= ovulationEnd) {
    return 'ovulation'
  }

  return 'luteal'
}

export const computeCycleState = (profile: CycleProfile): ComputedCycleState | null => {
  if (!profile.enabled || !profile.lastPeriodStartAt) {
    return null
  }

  try {
    const start = DateTime.fromISO(profile.lastPeriodStartAt).startOf('day')
    const today = DateTime.now().startOf('day')
    const daysSinceStart = Math.max(0, Math.floor(today.diff(start, 'days').days))
    const cycleDay = (daysSinceStart % profile.avgCycleLengthDays) + 1
    const phase = resolveCyclePhase(cycleDay, profile.avgPeriodLengthDays, profile.avgCycleLengthDays)

    return {
      phase,
      cycleDay,
      daysUntilPeriod: profile.avgCycleLengthDays - cycleDay + 1
    }
  } catch (_error) {
    return null
  }
}

export const formatCyclePreview = (
  profile: CycleProfile,
  computed: ComputedCycleState | null,
  offLabel: string,
  phaseLabels: Record<CyclePhase, string>
): string => {
  if (!profile.enabled) {
    return offLabel
  }

  if (!computed) {
    return offLabel
  }

  const phaseLabel = phaseLabels[computed.phase]

  return `${phaseLabel} · Day ${computed.cycleDay} · On`
}
