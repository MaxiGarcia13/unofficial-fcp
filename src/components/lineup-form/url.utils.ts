import type { Step } from './types';

export function parseUrlNavigationState(): { page: number; step: Step } {
  const params = new URLSearchParams(window.location.search);
  const pageValue = Number.parseInt(params.get('page') ?? '0', 10);
  const page = Number.isNaN(pageValue) || pageValue < 0 ? 0 : pageValue;
  const stepRaw = params.get('step');
  const step = (
    stepRaw === 'players'
    || stepRaw === 'summary'
    || stepRaw === 'generated'
  )
    ? stepRaw
    : 'rounds';

  return { page, step };
}
