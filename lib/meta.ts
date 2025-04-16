import axios from 'axios';

export const askMetaAI = async (context: string): Promise<string> => {
    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.META_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: context }] }],
          }),
        }
      );
      const data = await response.json(); 
      return data.candidates[0].content.parts[0].text;
//   const response = await axios.post(
//     `https://generativelanguage.googleapis.com/v1beta3/models/chat-bison-001:generateMessage?key=${process.env.META_API_KEY}`,
//     {
//       prompt: {
//         messages: [
//           {
//             author: 'user',
//             content: context,
//           },
//         ],
//       },
//     }
//   );

//   return response.data.candidates?.[0]?.content || '';
};
