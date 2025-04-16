// import type { NextApiRequest, NextApiResponse } from 'next'

// export default (req: NextApiRequest, res: NextApiResponse) => {
//   res.status(200).json({ message: 'Hello from API' })
// }

// import type { NextApiRequest, NextApiResponse } from 'next';
// import { askMetaAI } from '../../lib/meta';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { tech, experience, level } = req.body;

//   const context = `Generate a technical interview question for a candidate applying for a ${level} position in ${tech} with ${experience} years of experience.`;

//   try {
//     console.log(`this is tech and other variables from vapi ${tech} and ${experience} and ${level}`);
//         const question = await askMetaAI(context);
//         console.log(`here is the question thanks${question}`)
//     res.status(200).json({ meta_question: question });
//   } catch (error) {
//     console.error('[Meta AI Error]', error);
//     res.status(500).json({ error: 'Failed to generate question from Meta AI.' });
//   }
// }


import type { NextApiRequest, NextApiResponse } from 'next';
import { askMetaAI } from '../../lib/meta';

interface VariableObject {
  value: string;
  type: string;
  description: string;
}

interface InterviewRequestBody {
  tech: VariableObject;
  experience: VariableObject;
  level: VariableObject;
}

interface InterviewResponse {
  meta_question: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<InterviewResponse | { error: string }>
) {
  // Validate request method
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate request body structure
  if (!req.body || 
      !req.body.tech?.value || 
      !req.body.experience?.value || 
      !req.body.level?.value) {
    console.error('Invalid request body structure:', req.body);
    return res.status(400).json({ 
      error: 'Missing required fields or invalid structure. Expected format: { tech: { value: string }, experience: { value: string }, level: { value: string } }' 
    });
  }

  const { tech, experience, level } = req.body as InterviewRequestBody;

  try {
    console.log('Received interview request with:', {
      tech: tech.value,
      experience: experience.value,
      level: level.value
    });

    // Create context for Meta AI
    const context = `Generate a Single technical interview question for:
    - Position Level: ${level.value}
    - Technology: ${tech.value}
    - Years of Experience: ${experience.value}
    
    The question should be appropriate for the candidate's level and experience,
    testing both practical skills and theoretical knowledge.`;

    // Generate question
    const question = await askMetaAI(context);
    console.log('Successfully generated question:', question);

    // Return response in the exact format Vapi expects
    return res.status(200).json({ 
      meta_question: question 
    });

  } catch (error) {
    console.error('[Meta AI Error]', error);
    
    // Provide more detailed error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return res.status(500).json({ 
      error: `Failed to generate question: ${errorMessage}` 
    });
  }
}