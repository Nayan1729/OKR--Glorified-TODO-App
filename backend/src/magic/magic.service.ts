import { Injectable } from '@nestjs/common';
import { CreateObjectiveDto } from '../objective/dto/create-objective.dto';

import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';

@Injectable()
export class MagicService {
  async generateOKR(
    objectiveDto: Pick<CreateObjectiveDto, 'title' | 'description'>,
  ) {
    const ai = new GoogleGenAI({
      apiKey: process.env['GEMINI_API_KEY'],
    });
    const config = {
      thinkingConfig: {
        thinkingLevel: ThinkingLevel.MINIMAL,
      },
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        required: ['title', 'description', 'keyResults'],
        properties: {
          title: {
            type: Type.STRING,
            description: 'Concise headline of the goal',
          },
          description: {
            type: Type.STRING,
            description:
              "Detailed description including the 'Why' and timeframe",
          },
          keyResults: {
            type: Type.ARRAY,
            description: 'A list of at least 2 distinct, practical key results',
            items: {
              type: Type.OBJECT,
              required: ['description', 'targetProgress', 'currentProgress'],
              properties: {
                description: {
                  type: Type.STRING,
                  description: 'Specific action to achieve the goal',
                },
                targetProgress: {
                  type: Type.INTEGER,
                  description: 'The target number to achieve',
                },
                currentProgress: {
                  type: Type.INTEGER,
                  description: 'The starting progress, usually 0',
                },
              },
            },
          },
        },
      },
      systemInstruction: [
        {
          text: `You are an expert OKR (Objectives and Key Results) generator. Your task is to accept a user's rough goal and convert it into a structured, high-quality OKR object.

Rules:

SMART Criteria: Ensure the Description and Key Results are Specific, Measurable, and Time-bound. If the user input is vague, infer reasonable metrics to create a complete example.

key results should be very specific tiny goals type and practically achievable assuming that user is just an average person trying to achieving that objective
`,
        },
      ],
    };
    const model = 'gemini-3-flash-preview';
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: `title: ${objectiveDto.title} \n, description: ${objectiveDto.description} `,
          },
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });
    const rawText = response?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      throw new Error("Couldn't find any content from the ai.");
    }
    const json = await JSON.parse(rawText);
    console.log(json);

    return json;
  }
}
