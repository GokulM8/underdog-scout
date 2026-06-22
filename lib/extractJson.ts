/** Extracts the first {...} JSON object from a free-text LLM response. */
export function extractJsonBlock(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1 || end < start) {
    throw new Error("No JSON object found in the model response.");
  }
  return JSON.parse(candidate.slice(start, end + 1));
}

/** Extracts the first [...] JSON array from a free-text LLM response. */
export function extractJsonArrayBlock(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const candidate = fenced ? fenced[1] : text;
  const start = candidate.indexOf("[");
  const end = candidate.lastIndexOf("]");
  if (start === -1 || end === -1 || end < start) {
    throw new Error("No JSON array found in the model response.");
  }
  return JSON.parse(candidate.slice(start, end + 1));
}
