// Import the timeago.js library
import timeago from 'timeago.js';

// Convert the date strings to Date objects
const date1 = new Date('2023-09-19T03:56:01.120Z');
const date2 = new Date(Date.now());

// Calculate the time difference in milliseconds
const timeDiff = Math.abs(date2.getTime() - date1.getTime());

// Get the time difference in a human-readable format
const timeDiffString = timeago.format(Date.now() - timeDiff);

console.log(timeDiffString); // "1 day ago"




