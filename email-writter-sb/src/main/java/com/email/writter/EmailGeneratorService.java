package com.email.writter;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class EmailGeneratorService {

    private final WebClient webClient;

    private final String apiKey;

    public EmailGeneratorService(WebClient.Builder webClientBuilder,
                                 @Value("${gemini.api.url}") String baseUrl,
                                 @Value("${gemini.api.key}") String geminiApiKey) {
        this.webClient = webClientBuilder.baseUrl(baseUrl).build();
        this.apiKey = geminiApiKey;
    }

    public String generateEmailReply(EmailRequest emailRequest) {
        //build prompt
        String prompt=buildPrompt(emailRequest);

        //prepare raw JSON Body
        String requestBody=String.format("""
                {
                     "contents": [
                       {
                         "parts": [
                           {
                             "text": "%s"
                           }
                         ]
                       }
                     ]
                }
                """,prompt);

        //Send Request
        String response = webClient.post()
                .uri(uriBuilder -> uriBuilder.path("/v1beta/models/gemini-2.5-flash:generateContent").build())
                .header("x-goog-api-key", apiKey)
                .header("Content-Type", "application/json")
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        //Extract Response
        return extractResponseContent(response);
    }

     private String extractResponseContent(String response){
         try{
             ObjectMapper mapper = new ObjectMapper();
             JsonNode root=mapper.readTree(response);
             return root.path("candidates")
                     .get(0)
                     .path("content")
                     .path("parts")
                     .get(0)
                     .path("text")
                     .asText();
         }catch (JsonProcessingException e){
             throw new RuntimeException(e);
         }

    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();

        prompt.append("You are a professional email assistant. ");
        prompt.append("Your job is to write a well-structured, polished, and contextually appropriate reply to the email provided. ");

        if (emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()) {
            prompt.append("Write the reply in a ")
                    .append(emailRequest.getTone())
                    .append(" tone. ");
        } else {
            prompt.append("Use a professional and polite tone. ");
        }

        prompt.append("Guidelines for the reply:\n");
        prompt.append("1. Start with an appropriate greeting (e.g., 'Dear [Name],' or 'Hi [Name],').\n");
        prompt.append("2. Provide a clear, concise, and relevant response to the original email.\n");
        prompt.append("3. Maintain professionalism, empathy, and clarity.\n");
        prompt.append("4. End with a polite closing statement and signature (e.g., 'Best regards,').\n");
        prompt.append("5. Do not include explanations about how you generated the email.\n");
        prompt.append("6. Do not repeat the original email verbatim.\n\n");

        prompt.append("Original Email:\n");
        prompt.append(emailRequest.getEmailContent());

        return prompt.toString();
    }




}
