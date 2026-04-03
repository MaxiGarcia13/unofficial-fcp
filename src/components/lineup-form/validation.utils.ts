const ROUNDS_PATTERN = /^\d+(?:-\d+)*$/;

export function validateRounds(value: string) {
  const trimmedValue = value.trim();
  // eslint-disable-next-line e18e/prefer-static-regex
  const normalizedValue = trimmedValue.replace(/\s*-\s*/g, '-');

  if (!trimmedValue) {
    return {
      values: [] as number[],
      error: '',
    };
  }

  if (!ROUNDS_PATTERN.test(normalizedValue)) {
    return {
      values: [] as number[],
      error: 'Usa solo numeros separados por "-" (ej: 2-3).',
    };
  }

  const values = normalizedValue.split('-').map(Number);

  if (values.some(round => round <= 0)) {
    return {
      values: [] as number[],
      error: 'Cada tanda debe ser mayor que 0.',
    };
  }

  const totalRounds = values.reduce((total, round) => total + round, 0);

  if (totalRounds > 5) {
    return {
      values: [] as number[],
      error: 'La suma de las tandas no puede ser mayor que 5.',
    };
  }

  return {
    values,
    error: '',
  };
}
