import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini API or handle gracefully if key is missing
function getGeminiClient(customApiKey?: string) {
  const apiKey = (customApiKey && customApiKey.trim()) || process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// 1. AI Document/Notes to Quiz Engine Endpoint
app.post('/api/gemini/quiz', async (req, res) => {
  try {
    const { notes, subject } = req.body;
    if (!notes) {
      return res.status(400).json({ error: 'Notes or document content is required.' });
    }

    const clientKey = req.headers['x-gemini-api-key'] as string | undefined;
    const ai = getGeminiClient(clientKey);
    if (!ai) {
      // Return beautiful mock questions if no API key is set so the app is fully functional in development!
      console.warn('GEMINI_API_KEY is not set or configured. Returning high-quality mock data.');
      return res.json({
        questions: getMockQuestions(subject || 'general'),
        keyConfigured: false
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: `You are an expert NMAT (National Medical Admission Test) tutor in the Philippines.
Analyze the following student notes and automatically generate 3 highly realistic NMAT-style multiple-choice questions.

Subject Category requested: ${subject || 'General'}

Student notes:
"""
${notes}
"""

Each question must test conceptual understanding or quantitative calculations based on the notes, in the typical NMAT style (challenging, with comprehensive, clear explanations).
Return exactly 3 questions. Ensure they have clear options, a single correct answer (A, B, C, or D), and a detailed explanation of why the answer is correct and why other options are incorrect.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: 'Unique question ID (e.g. nmat-1)' },
                  question: { type: Type.STRING, description: 'The actual NMAT-style multiple choice question.' },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'Four options labeled A, B, C, D (e.g., ["A) Option 1", "B) Option 2", ...])'
                  },
                  correctAnswer: { type: Type.STRING, description: 'The correct option letter, exactly "A", "B", "C", or "D".' },
                  explanation: { type: Type.STRING, description: 'Detailed high-quality explanation of the concepts, formulas, and options.' }
                },
                required: ['id', 'question', 'options', 'correctAnswer', 'explanation']
              }
            }
          },
          required: ['questions']
        }
      }
    });

    const data = JSON.parse(response.text?.trim() || '{}');
    res.json({ ...data, keyConfigured: true });

  } catch (error: any) {
    console.error('Quiz Generation Error:', error);
    res.status(500).json({
      error: 'Failed to generate quiz. Using high-quality local reviewer instead.',
      details: error.message,
      questions: getMockQuestions(req.body.subject || 'general')
    });
  }
});

// 2. Socratic Tutor AI Chatbot Endpoint
app.post('/api/gemini/socratic', async (req, res) => {
  try {
    const { message, history, context } = req.body;
    
    const clientKey = req.headers['x-gemini-api-key'] as string | undefined;
    const ai = getGeminiClient(clientKey);
    if (!ai) {
      // Simulate Socratic tutor response locally if key is missing
      return res.json({
        reply: getMockSocraticReply(message, context),
        keyConfigured: false
      });
    }

    const systemPrompt = `You are "Socrates-Med", a highly intelligent and compassionate NMAT and medical school Socratic tutor in the Philippines.
Your goal is NEVER to give the final answer or formula directly.
Instead, guide the student with supportive, leading questions that push them to think, calculate, or retrieve the concept themselves.
Keep your replies conversational, short (2-4 sentences max), encouraging, and deeply educational.
Use Philippine premed contexts if appropriate (e.g., referring to UPCM, ASMPH, PLM, or comparing NMAT stresses).
Context of current study: ${JSON.stringify(context || {})}

Example interaction:
Student: "How do I solve kinetic energy change?"
Socrates-Med: "That is a vital physics question! Before we write any formulas, what physical variables usually affect how much energy a moving object carries? What elements would you need to measure first?"`;

    const chatHistory = (history || []).map((h: any) => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.content }]
    }));

    // Add current user message
    chatHistory.push({
      role: 'user',
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: chatHistory,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      }
    });

    res.json({
      reply: response.text || 'Tell me more about what you are visualising so we can explore it together.',
      keyConfigured: true
    });

  } catch (error: any) {
    console.error('Socratic Tutor Error:', error);
    res.json({
      reply: 'Let\'s break this down together. What do you think the first step of this problem is based on your notes?',
      error: error.message
    });
  }
});

// Mock questions fallback
function getMockQuestions(subject: string) {
  const generic = [
    {
      id: 'mock-1',
      question: 'Which of the following organic functional groups is characterized by a carbon atom sharing a double bond with an oxygen atom and a single bond with a hydroxyl (-OH) group?',
      options: [
        'A) Ketone',
        'B) Carboxylic Acid',
        'C) Ester',
        'D) Aldehyde'
      ],
      correctAnswer: 'B',
      explanation: 'A Carboxylic acid contains a carboxyl group (-COOH), which consists of a carbonyl group (C=O) with a hydroxyl group (-OH) attached to the carbonyl carbon. Ketones only have C=O with alkyl chains on both sides. Esters have C=O with an -OR group. Aldehydes have C=O with a hydrogen.'
    },
    {
      id: 'mock-2',
      question: 'A car traveling in a straight line at 15 m/s accelerates uniformly at 3.0 m/s² for 5.0 seconds. What is the total displacement of the car during this 5.0-second sprint?',
      options: [
        'A) 75.0 m',
        'B) 112.5 m',
        'C) 150.0 m',
        'D) 187.5 m'
      ],
      correctAnswer: 'B',
      explanation: 'Using the kinematic formula: d = vi * t + 0.5 * a * t².\n- vi = 15 m/s\n- t = 5.0 s\n- a = 3.0 m/s²\n\nCalculation:\nd = (15 * 5) + 0.5 * 3.0 * (5²)\nd = 75 + 1.5 * 25\nd = 75 + 37.5 = 112.5 meters. Thus, Option B is correct.'
    },
    {
      id: 'mock-3',
      question: 'If a sequence of figures shows a rotating pattern where the first figure has a dot at 12 o\'clock, the second at 3 o\'clock, the third at 6 o\'clock, what position would the dot occupy in the fifth figure of the sequence assuming a consistent clockwise direction?',
      options: [
        'A) 9 o\'clock',
        'B) 12 o\'clock',
        'C) 3 o\'clock',
        'D) 6 o\'clock'
      ],
      correctAnswer: 'B',
      explanation: 'The pattern shifts clockwise by 90 degrees (3 clock hours) each turn:\n- 1st figure: 12 o\'clock\n- 2nd figure: 3 o\'clock\n- 3rd figure: 6 o\'clock\n- 4th figure: 9 o\'clock\n- 5th figure: 12 o\'clock (full rotation complete). Option B is correct.'
    }
  ];

  if (subject?.toLowerCase().includes('physic')) {
    return [
      {
        id: 'phys-1',
        question: 'Under constant acceleration, a block starts from rest and slides a distance of 8 meters down an inclined plane in 4 seconds. What is the magnitude of its acceleration?',
        options: [
          'A) 0.5 m/s²',
          'B) 1.0 m/s²',
          'C) 2.0 m/s²',
          'D) 4.0 m/s²'
        ],
        correctAnswer: 'B',
        explanation: 'Using d = vi * t + 0.5 * a * t². Since it starts from rest, vi = 0. So, d = 0.5 * a * t² => 8 = 0.5 * a * (4²) => 8 = 8 * a => a = 1.0 m/s².'
      },
      ...generic.slice(1)
    ];
  }
  return generic;
}

function getMockSocraticReply(message: string, context: any): string {
  const msg = message.toLowerCase();
  if (msg.includes('physics') || msg.includes('kinematic') || msg.includes('velocity')) {
    return 'Kinematics is beautiful! Think about speed changing over time. If a jeepney accelerates away from an MRT station, what initial factors determine how fast it goes? Are we looking at forces, or just the pure description of motion?';
  }
  if (msg.includes('chemistry') || msg.includes('stoich') || msg.includes('mole')) {
    return 'Ah, stoichiometry, the recipe book of chemistry! If we have reactants, what physical law tells us that atoms cannot be created or destroyed? Have we balanced the chemical equation first before calculating the moles?';
  }
  return 'That is a fascinating question to explore. Before I tell you the answer, let\'s examine any clues you have. What basic principles underlying this topic can you recall from your pre-med classes?';
}

// REST of Full-Stack Server Integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // SPA routing must fallback to index.html
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Medly backend server running on http://localhost:${PORT}`);
  });
}

startServer();
