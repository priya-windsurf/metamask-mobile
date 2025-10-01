/**
 * Type definitions for utility functions
 */

/**
 * Simple typed utility function
 */
export const simpleUtility = (input: string): string => {
  return input.toLowerCase();
};

/**
 * Generic utility function
 */
export const genericUtility = <T>(
  array: T[],
  predicate: (item: T) => boolean,
): T | undefined => {
  return array.find(predicate);
};

/**
 * Utility with union types
 */
export type Status = 'pending' | 'success' | 'error';

export const getStatusColor = (status: Status): string => {
  switch (status) {
    case 'pending':
      return '#FFA500';
    case 'success':
      return '#00FF00';
    case 'error':
      return '#FF0000';
    default:
      // TypeScript ensures exhaustive check
      const _exhaustiveCheck: never = status;
      return _exhaustiveCheck;
  }
};

/**
 * Utility with optional parameters
 */
export const formatValue = (
  value: number,
  decimals: number = 2,
  prefix?: string,
): string => {
  const formatted = value.toFixed(decimals);
  return prefix ? `${prefix}${formatted}` : formatted;
};

/**
 * Async utility function
 */
export const asyncUtility = async (id: string): Promise<DataType> => {
  const response = await fetch(`/api/${id}`);
  return response.json();
};
