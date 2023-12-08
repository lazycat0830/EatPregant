import OpenAIRepository from '../repositories/OpenAIRepository';
import _ from 'lodash';
const { OpenAI } = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OpenAI_KEY,
});

class OpenAIService {
    Call_ChatGPT = async (prompt) => {
        const chatHistory = [];
        const user_input = prompt;
        const messageList = chatHistory.map(
            ([input_text, completion_text]) => ({
                role: 'user' === input_text ? 'ChatGPT' : 'user',
                content: input_text,
            })
        );
        messageList.push({ role: 'user', content: user_input });

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: messageList,
            });
            const output_text = response.choices[0].message.content;

            chatHistory.push([user_input, output_text]);
            const result = output_text;

            return {
                status: 200,
                data: result,
            };
        } catch (err) {
            if (err.response) {
                return {
                    status: err.response.status,
                    data: err.response.data,
                };
            } else {
                return {
                    status: 400,
                    message: err.message,
                };
            }
        }
    };
}

export default new OpenAIService();
