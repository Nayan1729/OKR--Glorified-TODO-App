import { Injectable } from '@nestjs/common';
import { CreateObjectiveDto } from '../objective/dto/create-objective.dto';

import { GoogleGenAI } from '@google/genai';

@Injectable()
export class MagicService {
  async generateOKR(
    objectiveDto: Pick<CreateObjectiveDto, 'title' | 'description'>,
  ) {
    console.log('Generating OKR');
    const ai = new GoogleGenAI({
      apiKey: process.env['GEMINI_API_KEY'],
    });
    const tools = [
      {
        googleSearch: {},
      },
    ];
    const config = {
      thinkingConfig: {
        thinkingBudget: 0,
      },
      tools,
      systemInstruction: [
        {
          text: `You are an expert OKR (Objectives and Key Results) generator. Your task is to accept a user's rough goal and convert it into a structured, high-quality OKR object.

Rules:

Strict JSON Only: Output raw JSON text. Do not use Markdown code blocks (\`\`\`json). Do not include conversational text.

SMART Criteria: Ensure the Description and Key Results are Specific, Measurable, and Time-bound. If the user input is vague, infer reasonable metrics to create a complete example.

key results should be very specific tiny goals type and practically achievable assuming that user is just an average person trying to achieving that objective

Structure: Follow this exact schema:

{
    "title": "Concise headline of the goal",
    "description": "Detailed description including the 'Why' and timeframe",
    "keyResults": [
      {
        "description": "Specific action to achieve the goal",
        "targetProgress": 100,
        "currentProgress": 0
      }
    ]
  }
Data Types:

targetProgress: Must be any Integer that is possible for that key result.

keyResults: Must contain at least 2 distinct results.`,
        },
      ],
    };
    const model = 'gemini-flash-lite-latest';
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: `TITLE: ${objectiveDto.title} \n
            DESCRIPTION: ${objectiveDto.description}`,
          },
        ],
      },
    ];
    console.log('Generating OKR Response');
    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    const rawText = response.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    try {
      console.log('Ai generated: ' + rawText);
      return JSON.parse(rawText);
    } catch (error) {
      console.error('Failed to parse Gemini response:', rawText);
      throw new Error('Invalid JSON returned from Gemini');
    }
  }
}
