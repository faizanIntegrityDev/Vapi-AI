// import type { NextApiRequest, NextApiResponse } from 'next'

// export default (req: NextApiRequest, res: NextApiResponse) => {
//   res.status(200).json({ message: 'Hello from API' })
// }

import type { NextApiRequest, NextApiResponse } from 'next';
import { askMetaAI } from '../../lib/meta';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tech, experience, level } = req.body;

  const context = `Generate a technical interview question for a candidate applying for a ${level} position in ${tech} with ${experience} years of experience.`;

  try {
    console.log(`this is tech and other variables from vapi ${tech} and ${experience} and ${level}`);
        const question = await askMetaAI(context);
        console.log(`here is the question thanks${question}`)
    res.status(200).json({ meta_question: question });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate question from Meta AI.' });
  }
}
