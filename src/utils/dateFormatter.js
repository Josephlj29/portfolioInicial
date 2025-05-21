// src/utils/dateFormatter.js
export function formatDateRange(startDateStr, endDateStr) {
  if (!startDateStr) return "Invalid date range"; // Basic validation

  const options = { year: 'numeric', month: 'long' };
  // Append '-01' to ensure the date string is interpreted as a full date,
  // avoiding potential issues with timezones or day-of-month assumptions.
  // Handles "YYYY-MM" and "YYYY-MM-DD" by effectively normalizing to "YYYY-MM-01" for parsing.
  const startDate = new Date(startDateStr.includes('-') ? `${startDateStr.substring(0,7)}-01T00:00:00Z` : `${startDateStr}-01-01T00:00:00Z`).toLocaleDateString('en-US', options);
  
  if (endDateStr === "Present" || !endDateStr) {
    return `${startDate} - Present`;
  }
  const endDate = new Date(endDateStr.includes('-') ? `${endDateStr.substring(0,7)}-01T00:00:00Z` : `${endDateStr}-01-01T00:00:00Z`).toLocaleDateString('en-US', options);
  return `${startDate} - ${endDate}`;
}

export function sortWorkExperiences(workArray) {
  if (!Array.isArray(workArray)) return [];
  return [...workArray].sort((a, b) => {
    const dateA = (a.endDate === "Present" || !a.endDate) ? new Date() : new Date(a.endDate.includes('-') ? `${a.endDate.substring(0,7)}-01T00:00:00Z` : `${a.endDate}-01-01T00:00:00Z`);
    const dateB = (b.endDate === "Present" || !b.endDate) ? new Date() : new Date(b.endDate.includes('-') ? `${b.endDate.substring(0,7)}-01T00:00:00Z` : `${b.endDate}-01-01T00:00:00Z`);
    
    const timeA = dateA.getTime();
    const timeB = dateB.getTime();

    if (isNaN(timeA) && isNaN(timeB)) return 0; // Both dates invalid
    if (isNaN(timeA)) return 1; // Invalid dates go to the end
    if (isNaN(timeB)) return -1; // Invalid dates go to the end

    return timeB - timeA;
  });
}
