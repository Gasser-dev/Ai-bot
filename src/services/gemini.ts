import {GoogleGenerativeAI, GenerativeModel} from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const getGeminiResponse = async (prompt: string) => {
    try {
        const model: GenerativeModel = genAI.getGenerativeModel({model: "gemini-3-flash-preview"});
        const result = await model.generateContent(prompt);
        return result.response;
    }catch (error) {
        console.error('Error fetching Gemini response:', error);
        throw error;
    }
}
