// export const fetchAIResponse = async (input: string): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     // Simulate an API call with a timeout
//     setTimeout(() => {
//       if (input) {
//         // Resolve with a predefined AI response if input is valid
//         resolve(
//           "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
//         );
//       } else {
//         // Reject the promise if the input is invalid
//         reject(new Error("Invalid input"));
//       }
//     }, 1000); // Delay to simulate response time
//   });
// };


export const fetchAIResponse = async (input: string): Promise<string> => {
  const apiKey = "AIzaSyA35TY4jKQRbW9GZtlN7CNtqaCaBjHh50E"; // Your API key
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  // Construct the request payload as expected by the API
  const payload = {
    contents: [
      {
        parts: [
          { text: input }
        ]
      }
    ]
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // Assuming the AI response is located in `data.candidates[0].content.parts[0].text`
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      throw new Error("No AI response received");
    }
  } catch (error: unknown) {
    // Type check to ensure error is an instance of Error
    if (error instanceof Error) {
      return `Error: ${error.message}`;
    } else {
      return 'An unknown error occurred';
    }
  }
};





