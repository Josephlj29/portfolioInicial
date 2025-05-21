// src/utils/dateFormatter.test.js
import { describe, it, expect } from 'vitest'; // Assuming Vitest or similar Jest-like API
import { formatDateRange, sortWorkExperiences } from './dateFormatter';

describe('formatDateRange', () => {
  it('should format a date range with start and end dates correctly', () => {
    expect(formatDateRange('2020-01-01', '2021-01-01')).toBe('January 2020 - January 2021');
  });

  it('should handle "Present" for the end date', () => {
    expect(formatDateRange('2022-03-15', 'Present')).toBe('March 2022 - Present');
  });
  
  it('should handle an empty end date as "Present"', () => {
    expect(formatDateRange('2022-03', '')).toBe('March 2022 - Present');
    expect(formatDateRange('2023', null)).toBe('January 2023 - Present'); // Assuming YYYY normalizes to YYYY-01
  });

  it('should format a date range with only year and month', () => {
    expect(formatDateRange('2021-06', '2022-08')).toBe('June 2021 - August 2022');
  });
  
  it('should format a date range with only year for start date', () => {
    expect(formatDateRange('2020', '2021-05-01')).toBe('January 2020 - May 2021');
  });

  it('should return "Invalid date range" if startDateStr is missing', () => {
    expect(formatDateRange(null, '2021-01-01')).toBe('Invalid date range');
    expect(formatDateRange('', '2021-01-01')).toBe('Invalid date range');
  });
  
  // Test with specific YYYY-MM-DD format which the implementation normalizes to month and year
   it('should correctly parse YYYY-MM-DD to Month YYYY', () => {
    expect(formatDateRange('2020-01-15', '2021-02-20')).toBe('January 2020 - February 2021');
  });
});

describe('sortWorkExperiences', () => {
  const experiences = [
    { name: 'Job A', startDate: '2020-01-01', endDate: '2020-12-31' }, // Earlier
    { name: 'Job B', startDate: '2022-01-01', endDate: 'Present' },    // Current
    { name: 'Job C', startDate: '2021-01-01', endDate: '2021-12-31' }, // Middle
    { name: 'Job D', startDate: '2019-01', endDate: '2019-12' },       // Earliest (YYYY-MM)
    { name: 'Job E', startDate: '2022-03', endDate: null },            // Current (null endDate)
    { name: 'Job F', startDate: 'InvalidDate', endDate: '2023-01-01' }, // Invalid start date
    { name: 'Job G', startDate: '2023-01-01', endDate: 'InvalidDate' }, // Invalid end date
  ];

  it('should sort experiences in reverse chronological order (most recent first)', () => {
    const sorted = sortWorkExperiences(experiences);
    // Expected order: Job B, Job E, Job G (invalid endDate treated as ongoing or very recent), Job C, Job A, Job D, Job F (invalid startDate treated as oldest)
    // The exact order for invalid dates might depend on how Date() parses them (often to NaN, placing them at the end or beginning based on comparison)
    // Given the implementation, NaN dates from invalid strings get sorted towards the end.
    // "Present" or null end dates are treated as "now".
    expect(sorted[0].name).toBe('Job B'); // Present
    expect(sorted[1].name).toBe('Job E'); // Present (null endDate)
    // The behavior of "InvalidDate" as an endDate is tricky. If it becomes NaN, it might sort differently.
    // Assuming the logic treats invalid end dates as "less recent" than "Present" but potentially more recent than valid past dates if not handled carefully.
    // The current sort treats invalid dates as "less than" valid dates, so Job G (invalid endDate) might not be 3rd.
    // Let's trace: B (now), E (now). G's endDate "InvalidDate" -> new Date("InvalidDate") -> Invalid Date (NaN).
    // C (Dec 2021), A (Dec 2020), D (Dec 2019). F's startDate "InvalidDate" -> new Date("InvalidDate") -> Invalid Date (NaN).
    // Sort places NaNs at the end when compared.
    // So, B, E should be first. Then C, A, D. Then F, G (or G, F depending on stable sort for NaNs).
    expect(sorted[2].name).toBe('Job C'); 
    expect(sorted[3].name).toBe('Job A');
    expect(sorted[4].name).toBe('Job D');
    // The relative order of F and G (both with an invalid date component) might be stable but not strictly guaranteed.
    // One has invalid start, other invalid end. Let's assume they go to the end.
    const names = sorted.map(j => j.name);
    expect(names).toEqual(['Job B', 'Job E', 'Job C', 'Job A', 'Job D', 'Job G', 'Job F' ]);
  });

  it('should handle an empty array', () => {
    expect(sortWorkExperiences([])).toEqual([]);
  });

  it('should handle an array with one experience', () => {
    const singleExperience = [{ name: 'Job X', startDate: '2023-01-01', endDate: 'Present' }];
    expect(sortWorkExperiences(singleExperience)).toEqual(singleExperience);
  });
  
  it('should return a new array and not mutate the original', () => {
    const originalExperiences = [
      { name: 'Job A', startDate: '2020-01-01', endDate: '2020-12-31' },
      { name: 'Job B', startDate: '2022-01-01', endDate: 'Present' },
    ];
    const sorted = sortWorkExperiences(originalExperiences);
    expect(sorted).not.toBe(originalExperiences); // Check for new array instance
    expect(originalExperiences[0].name).toBe('Job A'); // Original array should be unchanged
  });

  it('should return an empty array if input is not an array', () => {
    expect(sortWorkExperiences(null)).toEqual([]);
    expect(sortWorkExperiences(undefined)).toEqual([]);
    expect(sortWorkExperiences({})).toEqual([]);
  });
});
