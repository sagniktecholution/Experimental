import openai


# Initialize the OpenAI API client
openai.api_key = 'your-api-key-here'

def chat_with_openai(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-4",  # You can use gpt-3.5-turbo or other available models
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message['content']

# Example usage
if __name__ == "__main__":
    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            break
        bot_response = chat_with_openai(user_input)
        print("Assistant: ", bot_response)
