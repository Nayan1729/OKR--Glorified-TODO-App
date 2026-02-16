import { Injectable } from '@nestjs/common';
import { CreateObjectiveDto } from '../objective/dto/create-objective.dto';
import * as yup from 'yup';
import { convertSchema } from '@sodaru/yup-to-json-schema';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const okrSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  keyResults: yup
    .array()
    .of(
      yup.object({
        description: yup.string().required(),
        targetProgress: yup.number().integer().required(),
        currentProgress: yup.number().integer().default(0),
      }),
    )
    .min(2, 'Must have at least 2 key results')
    .required(),
});

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
      responseSchema: convertSchema(okrSchema),
      systemInstruction: [
        {
          text: `You are an expert OKR (Objectives and Key Results) generator. Your task is to accept a user's rough goal and convert it into a structured, high-quality OKR object.

            Rules:
            
            SMART Criteria: Ensure the Description and Key Results are Specific, Measurable, and Time-bound. If the user input is vague, infer reasonable metrics to create a complete example.
            
            key results should be very specific tiny goals type and practically achievable assuming that user is just an average person trying to achieving that objective`,
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
    try {
      const match = await okrSchema.validate(json);
      console.log(match);
    } catch (e) {
      console.error(e);
      throw new Error(e.toString());
    }
    return json;
  }
}
