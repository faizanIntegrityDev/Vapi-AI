import axios from 'axios';

export const askMetaAI = async (context: string): Promise<string> => {
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta3/models/chat-bison-001:generateMessage?key=${process.env.META_API_KEY}`,
    {
      prompt: {
        messages: [
          {
            author: 'user',
            content: context,
          },
        ],
      },
    }
  );

  return response.data.candidates?.[0]?.content || '';
};
