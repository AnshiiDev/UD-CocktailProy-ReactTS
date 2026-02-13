import { streamText } from "ai";
import { openrouter } from "../lib/ai";

export default {
  async generateRecipe(prompt: string) {
    //le mandamos el modelo y el prompt
    const result = streamText({
      //   model: openrouter("openrouter/aurora-alpha"),
      model: openrouter("openrouter/aurora-alpha"),
      //   model: openrouter(""),
      prompt,

      //comportamiento de la IA
      system:
        "Eres un experto mixólogo. Genera una receta de bebida con los ingredientes que te doy. Sé creativo y original. No uses ingredientes comunes como limón, azúcar o hielo. Solo quiero ingredientes poco comunes y exóticos. La receta debe incluir el nombre de la bebida, los ingredientes necesarios y las instrucciones para prepararla.",
    });
    return result.textStream;
    // console.log(result);
  },
};
