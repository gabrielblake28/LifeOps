export const GetCookies = (cookieName: string) => {
  // Get all cookies as a single string
  // Get all cookies as a single string
  const allCookies = document.cookie;

  // Split the string into an array of individual cookies
  const cookieArray = allCookies.split(';');

  // Loop through the array of cookies and find the one with the specified name
  for (let i = 0; i < cookieArray.length; i++) {
    const cookie = cookieArray[i].trim();

    // Check if the cookie starts with the specified name
    if (cookie.indexOf(cookieName + '=') === 0) {
      // Extract and return the cookie value
      return cookie.substring(cookieName.length + 1);
    }
  }

  // Return null if the cookie is not found
  return null;
};
