import { UrlSegment } from '@angular/router';

// Define a custom UrlMatcher function that matches routes with a return URL segment
export function returnMatcher(segments: UrlSegment[]) {
  // Check if the first segment is 'login'
  if (segments.length > 0 && segments[0].path === 'login') {
    // Check if there is a second segment that is the return URL
    if (segments.length > 1) {
      // Return a matched route with the return URL as a parameter
      return {
        consumed: segments,
        posParams: {
          returnUrl: segments[1],
        },
      };
    } else {
      // Return a matched route without any parameters
      return {
        consumed: segments,
        posParams: {},
      };
    }
  } else {
    // Return null if the route does not match
    return null;
  }
}
