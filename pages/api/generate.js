import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
Write me a list of unique writing prompt ideas that are all very different from each other based on the following topics:
`;
const generateAction = async (req, res) => {
    //run first prompt
    console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}\n`,
        temperature: 0.7,
        max_tokens: 500,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();
    
    res.status(200).json({ output: basePromptOutput });
};

export default generateAction;