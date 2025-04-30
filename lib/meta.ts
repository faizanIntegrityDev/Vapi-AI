// import axios from 'axios';

// export const askMetaAI = async (context: string): Promise<string> => {
//     const response = await fetch(
//         `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.META_API_KEY}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             contents: [{ parts: [{ text: context }] }],
//           }),
//         }
//       );
//       const data = await response.json(); 
//       return data.candidates[0].content.parts[0].text;
// //   const response = await axios.post(
// //     `https://generativelanguage.googleapis.com/v1beta3/models/chat-bison-001:generateMessage?key=${process.env.META_API_KEY}`,
// //     {
// //       prompt: {
// //         messages: [
// //           {
// //             author: 'user',
// //             content: context,
// //           },
// //         ],
// //       },
// //     }
// //   );

// //   return response.data.candidates?.[0]?.content || '';
// };


import axios from 'axios';

export const askMetaAI = async (context: string): Promise<string> => {
  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-4.1',
        messages: [
          {
            role: 'user',
            content: context,
          },
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'X-Title': 'VAPI AI PROJECT',
        },
      }
    );

    return response.data.choices?.[0]?.message?.content || '';
  } catch (error: any) {
    console.error('OpenRouter API error:', error.response?.data || error.message);
    return 'Sorry, something went wrong while contacting the AI.';
  }
};

