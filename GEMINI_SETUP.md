# Environment Configuration

To run the server with Gemini API, you need to set the following environment variable:

## Gemini API Key
Set your Google AI Studio API key as an environment variable:

### For Windows PowerShell:
```powershell
$env:GEMINI_API_KEY="your_gemini_api_key_here"
```

### Or create a .env file:
```
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
PORT=5000
```

## How to get a Gemini API Key:
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the API key and use it in your environment

## Running the server:
```powershell
$env:NODE_ENV="development"
$env:GEMINI_API_KEY="your_api_key_here"
npx tsx server/index.ts
```